declare module "@apex/Twitter_Lightning_Controller.hasTwitterID" {
  export function hasTwitterID(param: {recordID: any, objectApiName: any, twitterIDFieldApiName: any}): Promise<any>;
}
declare module "@apex/Twitter_Lightning_Controller.getRecordDetails" {
  export function getRecordDetails(param: {recordID: any, objectApiName: any, twitterIDFieldApiName: any, firstName: any, lastName: any, companyName: any, email: any}): Promise<any>;
}
declare module "@apex/Twitter_Lightning_Controller.getTwitterPicture" {
  export function getTwitterPicture(param: {recordID: any, objectApiName: any, twitterIDFieldApiName: any}): Promise<any>;
}
declare module "@apex/Twitter_Lightning_Controller.getTwitterUser" {
  export function getTwitterUser(param: {twitterName: any, firstName: any, lastName: any, companyName: any, email: any}): Promise<any>;
}
