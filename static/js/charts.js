var chart;

function drawGraph(data) {
    /*
    data = {
        'e': 50,
        'walk': 20,
        'fast_walk': 30,
        'walk_time': 40,
        'fast_walk_time': 50,
        'rest_time': 30
    }
    */
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
