({
    rerender: function (component,helper) {

        var nodes = this.superRerender();

        // If the Leaflet library is not yet loaded, we can't draw the map: return
        if ( (!window.L) || (component.get("v.mapLoaded") == true) || (!component.get("v.properties")) || (!component.get("v.oos")) || (!component.get("v.jsLoaded")) || (typeof HeatmapOverlay != 'function') ) {
            return nodes;
        }        
        
        // Get locations object
        locations = component.get("v.properties");
        var locations_data = Array();
        for ( var i = 0; i < locations.length; i++ ) {
            var parse_Lat = parseFloat(locations[i]['instock__Location__Latitude__s']);
            var parse_Lng = parseFloat(locations[i]['instock__Location__Longitude__s']);
            var heat = locations[i]['instock__Out_of_stock_counter__c'];	
            
            //if( !isNaN(parse_Lat) || !isNaN(parse_Lng) ) {
                var data = { lat: parse_Lat, lng: parse_Lng, count: heat };
                locations_data.push(data);
            //}   
        };        
        
        var map = document.getElementById("map");
        map.innerHTML = "errorMsg";
        var testData = {
            max: 4,
            data: locations_data
        };
        
        
        var baseLayer = L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }
        );
        var cfg = {
            // radius should be small ONLY if scaleRadius is true (or small radius is intended)
            "radius": 5,
            "maxOpacity": .8, 
            // scales the radius based on map zoom
            "scaleRadius": true, 
            // if set to false the heatmap uses the global maximum for colorization
            // if activated: uses the data maximum within the current map boundaries 
            //   (there will always be a red spot with useLocalExtremas true)
            "useLocalExtrema": true,
            // which field name in your data represents the latitude - default "lat"
            latField: 'lat',
            // which field name in your data represents the longitude - default "lng"
            lngField: 'lng',
            // which field name in your data represents the data value - default "value"
            valueField: 'count'
        };
        
        var heatmapLayer = new HeatmapOverlay(cfg);
        
        var map = new L.Map('map', {
            center: new L.LatLng(19.180000000000000, -90.465500000000000),
            zoom: 4,
            layers: [baseLayer, heatmapLayer]
        });
        heatmapLayer.setData(testData);
        // make accessible for debugging
        layer = heatmapLayer;
        
        // ******************************************
        // *******           CHART            *******
        // ******************************************
        
        oos = component.get("v.oos");
        if( oos.length == 0){
            return nodes;
        }
        var data = Array();
        var count_data = Array();
        var horizontalBarChartData = {labels: [""], datasets: [{'label':'Ruffles','backgroundColor': '#E7AE00','borderColor': '#E7AE00','data': [ 1 ]}]};
        var new_dataset = { 'labels':Array(),'datasets':Array() };

        for ( var i = 0; i < oos.length; i++ ) {
            if ( locations[0]['Id'] == oos[i]['instock__NombreEstablecimiento__c'] ) {
                if ( count_data[oos[i]['instock__Producto__c']] ) {
                    count_data[oos[i]['instock__Producto__c']]++;
                }else{
                    count_data[oos[i]['instock__Producto__c']] = 1;
                }
            }
        };    
        for ( var i = 0; i < oos.length; i++ ) {
            if ( (locations[0]['Id'] == oos[i]['instock__NombreEstablecimiento__c']) && (count_data[oos[i]['instock__Producto__c']]) ) {
                if ( !oos[i]['instock__Producto__r'] ) {
                    Name = 'Producto sin Nombre';
                }else{
                    Name = oos[i]['instock__Producto__r']['Name'];
                }                    
                data.push({'label':(Name),
                           'backgroundColor': '#E7AE00',
                           'borderColor': '#E7AE00',
                           'data': [ parseInt(count_data[oos[i]['instock__Producto__c']]) ] 
                          });
                delete count_data[oos[i]['instock__Producto__c']];
            }
        };
        new_dataset.datasets = data;
        // ADD DATASETS	
        var colores = ['#949bce' , '#7eef4a' , '#ffeb00' , '#e00000'];
        for (var index = 0; index < data.length; ++index) {
            if( parseInt(data[index].data[0]) <= 2 ){
                color = colores[0];
            }else if ( (parseInt(data[index].data[0]) > 2) && (parseInt(data[index].data[0]) <= 4) ) {
                color = colores[1];
            }else if ( (parseInt(data[index].data[0]) > 4) && (parseInt(data[index].data[0]) <= 8) ) {
                color = colores[2];
            }else if ( parseInt(data[index].data[0]) > 8) {
                color = colores[3];
            }
            data[index].backgroundColor = data[index].borderColor = color;
        }
        horizontalBarChartData.datasets = data;
        // *************
        
        var ctx = document.getElementById("canvas_chart").getContext("2d");
        window.myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            data: horizontalBarChartData,
            options: {
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 0,
                        bottom: 0
                    }
                },elements: {
                    rectangle: {
                        borderWidth: 1,
                    }
                },
                responsive: true,
                legend: {
                    display:false,
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: locations[0]['Name']
                },
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            min: 0,
                            //max: 10
                            //suggestedMin: 2,
                            //beginAtZero: true,   // minimum value will be 0.
                        },
                    }],
                    yAxes: [{
                        maxBarThickness:50
                    }],
                },
            }
        });
        
        helper.listener(component,map,window.myHorizontalBar,horizontalBarChartData);
        
        
        return nodes;
    },

})