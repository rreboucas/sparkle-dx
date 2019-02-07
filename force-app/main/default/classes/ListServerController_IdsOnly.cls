public with sharing class ListServerController_IdsOnly {

    private static Map<String, Set<String>> mapObjectsFields = null;
    
    @AuraEnabled(cacheable=true)
    public static List<String> getListRecordsIds(String objectApiName, String filter1Field, String filter1Value) {

        // CRUD / FLS Check - Create a map with the object names and fields for CRUD\FLS check
        System.debug('#########Entered getListRecordsIds');
        mapObjectsFields = new Map<String, Set<String>>();
        Sparkle_Helper.AddFieldToObjectsMap('Id', objectApiName, mapObjectsFields);

        List<String> lstReturnedIds = new List<String>();

        // Start building the SOQL query dinamically

        String soql = 'Select id';

        // Add object name to query string:        
        soql += ' FROM ' + String.escapeSingleQuotes(objectApiName);

        // Add Filter Where clause if provided
        if (filter1Field != null && filter1Value != null)
        {
            soql += ' where ' + String.escapeSingleQuotes(filter1Field)  + ' = \'' + String.escapeSingleQuotes(filter1Value) +'\'';
            Sparkle_Helper.AddFieldToObjectsMap(filter1Field, objectApiName, mapObjectsFields);
        }

        // CRUD\FLS Check: Before running the SOQL query check if the user who is invoking this method has access to the Object and to the fields requested
        
        if (Sparkle_Helper.UserHasAccessToObjectsAndFields(mapObjectsFields))
        {

            List<SObject> lstQueriedRecords = Database.query(soql); 
            
            
            for (SObject e: lstQueriedRecords)
            {               
                lstReturnedIds.add(String.valueOf( e.get('id') ));             
            }
            
        }
        return lstReturnedIds;
    }
}
