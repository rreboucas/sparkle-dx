
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/

({
	doInit : function(component, event, helper) {
        
        console.log("CanvasAppController.doInit: entered");
        
        component.set("v.params", "{userName:'value1',firstName:'value2'}");

        console.log("CanvasAppController.doInit: exit");
        
    }
})