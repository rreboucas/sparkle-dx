
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
({
	OpenInstructionsPage:function(component,event,helper) {
        
        $A.log("ProjectSparkleLCsInfoController.OpenInstructionsPage: entered");


        // Navigvate to VF Page:
        
        var instURL = component.get("v.instructionsPageURL");
        
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": instURL
        });
        urlEvent.fire();
        
        
        $A.log("ProjectSparkleLCsInfoController.OpenInstructionsPage: exit");
	}
})