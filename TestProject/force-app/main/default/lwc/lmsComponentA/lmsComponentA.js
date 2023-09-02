
//importing wire service
import { LightningElement, wire } from 'lwc';

// Prerequistes for communication between components (here publishing message):

//1- referencing a message channel in LWC
import SampleChannel from "@salesforce/messageChannel/SampleMessageChannel__c"

//2- importing LMS API according to use case , so here we want compA to publish something to compB
import { MessageContext, publish} from 'lightning/messageService'

export default class LmsComponentA extends LightningElement {

    //property to take input from input tag
    inputValue

    //context to know which all components are listening to LMS and then use the component we want
    @wire(MessageContext)
    context //stored in property called context

    //store the input
    changeHandler(event){
        this.inputValue = event.target.value
    }

    publishMessage(){

        //message to publish
        const message ={
            //field in messageChannel check meta file
            lmsData : {
                value : this.inputValue
            }
        }

        //to publish a message : publish(messageContext,messageChannel,message)
        publish(this.context,SampleChannel,message)
        //message = data to publish
        //SampleChannel = name of imported channel
        //this.context = denotes the current message context (object of MessageContext , check the property above)
    }
}