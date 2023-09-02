import { LightningElement , wire } from 'lwc';

// Prerequistes for communication between components (here subscribing message):

//1- referencing a message channel in LWC
import SampleChannel from "@salesforce/messageChannel/SampleMessageChannel__c"
//2- importing LMS API according to use case , so here we want compB to receive something from compA
import { MessageContext, subscribe, unsubscribe} from 'lightning/messageService'

export default class LmsComponentB extends LightningElement {

    subscription
    receivedMessage

    //context to know which all components are listening to LMS and then use the component we want
    @wire(MessageContext)
    context

    //Life Cycle Hook gets called when the page loads
    connectedCallBack(){
        this.subscribeMessage()
    }

    subscribeMessage(){
        //to subscribe a message : subscribe(messageContext, messageChannel, listener, subscriberOptions)
        this.subscription = subscribe(this.context,SampleChannel,(message)=>{this.handleMessage(message)},{scope : APPLICATION_SCOPE})
        //SampleChannel = name of imported channel
        //this.context = denotes the current message context (object of MessageContext , check the property above)
        //listener = fuction to receive messages on message channel from anywhere in the application
        //subscriberOptions = scope of the message
    }
   
    //message listener
    handleMessage(message){
        //if data is found or not
        this.receivedMessage = message.lmsData.value ? message.lmsData.value : "No, Message was published"
    }

    unsubscribeMessage(event){
        unsubscribe(this.subscription)
        // empty this subscribtion once done unsubscribing
        this.subscription = null
    }
}