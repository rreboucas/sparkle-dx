declare module "@salesforce/apex/Twitter_Lightning_Controller.hasTwitterID" {
  export default function hasTwitterID(param: {recordID: any, objectApiName: any, twitterIDFieldApiName: any}): Promise<any>;
}
declare module "@salesforce/apex/Twitter_Lightning_Controller.getRecordDetails" {
  export default function getRecordDetails(param: {recordID: any, objectApiName: any, twitterIDFieldApiName: any, firstName: any, lastName: any, companyName: any, email: any}): Promise<any>;
}
declare module "@salesforce/apex/Twitter_Lightning_Controller.getTwitterPicture" {
  export default function getTwitterPicture(param: {recordID: any, objectApiName: any, twitterIDFieldApiName: any}): Promise<any>;
}
declare module "@salesforce/apex/Twitter_Lightning_Controller.getTwitterUser" {
  export default function getTwitterUser(param: {twitterName: any, firstName: any, lastName: any, companyName: any, email: any}): Promise<any>;
}
