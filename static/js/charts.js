// google.charts.load("visualization", "1", {packages:["corechart"]});
google.load("visualization", "1", {packages:["corechart"]});


var data, options, chart;

var i = 0;
//var rest=0, walk=0, fast_walk=0;

/* initialize chart */
function drawChart(data, options) {
    var chart = new google.visualization.LineChart(document.getElementById('data-container'));
    chart.draw(data, options);
    return(chart);
}

/*
function updateValue() {
    rest = Math.round((Math.random() * 1000));
    walk = Math.round((Math.random() * 1000));
    fast_walk = Math.round((Math.random() * 1000));

    updateChart(rest, walk, fast_walk);
}
*/

/* update the chart */
//function updateChart(data, chart, options) {
//function updateChart(a, b, c) {
function updateChart(rest, walk, fast_walk) {
    i = (i + 1);
    
    /*
    rest = data['rest'];
    walk = data['walk'];
    fast_walk = data['fast_walk'];
    */

    /*
    data.addRow([
        ""+i, // change the number to a string
        Math.round((Math.random() * 1000)), //random value 
        Math.round((Math.random() * 1000)), //random value
        Math.round((Math.random() * 1000)) //random value
    ]);
    */

    data.addRow([
        ""+i,
        rest,
        walk,
        fast_walk
    ])

    chart.draw(data, options);
    
    //setTimeout(function(){updateChart(data, chart, options)}, 5000);
}

$(function() {
   // set variables
    /*
    var data = google.visualization.arrayToDataTable([
        ['Time', 'Rest', 'Walk', 'Fast Walk'],
        ['0', 0, 0, 0],
    ]);
    */
    data = google.visualization.arrayToDataTable([
        ['Time', 'Rest', 'Walk', 'Fast Walk'],
        ['0', 0, 0, 0],
    ]);
    
    /*
    var options = {
        title: 'Live sensor data',
        "curveType": "function",
    };
    */
    options = {
        title: 'Live sensor data',
        "curveType": "function",
    };
    
    //var chart = drawChart(data, options);
    chart = drawChart(data, options);
    
    //updateChart(data, chart, options);
});

/*
$(function() {
   // set variables
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2004',  1000,      400],
        ['2005',  1170,      460],
        ['2006',  660,       1120],
        ['2007',  1030,      540]
    ]);
    
    var options = {
        title: 'Company Performance',
        "curveType": "function",
    };
    
    var chart = drawChart(data, options);
    
    updateChart(data, chart, options);
});
*/