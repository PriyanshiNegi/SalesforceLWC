import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
// for toast notifications
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordEditCustom extends LightningElement {

    objectName = ACCOUNT_OBJECT

    inputValue=''

    // storing the input value
    handleChange(event){ 
        this.inputValue = event.target.value
    }

    // adding validation
    handleSubmit(event){ 
        // to prevent the reload on submit
        event.preventDefault()
        // selecting the input tag
        const inputCmp = this.template.querySelector('lightning-input')
        // storing the value in the tag
        const value= inputCmp.value

        // checking if it contains that String
        if(!value.includes('Australia')){ 
            // setting the error message
            inputCmp.setCustomValidity("The account name must include 'Australia'")
        } 
        // else setting the validation to empty
        else { 
            inputCmp.setCustomValidity("")
            // getting the value of the field and mapping to API Name
            const fields = event.detail.fields
            fields.Name = value
            // submitting the value programatically
            this.template.querySelector('lightning-record-edit-form').submit(fields)
        }

        // used to throw the error message earlier it was just setting the message basically anyting that was in the message
        inputCmp.reportValidity()

    }

    // for toast notification
    successHandler(event){ 
        const toastEvent = new ShowToastEvent({ 
            title:"Account created",
            message: "Record ID: "+ event.detail.id,
            variant:"success"
        })
        this.dispatchEvent(toastEvent)

    }

    // other errors like server error
    handleError(event){ 
        const toastEvent = new ShowToastEvent({ 
            title:"Error creating Account",
            message: event.detail.message,
            variant:"error"
        })
        this.dispatchEvent(toastEvent)
    }
}