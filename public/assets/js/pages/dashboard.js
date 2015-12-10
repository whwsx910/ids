/* ------------------------------------------------------------------------------
 *
 *  # Dashboard configuration
 *
 *  Demo dashboard configuration. Contains charts and plugin inits
 *
 *  Version: 1.0
 *  Latest update: Aug 1, 2015
 *
 * ---------------------------------------------------------------------------- */

var tblDashboardAttack;
var timerIpAttack;
var timerWavelet;
var timerAcquisition;

var ipAttackData;
var ipAttackDataCnt = 0;

var waveletData;
var waveletNormalData;

var chartIpAttack;
var chartPercent;
var chartWavelet;

$(function() {    

    $('#menu_dashboard').addClass('active');

    initData();
    initComponents();
    initTables();

});

function initData(){

    // Get wavelet data
    $.ajax({
        url: '/ajax/data/wavelet',
        type: 'GET',
        success: function(data){
            waveletData = data;

            chartWavelet = AmCharts.makeChart("chartWavelet", {
                "type": "serial",
                "theme": "light",
                "dataProvider": [],
                "graphs": [{
                    "id": "g1",
                    "fillAlphas": 0.4,
                    "valueField": "volumn"
                }],

                "categoryField": "id"
            });

        }
    });

    $.ajax({
        url: '/ajax/data/ipattacks',
        type: 'GET',
        success: function(data){
            ipAttackData = data;

            chartIpAttack = AmCharts.makeChart( "chartIpAttack", {
                "type": "xy",
                "theme": "light",
                "titles": [
                    {
                        "text": "Host index chart (Traffic between Hosts - Analysis)",
                        "size": 15
                    }
                ],
                "balloon":{
                    "fixedPosition":true,
                },
                "dataProvider": [{"x":1, "y":3, "value": 5}],
                "valueAxes": [ {
                    "position": "bottom",
                    "axisAlpha": 0,
                    "minMaxMultiplier": 1,
                    "precision": 0,
                    "baseValue": 1,
                    "title": "Host index"
                }, {
                    "minMaxMultiplier": 1,
                    "axisAlpha": 0,
                    "position": "left",
                    "precision": 0,
                    "baseValue": 1,
                    "title": "Host index"
                } ],
                "startDuration": 0.5,
                "graphs": [ {
                    "balloonText": "x:<b>[[x]]</b> y:<b>[[y]]</b><br>value:<b>[[value]]</b>",
                    "bullet": "circle",
                    "bulletBorderAlpha": 0.2,
                    "bulletAlpha": 0.8,
                    "lineAlpha": 0,
                    "fillAlphas": 0,
                    "valueField": "value",
                    "xField": "x",
                    "yField": "y",
                    "maxBulletSize": 5
                } ],
                "marginLeft": 46,
                "marginBottom": 35,
                "export": {
                    "enabled": true
                }
            } );
        }
    });
}


var logicArray = [1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0];
var attackType = ['DDoS', 'Port Scan', 'SSH Brute Force', 'Phishing'];

var indexWavelet = 0;

function initComponents(){

    $('#btnStartAttackTrace').on('click', function(){
        timerIpAttack.play();
        $('#panelChartAttack .statusBar').html('Tracking');
    });

    $('#btnStopAttackTrace').on('click', function(){
        timerIpAttack.stop();
        $('#panelChartAttack .statusBar').html('Idle');
    });

    $('#btnStartAttackPercent').on('click', function(){
        timerAcquisition.play();
        $('#panelChartPipe .statusBar').html('Tracking');
    });

    $('#btnStopAttackPercent').on('click', function(){
        timerAcquisition.stop();
        $('#panelChartPipe .statusBar').html('Idle');
    });

    $('#btnStartWavelet').on('click', function(){
        timerWavelet.play();
        $('#panelWavelet .statusBar').html('Tracking ......');
    });

    $('#btnStopWavelet').on('click', function(){
        timerWavelet.stop();
        $('#panelWavelet .statusBar').html('Idle');
    })

    chartPercent = AmCharts.makeChart( "chartPercent", {
        "type": "pie",
        "theme": "light",
        "dataProvider": [ {
            "type": "Attack",
            "numbers": 0
        }, {
            "type": "Normal",
            "numbers": 0
        } ],
        "valueField": "numbers",
        "titleField": "type",
        "balloon":{
            "fixedPosition":true
        },
        "export": {
            "enabled": true
        }
    } );


    // Wavelet demo timer
    timerWavelet = $.timer(function(){
        var dataChart = chartWavelet.dataProvider;

        if(indexWavelet > 2500 && indexWavelet <= waveletData.length) {
            dataChart.shift();
        }

        if(indexWavelet < waveletData.length) {
            dataChart.push(waveletData[indexWavelet++]);
            chartWavelet.validateData();
        }
    });

    timerWavelet.set({
        time: 2,
        autostart: false
    });


    // IP Attack demo timer
    timerIpAttack  = $.timer(function(){

        // TODO fake here
        var index = logicArray[Math.floor(Math.random()*(logicArray.length-1))];


        // Loop array data, update table and chart.
        if(index == 1) {
            tblDashboardAttack.row.add([
                ipAttackData[3].created_at,
                ipAttackData[3].sourceip,
                ipAttackData[3].destip,
                'SSH Brute Force',
                '48'
            ]).draw(false);
        }else{
            tblDashboardAttack.row.add([
                ipAttackData[ipAttackDataCnt].created_at,
                ipAttackData[ipAttackDataCnt].sourceip,
                ipAttackData[ipAttackDataCnt].destip,
                attackType[Math.floor(Math.random()*3)],
                Math.floor(Math.random()*200)
            ]).draw(false);
        }

        // Chart update
        // TODO mapping real data to host index
        // TODO fake index here
        var chartIndex = Math.floor(Math.random()*2);

        if(index != 1){
            chartIpAttack.dataProvider.push({
                "x": Math.floor(Math.random() * 8 + 1),
                "y": Math.floor(Math.random() * 8 + 1),
                "value": 5
            });
        }else{
            if (chartIndex == 1) {
                chartIpAttack.dataProvider.push({
                    "x": 3,
                    "y": Math.floor(Math.random() * 8 + 1),
                    "value": 5
                });
            }else{
                chartIpAttack.dataProvider.push({
                    "x": Math.floor(Math.random() * 8 + 1),
                    "y": 3,
                    "value": 5
                });
            }
        }

        chartIpAttack.validateData();

        $('#panelChartAttack .statusBar').html(ipAttackData[ipAttackDataCnt].sourceip + ' -> ' + ipAttackData[ipAttackDataCnt].destip);

        ipAttackDataCnt++;
    });

    timerIpAttack.set({
        time: 200,
        autostart: false
    });


    timerAcquisition = $.timer(function(){
        data = new Array();
        chartPercent.dataProvider.forEach(function(entry) {
            if(entry.type == "Normal"){
                entry.numbers += Math.random()+1;
            }else{
                entry.numbers += Math.random()*0.1+0.1;
            }

            data.push(entry);
        });

        chartPercent.dataProvider = data;
        chartPercent.validateData();

    });

    timerAcquisition.set({
        time: 1000,
        autostart: true
    });
};

/**
 * Init data table.
 */
function initTables(){

    tblDashboardAttack = $('#tblDashboardAttack').DataTable({


        dom: '<"datatable-header"fl><"datatable-scroll-lg"t><"datatable-footer"ip>',
        language: {
            search: '<span>Filter:</span> _INPUT_',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
        },
        lengthMenu: [ 10, 25, 50, 75, 100 ],
        displayLength: 10,

        preDrawCallback: function(settings) {

            // Reverse last 3 dropdowns orientation
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');

            // Destroy Select2
            $('.select').select2('destroy');
        }
    });

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder','Type to filter...');


    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: "-1"
    });
}
