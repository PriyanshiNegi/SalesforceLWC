import { LightningElement } from 'lwc';

// importing contact object
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import NAME_FIELD from '@salesforce/schema/Contact.Name'
import TITLE_FIELD from '@salesforce/schema/Contact.Title'
import PHONE_FIELD from '@salesforce/schema/Contact.Phone'
import EMAIL_FIELD from '@salesforce/schema/Contact.Email'
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId'
export default class LightningRecordEditForm extends LightningElement {

    objectName = CONTACT_OBJECT
    fields= {
        accountField : ACCOUNT_FIELD,
        nameField : NAME_FIELD,
        titleField : TITLE_FIELD,
        phoneField : PHONE_FIELD,
        emailField : EMAIL_FIELD
    }

    // resetting the fields
    handleReset(){
        // getting all the input tags
        const inputFields = this.template.querySelectorAll('lightning-input-field')

        //checking if NodeList found
        if(inputFields){
            // changing the NodeList to Array
            Array.from(inputFields).forEach(field => {
                // restting the field values
                field.reset()
            });
        }
    }
}