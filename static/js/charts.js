/*
var chart;

function drawGraph(data) {
    data = {
        'e': 50,
        'walk': 20,
        'fast_walk': 30,
        'walk_time': 40,
        'fast_walk_time': 50,
        'rest_time': 30
    }
    var fast_walk = chart.series[0];
    var walk = chart.series[1];
    var rest = chart.series[2];

    shift0 = fast_walk.data.length>20;
    shift1 = walk-data.length>20;
    shift2 = rest_data.length>20;

    chart.series[0].addPoint(data['fast_walk'], true, shift);
    chart.series[1].addPoint(data['walk'], true, shift);
    chart.series[2].addPoint(0, true, shift);
}

function wait(msecs)
{
    var start = new Date().getTime();
    var cur = start;
    while(cur - start < msecs)
    {
        cur = new Date().getTime();
    }
}

wait(1000);

chart = new Highcharts.Chart({
    chart: {
        renderTo: 'data-container',
        defaultSeriesType: 'spline',
        events: {load: drawGraph}
    },
    title: {
        text: 'Live plot'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
        maxZoom: 20*1000
    },
    yAxis: {
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
            data: [],
            dashStyle: 'LongDash',
            color: Highcharts.getOptions().colors[1]
        },
        {
            name: 'walk',
            data: [],
            dashStyle: 'LongDash',
            color: Highcharts.getOptions().colors[0]
        },
        {
            name: 'rest',
            data: [],
            dashStyle: 'LongDash',
            color: Highcharts.getOptions().colors[0]
        }
    ]
});
*/

Highcharts.setOptions({
          global: {
              useUTC: false
          }
      });
  
      var chart;
      chart = new Highcharts.Chart({
          chart: {
              renderTo: 'container',
              type: 'spline',
              marginRight: 10          
          },
          title: {
              text: 'Live Sensor Data'
          },
          xAxis: {
              type: 'datetime',
              tickPixelInterval: 300
              //tickPixelInterval: 5
          },
          yAxis: {
              min : 50,
              title: {
                  text: 'Value'
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },
          tooltip: {
              formatter: function() {
                      return '<b>'+ this.series.name +'</b><br/>'+
                      Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                      Highcharts.numberFormat(this.y, 2);
              }
          },
          legend: {
              enabled: false
          },
          exporting: {
              enabled: false
          },
          plotOptions: {
              spline: {
                  marker: {
                      enabled: false
                  },
                  pointStart: Date.now()
              }
          },
          series: [{
              name: 'Sensor data',
              data: (function() {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i++) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            })()
 
          }]
        });
