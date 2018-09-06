({
	doInit : function(component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var recordId = myPageRef && myPageRef.state ? myPageRef.state.c__recordId : null;
        component.set('v.recordId', recordId);
        
        /*
                var pageRef = {
                    type: "standard__recordPage",
                    attributes: {
                        recordId: selectedEventIDField,
                        actionName: "view"
                    },
                    state: {
                        "c__action": "SendOffer"
                    }
                };
        /**/
	}
})