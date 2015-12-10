/**
 * Created by haoxiangxing on 11/14/15.
 */

// svg path for target icon
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
// svg path for plane icon
var planeSVG = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21";
//var hackSVG = "M1024 64c0-45.516-9.524-88.8-26.652-128-33.576 76.836-96.448 137.932-174.494 169.178-86.194-65.96-193.936-105.178-310.854-105.178s-224.66 39.218-310.854 105.178c-78.048-31.246-140.918-92.342-174.494-169.178-17.128 39.2-26.652 82.484-26.652 128 0 73.574 24.85 141.328 66.588 195.378-42.37 74.542-66.588 160.75-66.588 252.622 0 282.77 229.23 512 512 512s512-229.23 512-512c0-91.872-24.218-178.080-66.588-252.622 41.738-54.050 66.588-121.804 66.588-195.378zM576.094 380.516c2.032-47.454 45.21-78.948 81.592-97.138 34.742-17.372 69.104-26.060 70.548-26.422 17.146-4.288 34.52 6.138 38.806 23.284s-6.138 34.518-23.284 38.806c-17.624 4.45-38.522 12.12-56.936 21.35 10.648 11.43 17.174 26.752 17.174 43.606 0 35.346-28.654 64-64 64s-64-28.654-64-64c0.002-1.17 0.038-2.332 0.1-3.486zM256.958 280.24c4.288-17.146 21.66-27.572 38.806-23.284 1.446 0.362 35.806 9.052 70.548 26.422 36.38 18.192 79.56 49.684 81.592 97.138 0.062 1.154 0.098 2.314 0.098 3.484 0 35.346-28.654 64-64 64s-64-28.654-64-64c0-16.854 6.526-32.176 17.174-43.606-18.414-9.23-39.31-16.9-56.936-21.35-17.142-4.286-27.566-21.66-23.282-38.804zM512 832c-116.51 0-218.464-62.274-274.426-155.344l82.328-49.396c39.174 65.148 110.542 108.74 192.098 108.74 81.554 0 152.924-43.592 192.098-108.74l82.328 49.396c-55.962 93.070-157.916 155.344-274.426 155.344z";

var citiesArray = new Array();
var totalCities = 0;

var map11;
var map1m;
var mapmm;

var tbl11;
var tbl1m;
var tblmm;

$(function(){

    $('#menu_3d').addClass('active');

    initComponents();
    initTables();
    initEvents();

});


function initComponents(){

    citiesArray= [{
        svgPath: targetSVG,
        title: "Brussels",
        latitude: 50.8371,
        longitude: 4.3676,
        ip: '88.190.229.170'
    }, {
        svgPath: targetSVG,
        title: "Prague",
        latitude: 50.0878,
        longitude: 14.4205,
        ip: '189.217.123.133'
    }, {
        svgPath: targetSVG,
        title: "Athens",
        latitude: 37.9792,
        longitude: 23.7166,
        ip: '198.105.244.228'
    }, {
        svgPath: targetSVG,
        title: "Reykjavik",
        latitude: 64.1353,
        longitude: -21.8952,
        ip: '70.209.11.89'
    }, {
        svgPath: targetSVG,
        title: "Dublin",
        latitude: 53.3441,
        longitude: -6.2675,
        ip: '209.132.232.92'
    }, {
        svgPath: targetSVG,
        title: "Oslo",
        latitude: 59.9138,
        longitude: 10.7387,
        ip: '99.244.49.71'
    }, {
        svgPath: targetSVG,
        title: "Lisbon",
        latitude: 38.7072,
        longitude: -9.1355,
        ip: '34,56.123.43'
    }, {
        svgPath: targetSVG,
        title: "Moscow",
        latitude: 55.7558,
        longitude: 37.6176,
        ip: '121.23.43.111'
    }, {
        svgPath: targetSVG,
        title: "Belgrade",
        latitude: 44.8048,
        longitude: 20.4781,
        ip: '98.12.111.76'
    }, {
        svgPath: targetSVG,
        title: "Bratislava",
        latitude: 48.2116,
        longitude: 17.1547,
        ip: '188.12.33.41'
    }, {
        svgPath: targetSVG,
        title: "Ljubljana",
        latitude: 46.0514,
        longitude: 14.5060,
        ip: '93.12.33.146'
    }, {
        svgPath: targetSVG,
        title: "Madrid",
        latitude: 40.4167,
        longitude: -3.7033,
        ip: '109.2.43.50'
    }, {
        svgPath: targetSVG,
        title: "Stockholm",
        latitude: 59.3328,
        longitude: 18.0645,
        ip: '12.33.11.90'
    }, {
        svgPath: targetSVG,
        title: "Bern",
        latitude: 46.9480,
        longitude: 7.4481,
        ip: '44.51.230.188'
    }, {
        svgPath: targetSVG,
        title: "Kiev",
        latitude: 50.4422,
        longitude: 30.5367,
        ip: '73.12.23.42'
    }, {
        svgPath: targetSVG,
        title: "Paris",
        latitude: 48.8567,
        longitude: 2.3510,
        ip: '72.8.6.22'
    }, {
        svgPath: targetSVG,
        title: "New York",
        latitude: 40.43,
        longitude: -74,
        ip: '92.141.10.100'
    }];

    totalCities = citiesArray.length;

    areaSettings = {unlistedAreasColor: "#8dd9ef"};
    imageSettings = {
        color: "#585869",
        rollOverColor: "#585869",
        selectedColor: "#585869",
        pauseDuration: 0.2,
        animationDuration:2.5,
        adjustAnimationSpeed:true
    };
    linesSettings = {
        dashLength:1,
        color: "#585869",
        alpha: 0.4
    };

    AmCharts.ready(function(){

        map11 = new AmCharts.AmMap();
        map1m = new AmCharts.AmMap();
        mapmm = new AmCharts.AmMap();

        map11.areasSettings = areaSettings;
        map1m.areasSettings = areaSettings;
        mapmm.areasSettings = areaSettings;

        map11.imagesSettings = imageSettings;
        map1m.imagesSettings = imageSettings;
        mapmm.imagesSettings = imageSettings;

        map11.linesSettings = linesSettings;
        map1m.linesSettings = linesSettings;
        mapmm.linesSettings = linesSettings;

        var dataprovider11 = {
            mapVar: AmCharts.maps.worldLow,
            images: [citiesArray[0], citiesArray[3]],
            lines: [{id:'line11', arc: -0.85,thickness: 2, color: 'red', latitudes:[citiesArray[0].latitude, citiesArray[3].latitude], longitudes:[citiesArray[0].longitude, citiesArray[3].longitude]}],
            zoomLevel: 2.5,
            zoomLongitude: -35,
            zoomLatitude: 42
        };

        var dataprovider1m = {
            mapVar: AmCharts.maps.worldLow,
            images: citiesArray,
            zoomLevel: 2.5,
            zoomLongitude: -35,
            zoomLatitude: 42
        };

        var dataprovidermm = {
            mapVar: AmCharts.maps.worldLow,
            images: citiesArray,
            zoomLevel: 2.5,
            zoomLongitude: -35,
            zoomLatitude: 42
        };

        map11.dataProvider = dataprovider11;
        map11.write('map11');

        map1m.dataProvider = dataprovider1m;
        map1m.write('map1m');

        mapmm.dataProvider = dataprovidermm;
        mapmm.write('mapmm');


    })

}

function initTables(){

    tbl11 = $('#tab1 .cityattack').DataTable({


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

    tbl1m = $('#tab2 .cityattack').DataTable({


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
        },

        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
            nRow.setAttribute('line-id', aData[6])
            return nRow;
        }
    });

    tblmm = $('#tab3 .cityattack').DataTable({


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
        },

        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
            nRow.setAttribute('line-id', aData[6])
            return nRow;
        }
    });

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder','Type to filter...');


    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: "-1"
    });

}


var loaded11 = false;
var loaded1m = false;
var loadedmm = false;

var centerCity = null;
var linkedCity = new Array();

var linkedCities = new Array();

var mapColors = ['red', 'green', 'blue', 'yellow'];
var attackType = ['DDoS', 'Port Scan', 'SSH Brute Force', 'Phishing'];
var thickNessArray = [2,3,4,5];
var attackStrength = ['low','medium', 'high', 'high'];
/**
 * Events
 */
function initEvents(){


    // Button with progress
    Ladda.bind('#btn11', {
        callback: function(instance) {
            var progress = 0;
            var interval = setInterval(function() {

                if(!loaded11) {
                    // Add icon to line
                    map11.dataProvider.images.push({
                        svgPath: planeSVG,
                        positionOnLine: 0,
                        color: "#585869",
                        animateAlongLine: true,
                        lineId: "line11",
                        flipDirection: true,
                        loop: true,
                        scale: 0.03,
                        positionScale: 1.8
                    });

                    map11.validateData();


                    // Insert data to data table
                    tbl11.row.add([
                        map11.dataProvider.images[0].title,
                        map11.dataProvider.images[0].ip,
                        map11.dataProvider.images[1].title,
                        map11.dataProvider.images[1].ip,
                        'DDoS',
                        'High'
                    ]).draw(false);

                    loaded11 = !loaded11;
                }

                progress = 1;
                instance.setProgress(progress);

                if( progress === 1 ) {
                    instance.stop();
                    clearInterval(interval);
                }
            }, 200);
        }
    });


    // Button with progress
    Ladda.bind('#btn1m', {
        callback: function(instance) {
            var progress = 0;
            var interval = setInterval(function() {

                if(linkedCity.length == 5) {
                    loaded1m = !loaded1m;
                    progress = 1;
                }else{
                    progress = linkedCity.length/5;
                }

                instance.setProgress(progress);

                if( progress === 1 ) {
                    instance.stop();
                    clearInterval(interval);
                }

                if(!loaded1m) {
                    // Random pick center city
                    if(!centerCity){
                        centerCity = citiesArray[Math.floor(Math.random()*(citiesArray.length-0+1) + 0 )];
                    }
                    // Assign line between cities
                    city = citiesArray[Math.floor(Math.random()*(citiesArray.length) + 0 )];
                    if(!(city.line && city!=null && city.title != centerCity.title && linkedCity.indexOf(city.title) == -1)){

                        var index = Math.floor(Math.random()*3);

                        // Link center to this city
                        line = {
                            id: Math.random().toString(36).slice(2),
                            latitudes: [centerCity.latitude, city.latitude],
                            longitudes: [centerCity.longitude, city.longitude],
                            thickness:thickNessArray[index],
                            arc: -0.85,
                            alpha: 0.3,
                            color: mapColors[index]
                        };
                        map1m.dataProvider.lines.push(line);

                        map1m.dataProvider.images.push({
                            svgPath: planeSVG,
                            positionOnLine: 0,
                            color: "#585869",
                            animateAlongLine: true,
                            lineId: line.id,
                            flipDirection: false,
                            loop: true,
                            scale: 0.03,
                            positionScale: 1.8
                        });

                        // Assign the icon

                        map1m.validateData();

                        // Insert data to data table
                        tbl1m.row.add([
                            centerCity.title,
                            centerCity.ip,
                            city.title,
                            city.ip,
                            attackType[index],
                            attackStrength[index],
                            line.id
                        ]).draw(false);


                        linkedCity.push(city.title);
                    }

                }


            }, 5000);
        }
    });

    // Button with progress
    Ladda.bind('#btnmm', {
        callback: function(instance) {
            var progress = 0;
            var interval = setInterval(function() {

                if(linkedCities.length == 20){
                    progress = 1;
                }else{
                    progress = linkedCities.length / 20;
                }
                instance.setProgress(progress);

                if( progress === 1 ) {
                    instance.stop();
                    clearInterval(interval);
                }

                var linked = false;

                if(!loadedmm) {
                    // Random pick 2 cities
                    var city1 = citiesArray[Math.floor(Math.random()*(citiesArray.length-0+1) + 0 )];
                    var city2 = citiesArray[Math.floor(Math.random()*(citiesArray.length-0+1) + 0 )];



                    if(city1 != null && city2 != null && !city1.line && !city2.line) {
                        // Check if cities has been linked before
                        for (var i = 0; i < linkedCities.length; i++) {
                            linkedCityInstance = linkedCities[i];
                            if ((linkedCityInstance.indexOf(city1.title) == -1) || (linkedCityInstance.indexOf(city2.title) == -1)) {
                                linked = false;
                            } else {
                                // Existing
                                linked = true;
                            }

                        }
                    }

                    // No traffice been captured before
                    if( !linked && city1 != null && city2 != null && !city1.line && !city2.line &&(city1.title != city2.title)){

                        var index = Math.floor(Math.random()*3);
                        // Add line
                        line = {
                            id: Math.random().toString(36).slice(2),
                            latitudes: [city1.latitude, city2.latitude],
                            longitudes: [city1.longitude, city2.longitude],
                            thickness:thickNessArray[index],
                            arc: -0.85,
                            alpha: 0.3,
                            color: mapColors[index]
                        };

                        mapmm.dataProvider.lines.push(line);

                        mapmm.dataProvider.images.push({
                            svgPath: planeSVG,
                            positionOnLine: 0,
                            color: "#585869",
                            animateAlongLine: true,
                            lineId: line.id,
                            flipDirection: false,
                            loop: true,
                            scale: 0.03,
                            positionScale: 1.8
                        });

                        mapmm.validateData();

                        tblmm.row.add([
                            city1.title,
                            city1.ip,
                            city2.title,
                            city2.ip,
                            attackType[index],
                            attackStrength[index],
                            line.id
                        ]).draw(false);

                        // Push record
                        linkedCities.push([city1.title, city2.title]);
                    }

                }


            }, 5000);
        }
    });


    // Table onclick event
    $('#tab2 .cityattack tbody').on('click', 'tr', function(event){
        // Get line id
        lineid = $(this).attr('line-id');

        // Get the line
        map1m.dataProvider.lines.forEach(function(entry){
            if(entry.id == lineid){
                // Modify this line
                entry.thickness = 10;
            }else{
                entry.thickness = 2;
            }
        });
        map1m.validateData();
    });

    // Table onclick event
    $('#tab3 .cityattack tbody').on('click', 'tr', function(event){
        // Get line id
        lineid = $(this).attr('line-id');

        // Get the line
        mapmm.dataProvider.lines.forEach(function(entry){
            if(entry.id == lineid){
                // Modify this line
                entry.thickness = 10;
            }else{
                entry.thickness = 2;
            }
        });
        mapmm.validateData();
    });

}