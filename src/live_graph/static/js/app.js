(() => {
  const socket = io();
  const channelNameInput = document.getElementById("channelInput");
  const subscriptionButton = document.getElementById("subscribeBtn");
  const resetButton = document.getElementById("resetBtn");
  const graphStatus = document.getElementById("status");

  let current = null;

  function setStatus(text, kind) {
    graphStatus.textContent = text;
    graphStatus.className = "status" + (kind ? ` ${kind}` : "");
  }

  function renderSubscribed(channel) {
    current = channel;
    subscriptionButton.textContent = "Unsubscribe";
    channelNameInput.disabled = true;

    setStatus(`subscribed to "${channel}"`, "ok");
  }

  function renderUnsubscribed() {
    current = null;
    subscriptionButton.textContent = "Subscribe";
    channelNameInput.disabled = false;

    setStatus("not subscribed", "");
  }

  socket.on("connect", () => {
    if (!current) setStatus("connected · not subscribed", "");
  });

  socket.on("disconnect", () => {
    renderUnsubscribed();
    setStatus("disconnected", "err");
  });

  socket.on("draw", (data) => {
    window.LiveGraph.updateChart1(
      data.rest_time,
      data.walk_time,
      data.fast_walk_time,
    );
    window.LiveGraph.updateChart2(data.e);
  });

  socket.on("joined", ({ channel }) => renderSubscribed(channel));

  socket.on("channel error", ({ message }) => {
    setStatus(`error: ${message}`, "err");
  });

  function toggle() {
    if (current) {
      socket.emit("leave channel", { channel: current });
      renderUnsubscribed();
      return;
    }

    const channel = channelNameInput.value.trim();
    if (!channel) {
      setStatus("type a channel name first", "warn");
      return;
    }

    window.LiveGraph.resetCharts();

    socket.emit("join channel", { channel });
  }

  subscriptionButton.addEventListener("click", toggle);

  channelNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") toggle();
  });

  resetButton.addEventListener("click", () => window.LiveGraph.resetCharts());
})();
