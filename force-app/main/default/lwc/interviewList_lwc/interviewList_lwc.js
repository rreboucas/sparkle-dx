import { LightningElement, track, api, wire } from 'lwc';
import { getRecordUi } from 'lightning/uiRecordApi';
import findListRecords from '@salesforce/apex/ListServerController_IdsOnly.getListRecordsIds';
import { tableHelper } from 'c/dataTableHelper';
import { logger } from 'c/lwcLogger';


function setEmptyVars(value) {
    if (value === undefined) {
        return null;
    }
    return value;
}

export default class InterviewList extends LightningElement {

    @api flexipageRegionWidth;
    @api headerText;
    @api objectName;
    @api numRecsDisplay;
    @api broadcastFieldName;
    @api showNewRecButton;
    @api
    get filterbyFieldName() {
        if (this._filterbyFieldName === undefined)
            return null;
        return this._filterbyFieldName;
    }
    @api
    get filterbyFieldValue() {
        if (this._filterbyFieldValue === undefined)
            return null;
        return this._filterbyFieldValue;
    }

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

    @track apexMessage;
    @track ldsMessage;
    @track columns;
    @track data;
    @track rawRecords;
    @track rawData;
    @track ldsRecords;
    @track idsReturned;
    @track recordIds;
    @track retMap;


    recordIds = undefined;
    

    //objectApiName: '$objectName', filter1Field: '$filterbyFieldName', filter1Value: '$filterbyFieldValue'

    @wire(findListRecords, {objectApiName: '$objectName', filter1Field: '$filterbyFieldName', filter1Value: '$filterbyFieldValue'})
                            recordsReturned({ data, error }) {
                                if (error) {
                                    this.apexMessage = error.errorCode + ' - ' + error.message;
                                    this.apexData = undefined;
                                } else if (data) {
                                    this.apexMessage = undefined;
                                    this.recordIds = data;
                                    logger(true, 'interviewList_lwc', 'this.recordIds', this.recordIds);
                                    
                                
                                    
                                    
                                }
                            }


                                
    @wire(getRecordUi, { 
        recordIds: '$recordIds',
        layoutTypes: ['Full'],
        modes: ['View'] })
        retList({ data, error }) {
            if (error) {
                if (Array.isArray(error.body)) {
                    this.ldsMessage = error.body.map(e => e.message);
                } else if (error.body && typeof error.body.message === 'string') {
                    this.ldsMessage = error.body.message;
                } else {
                    this.ldsMessage = 'Unknown error';
                }
                this.columns = undefined;
                this.data = undefined;
            } else if (data) {
                this.ldsMessage = undefined;
                this.rawData = data;
                logger(true, 'interviewList_lwc', 'this.rawData', this.rawData);

                this.columns = [
                    {label: 'Name', fieldName: 'Name', type: 'text'},
                    {label: 'Twitter', fieldName: 'Twitter_ID__c', type: 'text'},
                    {label: 'State', fieldName: 'State__c', type: 'text'},
                    {label: 'Position', fieldName: 'Position__r', type: 'text'},
               ];

                

                // extract the row data
                this.rawRecords = tableHelper(
                    this.columns.map(x => x.fieldName),
                    this.rawData,
                );

                this.data = this.rawRecords.data;
                logger(true, 'interviewList_lwc', 'this.data', this.data);
                
                
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