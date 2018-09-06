({
     save : function(component, event, helper) {
        helper.save(component);
    },
    
    waiting: function(component, event, helper) {
    	
        
        
    },
    
    doneWaiting: function(component, event, helper) {
    	
        component.set("v.isUploading", false); 
    },
    handleChange: function (cmp, event) {
        var changeValue = event.getParam("value");
        component.set("v.uploadTypevalue", changeValue);   
    }
})