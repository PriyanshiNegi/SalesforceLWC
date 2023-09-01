import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {
    // inform Parent to close modal on button click
    closeHandler(){//but how would Parent know that button was clicked , answer : through custom Event
        const myEvent = new CustomEvent('close')
        this.dispatchEvent(myEvent)
    }
}