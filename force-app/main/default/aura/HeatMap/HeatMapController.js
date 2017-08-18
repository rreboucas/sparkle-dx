({

    jsLoaded: function(component, event, helper) {
        component.set("v.jsLoaded", true);   
    },
    
    doInit: function(cmp) {
        var action = cmp.get("c.getAllredcords");
        action.setCallback(this, function(response){
            var state = response.getState();
            var locations = response.getReturnValue();
            if (state === "SUCCESS") {
                cmp.set("v.properties", locations);
            }
        });
        $A.enqueueAction(action);
        
        
        
        
    },
    
    storeDetails : function(cmp, event, helper) {
        var store = cmp.get('v.nearest_store');
        
        //var map = cmp.find("map_container"); //slds-size--1-of-1
        //$A.util.addClass(map,"slds-size--1-of-2 slds-medium-size--5-of-6 slds-large-size--6-of-12");
        
        //var chart_container = cmp.find("chart_container"); 
        //$A.util.removeClass(chart_container,"hide");
        //console.log(store);
    },
    

})