
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
({
	doInit : function(component, event, helper) {
		var main = component.find('main');
        $A.util.removeClass(main, 'small');
        $A.util.addClass(main, component.get("v.designHeight"));
	}
})