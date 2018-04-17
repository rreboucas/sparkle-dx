
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
public with sharing class CandidateGeneralController {
    
    
    
    public List<Candidate__c> getTopCandidates() {

    	Boolean userHasAccesstoField1 = Schema.sObjectType.Candidate__c.fields.id.isAccessible() ;
        Boolean userHasAccesstoField2 = Schema.sObjectType.Candidate__c.fields.Average_Score__c.isAccessible() ;
        Boolean userHasAccesstoField3 = Schema.sObjectType.Candidate__c.fields.Number_of_Interviews__c.isAccessible() ;
        Boolean userHasAccesstoField4 = Schema.sObjectType.Candidate__c.fields.Name.isAccessible() ;

        List<Candidate__c> candidates = null;
        
        if (userHasAccesstoField1 && userHasAccesstoField2 && userHasAccesstoField3 && userHasAccesstoField4){
        candidates = [SELECT id, Name,Average_Score__c, Number_of_Interviews__c FROM Candidate__c order by Number_of_Interviews__c desc, Average_Score__c desc limit 5]; 
                                                      }
        return candidates; 
    }
    

}