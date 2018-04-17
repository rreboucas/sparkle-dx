({
	doInit : function(component, event, helper) {
		var main = component.find('main');
        $A.util.removeClass(main, 'small');
        $A.util.addClass(main, component.get("v.designHeight"));
	}
})