$(function(){
TESTER = document.getElementById('tester');
d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQYJmPtamh2b_IdC9pK1hgeBGzY5cesbxzmXTKD02Gukjd6wwuX0M0G2OQNsjqhfk_eHrIU_TfOnxmp/pub?gid=0&single=true&output=csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });}

    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }

    var data = [];
    var count = unpack(rows, 'cnt');
    var startLongitude = unpack(rows, 'start_lon');
    var endLongitude = unpack(rows, 'end_lon');
    var startLat = unpack(rows, 'start_lat');
    var endLat = unpack(rows, 'end_lat');

    for ( var i = 0 ; i < count.length; i++ ) {
        var opacityValue = count[i]/getMaxOfArray(count);

        var result = {
            type: 'scattergeo',
            locationmode: 'USA-states',
            lon: [ startLongitude[i] , endLongitude[i] ],
            lat: [ startLat[i] , endLat[i] ],
            mode: 'lines',
            line: {
                width: 1,
                color: 'red'
            },
            opacity: opacityValue
        };

        data.push(result);
    };

    var layout = {
        title: 'ISS FALL 2021',
        showlegend: false,
        width: 1000,
        height: 1000,
        geo:{
            scope: 'world',
            projection: {
                type: 'orthographic'//'azimuthal equal area'
            },
            showland: true,
            landcolor: 'rgb(243,243,243)',
            countrycolor: 'rgb(204,204,204)'
        }
    };
    Plotly.newPlot(TESTER, data, layout, {showLink: false});
});
});