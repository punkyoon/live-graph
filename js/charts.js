var chart;

$(document).ready(function(){
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'data-container',
      defaultSeriesType: 'spline',
      events: {load: requestData(??)}
    },
    title: {
      text: 'Live plot'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150,
      maxZoom: 20 * 1000
    },
    yAxis {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: 'value',
        margin: 80
      }
    },
    series: [
      {
        name: 'fast walk',
        data: []
      },
      {
        name: 'walk',
        data: []
      },
      {
        name: 'rest',
        data: []
      }
    ]
  });
});
