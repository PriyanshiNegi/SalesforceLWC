import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {
    // inform Parent to close modal on button click
    //but how would Parent know that button was clicked , answer : through custom Event
    closeHandler(){
        // to pass data with event use standard property "detail"
        const myEvent = new CustomEvent('close',{
            detail : "Modal Closed Successfully"
        })
        this.dispatchEvent(myEvent)
    }
}