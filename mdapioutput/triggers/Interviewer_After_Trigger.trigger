
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/


trigger Interviewer_After_Trigger on Interviewer__c (after insert, after update) {
    
    Interviewer__c intv = Trigger.new[0];
    String relatePositionId = intv.Position__c;
    System.debug('relatePositionId: '+ relatePositionId);
    String intvType = intv.Interview_Type__c;
    System.debug('intvType: '+ intvType);
    String intvId = intv.id;
    System.debug('intvId: '+ intvId);
    
    Boolean userHasAccesstoField1 = Schema.sObjectType.Interview_Questions__c.fields.id.isAccessible() ;
    Boolean userHasAccesstoField2 = Schema.sObjectType.Interview_Questions__c.fields.Interview_Type__c.isAccessible() ;
    Boolean userHasAccesstoField3 = Schema.sObjectType.Interview_Questions__c.fields.Question__c.isAccessible() ;
    Boolean userHasAccesstoField4 = Schema.sObjectType.Interview_Questions__c.fields.Position__c.isAccessible() ;
    
    
    List<Interview_Questions__c> intvQuestions = null;
    if (userHasAccesstoField1 && userHasAccesstoField2 && userHasAccesstoField3 && userHasAccesstoField4)
    {
    intvQuestions = [select id, Interview_Type__c, Question__c
                                                                from Interview_Questions__c where Position__c =: relatePositionId and Interview_Type__c =: intvType ];
	}
    System.debug('intvQuestions: '+ intvQuestions);
    List<Interview_Answer__c> lstToAdd = new List<Interview_Answer__c>();
    
    for(Interview_Questions__c a: intvQuestions){
      Interview_Answer__c rec =  new Interview_Answer__c();
      rec.Question__c = a.Question__c;
      rec.Interview_Question__c = a.id;
      rec.Interviewer__c = intvId;
      lstToAdd.add(rec);  
   }
    System.debug('lstToAdd: '+ lstToAdd);
    insert lstToAdd;
    

}