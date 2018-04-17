
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
global with sharing class RecordsStores {
@auraEnabled 
    public static List<Candidate__c> getAllredcords()
    {
     List<Candidate__c> reg=new LIST<Candidate__c>();  
        reg=[SELECT A.id,
             		A.Name,
             		A.counter__c,
             		A.Location__Latitude__s,
             		A.Location__Longitude__s 
             FROM Candidate__c A 
             WHERE Location__Latitude__s != null AND Location__Longitude__s != null AND  A.counter__c > 0
             ORDER BY A.counter__c DESC];
       
        return reg;
    }  


    
}