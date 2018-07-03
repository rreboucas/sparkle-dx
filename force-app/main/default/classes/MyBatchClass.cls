global class MyBatchClass implements 
    Database.Batchable<sObject>, Database.Stateful {
    
    // instance member to retain state across transactions
    global Integer recordsProcessed = 0;

    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT ID, MailingStreet, MailingCity, ' +
            'MailingState, MailingPostalCode, Account.BillingStreet, Account.BillingCity, Account.BillingState, Account.BillingPostalCode FROM Contact where Account.BillingCountry = \'USA\''
        );
    }

    global void execute(Database.BatchableContext bc, List<Contact> scope){
        // process each batch of records
        List<Contact> contacts = new List<Contact>();
        for (Contact c : scope) {
                c.MailingStreet = c.account.BillingStreet;
                c.MailingCity = c.account.BillingCity;
                c.MailingState = c.account.BillingState;
                c.MailingPostalCode = c.account.BillingPostalCode;
                // add contact to list to be updated
                contacts.add(c);
                // increment the instance member counter
                recordsProcessed = recordsProcessed + 1;
        }
        update contacts;
    }    

    global void finish(Database.BatchableContext bc){
        System.debug(recordsProcessed + ' records processed. Shazam!');
        
        
        AsyncApexJob job = [SELECT Id, Status, NumberOfErrors, 
            JobItemsProcessed,
            TotalJobItems, CreatedBy.Email
            FROM AsyncApexJob
            WHERE Id = :bc.getJobId()];
        
        
        
        
        
        // call some utility to publish platform event
        
        List<Notification__e> notificationEvents = new List<Notification__e>();
        notificationEvents.add(new Notification__e(Message__c =
                                                  'Batch Operation finished with Status' + job.Status + ' , ' + job.JobItemsProcessed + ' items were processed with ' + job.NumberOfErrors + ' errors.'));
        
        
        // Call method to publish event
        List<Database.SaveResult> results = EventBus.publish(notificationEvents);
        
        // Inspect publishing result for each event
        for (Database.SaveResult sr : results) {
            if (sr.isSuccess()) {
                System.debug('Successfully published event.' + sr);
            } else {
                for(Database.Error err : sr.getErrors()) {
                    System.debug('Error returned: ' +
                                err.getStatusCode() +
                                ' - ' +
                                err.getMessage());
                }
            }       
        }

    }    

}