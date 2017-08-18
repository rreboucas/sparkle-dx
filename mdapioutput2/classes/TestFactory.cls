@isTest
public class TestFactory {
    // define default constants that can be accessible to assert against.

    public static final String DEFAULT_ACCOUNT_NAME = 'ACME Inc.';


    /* The “create” methods are used to instantiate the sobjects without inserting them. 
       This is tremendously helpful when you need to create a particular record and then tweak it before 
       it’s inserted from the calling code. */  

    
    public static Account createAccount(){

          return createAccount(DEFAULT_ACCOUNT_NAME);

    }

 

    /* The create methods are commonly overloaded to allow different properties to be set. */

    public static Account createAccount(String name){

           return new Account(

               Name = name

           );

    }
    

    public static Contact createContact(String fname, String lname,  String accountID){

           return new Contact(

               FirstName = fname,
               LastName = lname,
               Accountid = accountID

           );

    }

    public static EntitySubscription createEntitySubs(id prentID, id subscrID){

           return new EntitySubscription(

               ParentId = prentID,
               SubscriberId = subscrID

           );

    }

    public static Candidate__c createCandidate(String name, String fname, String city, String email, String lname, String state, String twitterid){

           return new Candidate__c(
           	   Name = name,
               First_Name__c = fname,
               City__c = city,
               E_mail__c = email,
               Last_Name__c = lname,
               State__c = state,
               Twitter_ID__c = twitterid

           );

    }
    
    public static Candidate__c createCandidateWithPosition(String name, String fname, String city, String email, String lname, String state, String twitterid, String positionId){

           return new Candidate__c(
           	   Name = name,
               First_Name__c = fname,
               City__c = city,
               E_mail__c = email,
               Last_Name__c = lname,
               State__c = state,
               Twitter_ID__c = twitterid,
               Position__c = positionId

           );

    }

    public static Position__c createPosition(String name, String recStatus){

    	Date todaysDt = Date.today();
    	Date fDate = todaysDt.addMonths(6);

           return new Position__c(
           	   Name = name,
               Status__c = recStatus,
               Fullfilment_Date_Limit__c = fDate

           );

    }

    public static Interview__c createInterview(String candidateId, String recType, String recStatus){

    	DateTime myDateTime = datetime.now();
    	DateTime fDate = myDateTime.addMonths(1);

           return new Interview__c(
           	   Candidate__c = candidateId,
               Status__c = recStatus,
               Interview_Date__c = fDate,
               Interview_Type__c = recType

           );

    }

	public static Interviewer__c createInterviewer(String interviewId){

           return new Interviewer__c(
           	   Interview__c = interviewId

           );

    } 
    
    
    public static Offer__c createOffer(String candidateId, Double salary, Double bonus){

           return new Offer__c(
           	   Candidate__c = candidateId, 
               Annual_Salary_Offered_Amount__c = salary, 
               Annual_Bonus_Amount__c  = bonus

           );

    }
    
    /*
    public static EmailTemplate createEmailTemplate(String Body,FolderId,HtmlValue,Id,IsActive,Name,NamespacePrefix,OwnerId,Subject){

           return new Offer__c(
           	   Candidate__c = candidateId, 
               Annual_Salary_Offered_Amount__c = salary, 
               Annual_Bonus_Amount__c  = bonus

           );

    }
*/

    /* The “Insert” methods are used to create the sobjects and then insert them. They delegate 
       the creation to the create methods and then insert the records. Like the create methods,
       the insert methods are overloaded to allow different properties to be set as necessary.
       Another best practice is to bulk insert or bulk create data, but to keep the sample short, that’s omitted. */

    public static Account insertAccount(){

          Account accountToInsert = createAccount();
          insert accountToInsert;
          return accountToInsert;

    }

    public static Contact insertContact(String fname, String lname,  String accountID){

          Contact contactToInsert = createContact(fname, lname, accountID);
          insert contactToInsert;
          return contactToInsert;

    }
    
    public static EntitySubscription insertEntitySubscription(id parentID, id subscriberID){

          EntitySubscription entToInsert = createEntitySubs(parentID, subscriberID);
          insert entToInsert;
          return entToInsert;

    }

    public static Candidate__c insertCandidate(String name, String fname, String city, String email, String lname, String state, String twitterid){

          Candidate__c entToInsert = createCandidate(name, fname, city, email, lname, state, twitterid);
          insert entToInsert;
          return entToInsert;

    }
    
    public static Candidate__c insertCandidatewithPosition(String name, String fname, String city, String email, String lname, String state, String twitterid, String positionId){

          Candidate__c entToInsert = createCandidateWithPosition(name, fname, city, email, lname, state, twitterid, positionId);
          insert entToInsert;
          return entToInsert;

    }

    public static Position__c insertPosition(String name, String recStatus){

          Position__c entToInsert = createPosition(name, recStatus);
          insert entToInsert;
          return entToInsert;

    }

    public static Interview__c insertInterview(String candidateId, String recType, String recStatus){

          Interview__c entToInsert = createInterview(candidateId, recType, recStatus);
          insert entToInsert;
          return entToInsert;

    }

    public static Interviewer__c insertInterviewer(String interviewId){

          Interviewer__c entToInsert = createInterviewer(interviewId);
          insert entToInsert;
          return entToInsert;

    }
    
    public static Offer__c insertOffer(String candidateId, Double salary, Double bonus){

          Offer__c entToInsert = createOffer(candidateId, salary, bonus);
          insert entToInsert;
          return entToInsert;

    }

}