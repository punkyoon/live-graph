// load google charts library
google.load("visualization", "1", {packages:["corechart"]});

// for rest, walk, fast_walk data
var data, options, chart;

// for energy(E) data
var data2, options2, chart2;

var i = 0;

/* initialize chart1 - rest, walk, fast_walk data */
function drawChart(data, options) {
    var chart = new google.visualization.LineChart(document.getElementById('data-container'));
    chart.draw(data, options);
    return(chart);
}

/* initialize chart2 - energy(e) data */
function drawChart2(data, options) {
    var chart = new google.visualization.LineChart(document.getElementById('data-container2'));
    chart.draw(data, options);
    return(chart);
}

/* update the chart1 - rest, walk, fast_walk data */
function updateChart(rest, walk, fast_walk) {
    i = (i + 1);

    data.addRow([
        ""+i,
        rest,
        walk,
        fast_walk
    ]);

    chart.draw(data, options);
}

/* update the chart2 - energy(e) data */
function updateChart2(e) {
    data2.addRow([
        ""+i,
        e
    ]);

    chart2.draw(data2, options2);
}

$(function() {
    data = google.visualization.arrayToDataTable([
        ['Time', 'Rest', 'Walk', 'Fast Walk'],
        ['0', 0, 0, 0],
    ]);

    data2 = google.visualization.arrayToDataTable([
        ['Time', 'E'],
        ['0', 0],
    ]);
    
    options = {
        title: 'Live sensor data',
        "curveType": "function",
    };

    options2 = {
        title: 'Energy data',
        "curveType": "function",
    };

    chart = drawChart(data, options);
    chart2 = drawChart2(data2, options2);
});


/* reset charts */
function reset(){
    i = 0;
    
    data = google.visualization.arrayToDataTable([
        ['Time', 'Rest', 'Walk', 'Fast Walk'],
        ['0', 0, 0, 0],
    ]);

    data2 = google.visualization.arrayToDataTable([
        ['Time', 'E'],
        ['0', 0],
    ]);

    options = {
        title: 'Live sensor data',
        "curveType": "function",
    };

    options2 = {
        title: 'Energy data',
        "curveType": "function",
    };

    chart = drawChart(data, options);
    chart2 = drawChart2(data2, options2);
}