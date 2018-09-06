declare module "@salesforce/apex/OfferLetterCompController.getEmailTemplatesNames" {
  export default function getEmailTemplatesNames(param: {candidateID: any}): Promise<any>;
}
declare module "@salesforce/apex/OfferLetterCompController.getEmailTemplatebyId" {
  export default function getEmailTemplatebyId(param: {templateId: any, candidateID: any, offerID: any}): Promise<any>;
}
declare module "@salesforce/apex/OfferLetterCompController.upsertOfferRecord" {
  export default function upsertOfferRecord(param: {offerId: any, candidateID: any, annualSalary: any, annualBonus: any}): Promise<any>;
}
declare module "@salesforce/apex/OfferLetterCompController.sendEmail" {
  export default function sendEmail(param: {body: any, subject: any, email: any, offerId: any}): Promise<any>;
}
