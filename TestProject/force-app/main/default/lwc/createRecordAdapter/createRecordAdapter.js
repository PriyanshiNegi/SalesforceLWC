import { LightningElement ,wire} from 'lwc';

// importing the modules
import {createRecord , deleteRecord} from 'lightning/uiRecordApi'

// importing object reference
import CONTACT_OBJECT from '@salesforce/schema/Contact'

//importing toast module to show the result status
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecordAdapter extends LightningElement {

    formFields={}
    changeHandler(event){
        const {name, value} = event.target
        // creating the formFields array with the data for fields
        this.formFields[name]=value
        // means like formFields = {
        //     "Name":value,
        //     "Name":value
        // }
    }

    // creating contact
    createContact(){
        //to store the Object and Field to pass to adapter
        const recordInput = {
            apiName :CONTACT_OBJECT.objectApiName,
            fields : this.formFields
        }
        createRecord(recordInput).then(result=>{
            this.showToast('Success Creating record', `Contact Record created successfully with Id ${result.id} `, 'Success')
            // reseting the form after creation
            this.template.querySelector('form.createForm').reset()
            this.formFields = {}
        }).catch(error=>{
            this.showToast('Error Creating record', error.body.message, 'error')
        })
    }

    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant:variant || 'success'
        }))
    }

//--------------------- DELETE RECORDS-------------------------
    recordIdToBeDeleted
    // capturing the value from input
    changeInputHandler(event){
        this.recordIdToBeDeleted = event.target.value
    }
    deleteContact(){
        // passing reference for the record to be deleted then returing Promise
        deleteRecord(this.recordIdToBeDeleted).then((result)=>{
            console.log("Deleted Successfully")
            this.showToast('Successfully Deleted Record', `Contact Record Deleted Successfully`, 'success')
        }).catch(error=>{
            console.log(error)
            this.showToast('Error Deleting Record', error.body.message, 'error')
        })
    }
}

    