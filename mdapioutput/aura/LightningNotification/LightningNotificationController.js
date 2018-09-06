
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/

({
	onCometdLoaded : function(component, event, helper) {
        console.log("onCometdLoaded: entered");
        
        
        // Retrieve session id
      var action = component.get("c.getSessionId");
      action.setCallback(this, function(response) {
        if (component.isValid() && response.getState() === 'SUCCESS') {
          component.set('v.sessionId', response.getReturnValue());
          console.log("onCometdLoaded - sessionId: "+ component.get('v.sessionId'));
           
          var cometd = new org.cometd.CometD();
          component.set('v.cometd', cometd);  
          
            var cObject = component.get('v.cometd');
          console.log("onCometdLoaded - cometd: "+ cObject);  
          
		  helper.connectCometd(component);

        }
        else
          console.error(response);
      });
      $A.enqueueAction(action);
        
        
        
        
        	
         
           
		
	},
    
    
    
    doInit : function(component, event, helper) {
      console.log("onCometdLoaded:doInit: entered"); 
      /*
      // Retrieve session id
      var action = component.get("c.getSessionId");
      action.setCallback(this, function(response) {
        if (component.isValid() && response.getState() === 'SUCCESS') {
          component.set('v.sessionId', response.getReturnValue());
          console.log("doInit - sessionId: "+ component.get('v.sessionId'));
          console.log("doInit - cometd: "+ component.get('v.cometd'));  
          if (component.get('v.cometd') != null)
            //helper.connectCometd(component);
        }
        else
          console.error(response);
      });
      $A.enqueueAction(action);
    
         
     */ 
    },
    
    
    
    
     handleClick : function(component, event, helper) {
         console.log("handleClick: entered"); 
         var action = component.get("c.RunInstantToast");
         action.setCallback(this, function(response) {
            console.log("HelloWorld: handleClick.setCallBack: entered"); 
             var state = response.getState();
            
            // This callback doesn’t reference cmp. If it did,
            // you should run an isValid() check
            //if (cmp.isValid() && state === "SUCCESS") {
            if (state === "SUCCESS") {
                console.log("HelloWorld: handleClick.setCallBack.Success: entered");
                
               /* 
                var retMessage = response.getReturnValue();
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": retMessage
                });
                toastEvent.fire();
              */  
              
                
            }
            //else if (cmp.isValid() && state === "INCOMPLETE") {
            else if (state === "INCOMPLETE") {
                // do something
                console.log("HelloWorld: doInit.setCallBack.Incomplete: entered");
            }
            //else if (cmp.isValid() && state === "ERROR") {
            else if (state === "ERROR") {
                console.log("HelloWorld: doInit.setCallBack.Error: entered");
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
         $A.enqueueAction(action);
     }
    
    
})