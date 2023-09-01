import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {
    showModal=false
    msg
    
    clickHandler(event){
        this.showModal = true 
    }

    closeTheHandler(event){
        // extracting the data
        this.msg = event.detail
        this.showModal = false 
    }
}