import { LightningElement } from 'lwc';

// using toast notification for the success handler
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import NAME_FIELD from '@salesforce/schema/Account.Name'
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue'
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
import TYPE_FIELD from '@salesforce/schema/Account.Type'
export default class LightningRecordForm extends LightningElement {

    // we can alos call the recordID and objectApiName here and then use this component in the recordPage
    // @api recordId
    // @api objectApiName these two will fetch the details dynamically and then we can use these in HTML for the RecordApp Page too

    objectName = NAME_FIELD
    fieldList = [NAME_FIELD,ANNUAL_REVENUE_FIELD,INDUSTRY_FIELD,TYPE_FIELD]

    // when child passes something onto the parent it will come as detail
    successHandler(event){
        console.log(event.detail.id)

        // creating toast event
        const toastEvent = new ShowToastEvent({
            title :"Account Created",
            message : "Congratualtions! the account record was successfully created with Record ID :"+ event.detail.id,
            variant : "success"
        })
        // dispatching event
        this.dispatchEvent(toastEvent)
    }
}