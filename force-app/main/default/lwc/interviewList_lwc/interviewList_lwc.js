import { LightningElement, track, api, wire } from 'lwc';
import findListRecords from '@salesforce/apex/ListServerController.getListRecords';

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

export default class InterviewList extends LightningElement {

    @api flexipageRegionWidth;
    @api headerText;
    @api objectName;
    @api numRecsDisplay;
    @api broadcastFieldName;
    @api showNewRecButton;
    @api filterbyFieldName;
    @api filterbyFieldValue;
    @api column1HeaderTxt;
    @api column1FieldAPIName;
    @api column2HeaderTxt;
    @api column2FieldAPIName;
    @api column3HeaderTxt;
    @api column3FieldAPIName;
    @api column4HeaderTxt;
    @api column4FieldAPIName;
    @api showRowActionButton;
    @api sortFieldAPIName;
    @api defaultSortDir;

    @track message;
    @track columns;
    @track data;

// rowsLimit: '$numRecsDisplay', objectApiName: '$objectName',  filter1Field: '$filterbyFieldName', filter1Value: '$filterbyFieldValue', eventField: '$broadcastFieldName', column1: '$column1FieldAPIName', column2: '$column2FieldAPIName', column3: '$column3FieldAPIName', column4: '$column4FieldAPIName', sortField: '$sortFieldAPIName', sortDirection: '$defaultSortDir'

    @wire(findListRecords, { rowsLimit: '8', objectApiName: 'Candidate__c',  filter1Field: '', filter1Value: '', eventField: 'Id', column1: 'Name', column2: 'Name', column3: '', column4: '', sortField: 'Name', sortDirection: 'asc'})
                            wiredList;

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