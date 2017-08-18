({
    listener : function(component,map,chart,chart_dataset) {
        var store; 
        component.set("v.mapLoaded",true);
        
        map.on('click', function(e) {
            var nearest = 999;            
            console.log('LatLng Clicked: '+e.latlng.lat +' | '+ e.latlng.lng);
            for ( var i = 0; i < locations.length; i++ ) {
                approx = Math.abs(parseFloat(locations[i]['Location__Latitude__s']) - parseFloat(e.latlng.lat));
                approx = approx + ( Math.abs(parseFloat(locations[i]['Location__Longitude__s']) - parseFloat(e.latlng.lng)) );
                if ( parseFloat(approx) < parseFloat(nearest) ){
                    store = locations[i];
                    nearest = approx;
                }
            };
            component.set("v.nearest_store",store);
            console.log(store);
           	
            setChartData(component,chart,chart_dataset);
            
        }); // END OF CLICK
        
        
        
            
        
    },
    
    
})