
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/

public with sharing class MyCustomController {

    private final Account account;

    public MyCustomController() {
        account = new Account();
    }

    public List<Candidate__c> getTopCandidates() {


        Boolean userHasAccesstoField1 = Schema.sObjectType.Candidate__c.fields.id.isAccessible() ;
        Boolean userHasAccesstoField2 = Schema.sObjectType.Candidate__c.fields.Average_Score__c.isAccessible() ;
        Boolean userHasAccesstoField3 = Schema.sObjectType.Candidate__c.fields.Number_of_Interviews__c.isAccessible() ;
        Boolean userHasAccesstoField4 = Schema.sObjectType.Candidate__c.fields.Name.isAccessible() ;
        List<Candidate__c> candidates = null;

        if (userHasAccesstoField1 && userHasAccesstoField2 && userHasAccesstoField3 && userHasAccesstoField4){
        candidates = [SELECT id, Name,Average_Score__c,
                                                          Number_of_Interviews__c FROM Candidate__c 
                                                          order by Number_of_Interviews__c desc, Average_Score__c desc limit 3]; 
                           }
        return candidates; 
    }
    
    
    public List<Position__c> getUpcomingPositions() {

        
        Boolean userHasAccesstoField1 = Schema.sObjectType.Position__c.fields.id.isAccessible() ;
        Boolean userHasAccesstoField2 = Schema.sObjectType.User.fields.name.isAccessible() ;
        Boolean userHasAccesstoField3 = Schema.sObjectType.Position__c.fields.ownerid.isAccessible() ;
        Boolean userHasAccesstoField4 = Schema.sObjectType.Position__c.fields.Name.isAccessible() ;
        Boolean userHasAccesstoField5 = Schema.sObjectType.Position__c.fields.Fullfilment_Date_Limit__c.isAccessible() ;
        Boolean userHasAccesstoField6 = Schema.sObjectType.Position__c.fields.Hiring_Manager__c.isAccessible() ;

        List<Position__c> positions = null;
        
        if (userHasAccesstoField1 && userHasAccesstoField2 && userHasAccesstoField3 && userHasAccesstoField4 && userHasAccesstoField5 && userHasAccesstoField6){
        positions = [SELECT Id,Name,owner.name, ownerid, Fullfilment_Date_Limit__c,Hiring_Manager__c, Hiring_Manager__r.Name,Status__c 
                                                        FROM Position__c 
                                                        where Fullfilment_Date_Limit__c > TODAY 
                                                        order by Fullfilment_Date_Limit__c desc limit 3]; 
                                                    }
        return positions; 
    }
    
    
    public List<Interview__c> getTodaysInterviews() {

        Boolean userHasAccesstoField1 = Schema.sObjectType.Interview__c.fields.id.isAccessible() ;
        Boolean userHasAccesstoField2 = Schema.sObjectType.Candidate__c.fields.name.isAccessible() ;
        Boolean userHasAccesstoField3 = Schema.sObjectType.Interview__c.fields.Candidate__c.isAccessible() ;
        Boolean userHasAccesstoField4 = Schema.sObjectType.Interview__c.fields.Name.isAccessible() ;
        Boolean userHasAccesstoField5 = Schema.sObjectType.Interview__c.fields.Interview_Type__c.isAccessible() ;

        List<Interview__c> interviews = null;
        if (userHasAccesstoField1 && userHasAccesstoField2 && userHasAccesstoField3 && userHasAccesstoField4 && userHasAccesstoField5){
        interviews = [SELECT Id,name,Candidate__c,Candidate__r.Name, Interview_Type__c 
                                                          FROM Interview__c limit 3]; 
                                                      }
        return interviews; 
    }

    public PageReference save() {
        Schema.DescribeSObjectResult drSObj = Schema.sObjectType.Account;
        if (drSObj.isUpdateable()){
            update account;
        }
        return null;
    }
}