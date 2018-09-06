({
	doInit : function(component, event, helper) {
        
        console.log("CustomPage1Controller.doInit: entered");
        
        var toggleText = component.find("sidenav");
        $A.util.addClass(toggleText,'toggle');
        
		console.log("CustomPage1Controller.doInit: exit");		
	},
    
    handleHamburgerClick : function (component, event) {
       console.log("handleHamburgerClick.doInit: entered"); 
       
        component.set('v.showQuestionMark', false);
        component.set('v.showClose', true);
        
       console.log("handleHamburgerClick.doInit: exit"); 
    },
    
    handleCloseClick : function (component, event) {
       console.log("handleCloseClick.doInit: entered"); 
       
        component.set('v.showClose', false);
        component.set('v.showQuestionMark', true);
        
       console.log("handleCloseClick.doInit: exit"); 
    }
    
})