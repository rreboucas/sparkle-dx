trigger Interviewer_After_Trigger on testautonumdata__Interviewer__c (after insert, after update) {
    
    testautonumdata__Interviewer__c intv = Trigger.new[0];
    String relatePositionId = intv.testautonumdata__Position__c;
    System.debug('relatePositionId: '+ relatePositionId);
    String intvType = intv.testautonumdata__Interview_Type__c;
    System.debug('intvType: '+ intvType);
    String intvId = intv.id;
    System.debug('intvId: '+ intvId);
    
    Boolean userHasAccesstoField1 = Schema.sObjectType.testautonumdata__Interview_Questions__c.fields.id.isAccessible() ;
    Boolean userHasAccesstoField2 = Schema.sObjectType.testautonumdata__Interview_Questions__c.fields.testautonumdata__Interview_Type__c.isAccessible() ;
    Boolean userHasAccesstoField3 = Schema.sObjectType.testautonumdata__Interview_Questions__c.fields.testautonumdata__Question__c.isAccessible() ;
    Boolean userHasAccesstoField4 = Schema.sObjectType.testautonumdata__Interview_Questions__c.fields.testautonumdata__Position__c.isAccessible() ;
    
    
    List<testautonumdata__Interview_Questions__c> intvQuestions = null;
    if (userHasAccesstoField1 && userHasAccesstoField2 && userHasAccesstoField3 && userHasAccesstoField4)
    {
    intvQuestions = [select id, testautonumdata__Interview_Type__c, testautonumdata__Question__c
                                                                from testautonumdata__Interview_Questions__c where testautonumdata__Position__c =: relatePositionId and testautonumdata__Interview_Type__c =: intvType ];
	}
    System.debug('intvQuestions: '+ intvQuestions);
    List<testautonumdata__Interview_Answer__c> lstToAdd = new List<testautonumdata__Interview_Answer__c>();
    
    for(testautonumdata__Interview_Questions__c a: intvQuestions){
      testautonumdata__Interview_Answer__c rec =  new testautonumdata__Interview_Answer__c();
      rec.testautonumdata__Question__c = a.testautonumdata__Question__c;
      rec.testautonumdata__Interview_Question__c = a.id;
      rec.testautonumdata__Interviewer__c = intvId;
      lstToAdd.add(rec);  
   }
    System.debug('lstToAdd: '+ lstToAdd);
    insert lstToAdd;
    

}