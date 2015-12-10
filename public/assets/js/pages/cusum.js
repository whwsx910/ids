/**
 * Created by haoxiangxing on 11/14/15.
 */

var chartCusumResult;

$(function(){

    $('#menu_cusum').addClass('active');

    initComponents();
    initEvents();
});

function initComponents(){


    // Default initialization
    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });

    // Primary
    $(".control-primary").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-primary-600 text-primary-800'
    });

    // Danger
    $(".control-danger").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-danger-600 text-danger-800'
    });

    // Success
    $(".control-success").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-success-600 text-success-800'
    });

    // Warning
    $(".control-warning").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-warning-600 text-warning-800'
    });

    // Info
    $(".control-info").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-info-600 text-info-800'
    });

    // Custom color
    $(".control-custom").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-indigo-600 text-indigo-800'
    });

    // Button with progress
    Ladda.bind('.btn-ladda-progress', {
        callback: function(instance) {
            var progress = 0;
            var interval = setInterval(function() {
                progress = Math.min(progress + Math.random() * 0.1, 1);
                instance.setProgress(progress);

                $('#panelCusum .statusBar').html('Analyzing ' + Math.floor(progress * 100) + '%');

                if( progress === 1 ) {
                    instance.stop();
                    clearInterval(interval);

                    // Show amChart
                    val = $('input[name=radioCusum]:checked').val();
                    var t=0;
                    if(val == '70'){
                        t = 1330;
                    }else if(val == '50'){
                        t = 1500;
                    }else if(val == '30'){
                        t = 1706;
                    }

                    chartCusumResult.dataProvider = [{'time': 'Second', 'data': t}];
                    chartCusumResult.validateData();

                    $('#panelCusum .statusBar').html('Idle');
                }
            }, 200);
        }
    });

    chartCusumResult = AmCharts.makeChart("chartCusum", {
        "theme": "light",
        "type": "serial",

        "valueAxes": [{
            "title": "Seconds"
        }],
        "graphs": [{
            "balloonText": "In [[value]] seconds",
            "fillAlphas": 1,
            "lineAlpha": 0.2,
            "title": "Income",
            "type": "column",
            "valueField": "data"
        }],
        "depth3D": 20,
        "angle": 30,
        "rotate": true,
        "categoryField": "time",
        "categoryAxis": {
            "gridPosition": "start",
            "fillAlpha": 0.05,
            "position": "left"
        },
        "export": {
            "enabled": true
        }
    });




    //jQuery('.chart-input').off().on('input change',function() {
    //    var property	= jQuery(this).data('property');
    //    var target		= chart;
    //    chart.startDuration = 0;
    //
    //    if ( property == 'topRadius') {
    //        target = chart.graphs[0];
    //        if ( this.value == 0 ) {
    //            this.value = undefined;
    //        }
    //    }
    //
    //    target[property] = this.value;
    //    chart.validateNow();
    //});
}

function initEvents(){

}