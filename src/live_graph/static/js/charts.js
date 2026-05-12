(() => {
  const MAX_POINTS = 60;
  const FONT_MONO =
    '"Berkeley Mono", "JetBrains Mono", "IBM Plex Mono", ui-monospace, ' +
    "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
  const INK = "#201d1d";
  const BODY = "#424245";
  const MUTE = "#646262";
  const HAIRLINE = "rgba(15, 0, 0, 0.12)";
  const ACCENT = "#007aff";
  const SUCCESS = "#30d158";
  const WARNING = "#ff9f0a";

  let tick = 0;
  let chart1;
  let chart2;

  if (typeof window !== "undefined" && window.Chart) {
    window.Chart.defaults.font.family = FONT_MONO;
    window.Chart.defaults.font.size = 12;
    window.Chart.defaults.color = BODY;
    window.Chart.defaults.borderColor = HAIRLINE;
  }

  function baseOptions(titleText) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        title: { display: false, text: titleText },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            color: INK,
            font: { family: FONT_MONO, size: 12 },
            boxWidth: 12,
            boxHeight: 2,
          },
        },
        tooltip: {
          backgroundColor: INK,
          titleFont: { family: FONT_MONO },
          bodyFont: { family: FONT_MONO },
          titleColor: "#fdfcfc",
          bodyColor: "#fdfcfc",
          borderColor: INK,
          borderWidth: 1,
          cornerRadius: 4,
        },
      },
      scales: {
        x: {
          ticks: {
            color: MUTE,
            font: { family: FONT_MONO, size: 11 },
            maxRotation: 0,
          },
          grid: { color: HAIRLINE, drawTicks: false },
          border: { color: HAIRLINE },
        },
        y: {
          beginAtZero: true,
          ticks: { color: MUTE, font: { family: FONT_MONO, size: 11 } },
          grid: { color: HAIRLINE, drawTicks: false },
          border: { color: HAIRLINE },
        },
      },
      elements: {
        line: { borderWidth: 1.5 },
        point: { radius: 0, hitRadius: 8 },
      },
    };
  }

  function buildChart1(ctx) {
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: ["0"],
        datasets: [
          {
            label: "rest",
            data: [0],
            borderColor: ACCENT,
            backgroundColor: ACCENT,
            tension: 0.25,
          },
          {
            label: "walk",
            data: [0],
            borderColor: SUCCESS,
            backgroundColor: SUCCESS,
            tension: 0.25,
          },
          {
            label: "fast_walk",
            data: [0],
            borderColor: WARNING,
            backgroundColor: WARNING,
            tension: 0.25,
          },
        ],
      },
      options: baseOptions("activity"),
    });
  }

  function buildChart2(ctx) {
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: ["0"],
        datasets: [
          {
            label: "e",
            data: [0],
            borderColor: INK,
            backgroundColor: INK,
            tension: 0.25,
          },
        ],
      },
      options: baseOptions("energy"),
    });
  }

  function pushPoint(chart, label, values) {
    chart.data.labels.push(label);
    values.forEach((value, index) =>
      chart.data.datasets[index].data.push(value),
    );
    if (chart.data.labels.length > MAX_POINTS) {
      chart.data.labels.shift();
      chart.data.datasets.forEach((ds) => ds.data.shift());
    }
    chart.update("none");
  }

  function updateChart1(rest, walk, fastWalk) {
    tick += 1;
    pushPoint(chart1, String(tick), [rest, walk, fastWalk]);
  }

  function updateChart2(e) {
    pushPoint(chart2, String(tick), [e]);
  }

  function resetCharts() {
    tick = 0;
    chart1.destroy();
    chart2.destroy();
    chart1 = buildChart1(
      document.getElementById("data-container").getContext("2d"),
    );
    chart2 = buildChart2(
      document.getElementById("data-container2").getContext("2d"),
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    chart1 = buildChart1(
      document.getElementById("data-container").getContext("2d"),
    );
    chart2 = buildChart2(
      document.getElementById("data-container2").getContext("2d"),
    );
  });

  window.LiveGraph = { updateChart1, updateChart2, resetCharts };
})();
