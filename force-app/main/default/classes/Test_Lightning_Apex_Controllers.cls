@isTest
private class Test_Lightning_Apex_Controllers {
	
	@isTest static void test_CandidateGeneralController() {
		// Implement test code
		CandidateGeneralController instance = new CandidateGeneralController();
		List<Candidate__c> lstRecs = instance.getTopCandidates();

	}
	
	@isTest static void test_FilesViewerServerController() {
		// Implement test code
		Test.startTest();

        Account a = TestFactory.insertAccount();

		List<FilesViewerServerController> lstRecs = FilesViewerServerController.getListRecords(a.id, '1');

		Test.stopTest();

	}

	@isTest static void test_GenericListMap_ServerController() {
		// Implement test code
		Test.startTest();

        // insert candidate records with lat long and twitter info

        // recordIds example: 'a0MB0000000cQYIMA2','a0MB0000000cuyfMAA','a0MB0000000drbGMAQ','a0MB0000000cQX5MAM','a0MB0000000cQdNMAU','a0MB0000000cQXKMA2','a0MB0000000cQdIMAU','a0MB0000000cQXoMAM'

        Candidate__c candidateA = TestFactory.insertCandidate('Candidate A', 'Candidate', 'San Francisco', 'r@r.com', 'A', 'CA', '@roreb');
        Candidate__c candidateB = TestFactory.insertCandidate('Candidate B', 'Candidate', 'San Francisco', 'r@r.com', 'B', 'CA', '@roreb');

        String recordIds = '\'' + candidateA.id + '\'' + ',' + '\'' + candidateB.id + '\'';

		List<GenericListMap_ServerController> lstRecs = GenericListMap_ServerController.getListRecords(recordIds, 'Candidate__c', 'Full_Name__c', 'Geolocation__Latitude__s', 'Geolocation__Longitude__s', 'City__c', 'State__c');

		Test.stopTest();

	}

	@isTest static void test_ListServerController() {
		// Implement test code
		Test.startTest();

        Account a = TestFactory.insertAccount();

		List<ListServerController> lstRecs = ListServerController.getListRecords('1', 'Account', 'Name', 'ACME Inc.' , 'Id', 'AccountNumber', 'Site', 'AccountSource', 'Phone', 'Name', 'asc');

		Test.stopTest();

	}

	@isTest static void test_Modal_Record_Detail_Controller() {
		// Implement test code
		Test.startTest();

        Account a = TestFactory.insertAccount();

		List<Modal_Record_Detail_Controller> lstRecs = Modal_Record_Detail_Controller.getListRecords(a.id, 'Account', 'Name', 'AccountSource', 'AccountNumber', 'Site');

		Test.stopTest();

	}
	
	@isTest static void test_RecordTimelineServerController() {
		// Implement test code
		Test.startTest();

        Account a = TestFactory.insertAccount();
        Contact c = TestFactory.insertContact('FirstName', 'LastName', a.id);

		List<RecordTimelineServerController> lstRecs = RecordTimelineServerController.getListRecords(a.id, '1', 'Contact', 'FirstName', 'FirstName', 'CreatedDate', 'CreatedDate', 'AccountId', 'Description', 'Department', 'Title', 'Phone');

		Test.stopTest();

	}

	@IsTest(SeeAllData=true) static void test_ReferralsServerController() {
		// Implement test code
		Test.startTest();

        Account a = TestFactory.insertAccount();
        Contact c = TestFactory.insertContact('FirstName', 'LastName', a.id);

		List<ReferralsServerController> lstRecs = ReferralsServerController.getListRecords('1', a.id, 'Contact', 'AccountId', 'FirstName', 'FirstName', 'OwnerId', 'Owner', 'LastName');

		Test.stopTest();

	}

	@IsTest(SeeAllData=true) static void test_RelatedListServerController() {
		// Implement test code
		Test.startTest();

        Account a = TestFactory.insertAccount();
        Contact c = TestFactory.insertContact('FirstName', 'LastName', a.id);

		List<RelatedListServerController> lstRecs = RelatedListServerController.getListRecords('1', a.id, 'Contact', 'AccountId', 'FirstName', 'FirstName', 'OwnerId', 'Owner', 'LastName');

		Test.stopTest();

	}

	@isTest static void test_Twitter_Lightning_Controller() {
		// Implement test code
		

        // insert candidate records with lat long and twitter info

        Candidate__c candidateA = TestFactory.insertCandidate('Candidate A', 'Candidate', 'San Francisco', 'r@r.com', 'A', 'CA', '@roreb');

		// Create Custom Settings for test:

        Twitter_User__c cstRecord = new Twitter_User__c(Name = 'TwitterApp',
    	Token_Secret__c  = 'LETjbmGTLmKF9tBldLY8gbNH3pwCgbg7o6ocSixKrkbdRbeJDx',
    	Token__c  = 'crTSqn98nBWCC8lbj0IauMv06');
        Database.UpsertResult urList = Database.upsert(cstRecord, true);

        Test.startTest();
        Boolean hasTwitId = Twitter_Lightning_Controller.hasTwitterID(candidateA.id, 'Candidate__c', 'Twitter_ID__c');

        // Set mock callout class 
        Test.setMock(HttpCalloutMock.class, new WebServiceMockImpl());

        Twitter_Lightning_Controller rec = Twitter_Lightning_Controller.getRecordDetails(candidateA.id, 'Candidate__c', 'Twitter_ID__c', 'First_Name__c', 'Last_Name__c', 'Company__c', 'E_mail__c');

        

		Twitter_Lightning_Controller recPicture = Twitter_Lightning_Controller.getTwitterPicture(candidateA.id, 'Candidate__c', 'Twitter_ID__c');

		Twitter_Lightning_Controller rec2 = Twitter_Lightning_Controller.getTwitterUser('@roreb', 'Candidate', 'A', '', 'r@r.com');

		Test.stopTest();

	}

	@isTest static void test_MyCustomController() {
		// Implement test code
		Test.startTest();

        MyCustomController ref = new MyCustomController();
        
        Candidate__c candidateA = TestFactory.insertCandidate('Candidate A', 'Candidate', 'San Francisco', 'r@r.com', 'A', 'CA', '@roreb');
        List<Candidate__c> lstCands = ref.getTopCandidates();

        Position__c positionA = TestFactory.insertPosition('Position1', 'Open');
        List<Position__c> lstPositions = ref.getUpcomingPositions();

        Interview__c interviewA = TestFactory.insertInterview(candidateA.id, 'Technical Interview', 'Pending');
        List<Interview__c> lstInterviews = ref.getTodaysInterviews();

		Test.stopTest();

	}

	@isTest static void test_myControllerExtension() {
		// Implement test code
		Test.startTest();

        Candidate__c candidateA = TestFactory.insertCandidate('Candidate A', 'Candidate', 'San Francisco', 'r@r.com', 'A', 'CA', '@roreb');

        Interview__c interviewA = TestFactory.insertInterview(candidateA.id, 'Technical Interview', 'Pending');

        Interviewer__c interviewerA = TestFactory.insertInterviewer(interviewA.id);


        ApexPages.currentPage().getParameters().put('id',interviewerA.id);
		ApexPages.StandardController stdInterviewer = new ApexPages.StandardController(interviewerA);
	    myControllerExtension objMyControllerExtension  = new myControllerExtension(stdInterviewer);
		
		objMyControllerExtension.getGreeting();
		objMyControllerExtension.getItems();
        
        
		Test.stopTest();

	}

	@isTest static void testInstallScript() {
	  	Sparkle_After_Install postinstall = new Sparkle_After_Install();
	    Test.testInstall(postinstall, null);
	    
  }

  @isTest static void test_Sparkle_Helper() {
	  	
  		/*Test.startTest();

        Candidate__c candidateA = TestFactory.insertCandidate('Candidate A', 'Candidate', 'San Francisco', 'r@r.com', 'A', 'CA', '@roreb');

        Interview__c interviewA = TestFactory.insertInterview(candidateA.id, 'Technical Interview', 'Pending');

        Interviewer__c interviewerA = TestFactory.insertInterviewer(interviewA.id);

	  	String returnValue = Sparkle_Helper.GetSobjectField(interviewerA, 'Id');
	  	//String returnValue2 = Sparkle_Helper.GetSobjectField(interviewerA, 'CreatedBy.Id');
	  	String returnValue3 = Sparkle_Helper.GetSobjectField(interviewerA, 'Interview__r.Name');
	  	String returnValue4 = Sparkle_Helper.GetSobjectField(interviewerA, 'Interview__r.Candidate__r.Name');

	  	Test.stopTest(); */
	    
  }
    
   @isTest static void test_OfferLetterCompController() {
		// Implement test code
		Test.startTest();
		Position__c positionA = TestFactory.insertPosition('Position1', 'Open');
        Candidate__c candidateA = TestFactory.insertCandidateWithPosition('Candidate A', 'Candidate', 'San Francisco', 'r@r.com', 'A', 'CA', '@roreb', positionA.id);
		
        // Test getEmailTemplatesNames method:
		List<OfferLetterCompController> lstRecs = OfferLetterCompController.getEmailTemplatesNames(candidateA.id);
      	
        Double salary = 10000;
        Double bonus = 5000;
        
      	Offer__c offerA = TestFactory.insertOffer(candidateA.id, salary, bonus);
      	EmailTemplate templateA = [SELECT Id FROM EmailTemplate where Folder.Name = 'Recruitment Templates' LIMIT 1];
        System.debug('templateA: ' + templateA);
        
        // Test getEmailTemplatebyId method:
      	List<OfferLetterCompController> lstRecs2 = OfferLetterCompController.getEmailTemplatebyId(templateA.id, candidateA.id, offerA.id);

        
        // Test upsertOfferRecord method:
        String lstRecs3 =  OfferLetterCompController.upsertOfferRecord(offerA.id, candidateA.id, salary, bonus);
        String lstRecs4 =  OfferLetterCompController.upsertOfferRecord(null, candidateA.id, salary, bonus);
        
        // Test sendEmail method:
        
        OfferLetterCompController.sendEmail('test body', 'test subject', 'r@r.com', offerA.id);
        
      	Test.stopTest();
	}

}