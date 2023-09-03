import { LightningElement } from 'lwc';

// importing toast event
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class ToastNotifications extends LightningElement {
    // onclick for success
    showSuccess(){
        // {0} referencing the 0th index of array messageData
        // {1} 1st index of array messageData
        this.creatingEvent("Success !", "{0} Account Record Successfully Created {1}", "success")
    }

    // onclick for error
    showError(){
        this.creatingEvent("Error !", "Account Record Creation Failed", "error")
    }

    // onclick for warning
    showWarning(){
        this.creatingEvent("Warning !", "Account Record Received Warning", "warning")
    }

    // onclick for information
    showInformation(){
        this.creatingEvent("Information !", "Account Record Information", "information")
    }

    //creating a common function and passing parameters according to variant
    creatingEvent(title,message,variant){
        // creating the custom event
       const evtInfor = new ShowToastEvent({
        title,
        message,
        variant,
        // passing a string and object in messageData for Prompt
        messageData:[
            'Salesforce',{
                url: 'https://www.google.com/', 
                label: 'Click Me'
            }
        ]
       })
       this.dispatchEvent(evtInfor)
    }
}