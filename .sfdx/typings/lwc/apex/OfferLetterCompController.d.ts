declare module "@apex/OfferLetterCompController.getEmailTemplatesNames" {
  export function getEmailTemplatesNames(param: {candidateID: any}): Promise<any>;
}
declare module "@apex/OfferLetterCompController.getEmailTemplatebyId" {
  export function getEmailTemplatebyId(param: {templateId: any, candidateID: any, offerID: any}): Promise<any>;
}
declare module "@apex/OfferLetterCompController.upsertOfferRecord" {
  export function upsertOfferRecord(param: {offerId: any, candidateID: any, annualSalary: any, annualBonus: any}): Promise<any>;
}
declare module "@apex/OfferLetterCompController.sendEmail" {
  export function sendEmail(param: {body: any, subject: any, email: any, offerId: any}): Promise<any>;
}
