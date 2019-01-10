import { LightningElement, track, api, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';

import AccountNameField from '@salesforce/schema/Account.Name';
import Account from '@salesforce/schema/Account';

/**
 * Gets a field value by recursing through spanned records.
 * @param {Object} record The record holding the field.
 * @param {string[]} field Field to retrieve.
 */
function getFieldValue(record, field) {
    const f = field.shift();
    const value = record.fields[f].value;
    if (field.length === 0) {
        return value;
    }
    return getFieldValue(value, field);
}

export default class Dynamiclist_listview extends LightningElement {

    @api headerText;

    @track objectNamePrivate;
    @api listViewSelected;
    // create getter and setter so we can call apex to save object api name on custom setting when we receive values from App Builder

    @api objectName;

    /*
    @api
    set objectName(value) {
        this.objectNamePrivate = value;
         saveLastObjectToLoad({
            objectApiName: value
        });
    }

    @api
    get objectName() {
        return this.objectNamePrivate;
    }
*/



    //

    @track message;
    @track columns;
    @track data;


   @wire(getListUi, { objectApiName: '$objectName', listViewApiName: '$listViewSelected' })
   wiredList({ data, error }) {
       if (error) {
           this.message = error.errorCode + ' - ' + error.message;
           this.columns = undefined;
           this.data = undefined;
       } else if (data) {
           this.message = undefined;

           // extract the column info
           this.columns = data.info.displayColumns.map(column => {
               return {
                   label: column.label,
                   fieldName: column.fieldApiName,
                   type: 'text',
               };
           });

           // extract the row data
           this.data = data.records.records.map(record => {
               return this.columns.reduce(
                   (row, column) => {
                       const field = column.fieldName.split('.');
                       row[column.fieldName] = getFieldValue(record, field);
                       return row;
                   },
                   { id: record.id },
               );
           });
       }
   }

   getSelectedId(event) {
    const selectedRows = event.target.selectedRows;
    var recordId = null;

    for (let i = 0; i < selectedRows.length; i++){
        recordId =  selectedRows[i].Id;
    }

    // Create a notification event with data in detail property
    const myCustomEvent = new CustomEvent('notification', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: { recId: recordId }
    });

    // Fire the event
    this.dispatchEvent(myCustomEvent);

}
}