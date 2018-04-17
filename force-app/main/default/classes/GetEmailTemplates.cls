
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
public class GetEmailTemplates {
    @AuraEnabled
    public static List<EmailTemplate> getTemplates() {
        return [SELECT Body,Id,Name,Subject,TemplateType FROM EmailTemplate Limit 20];
    }
    //add method to get email templates
    //add method to preview templates
}