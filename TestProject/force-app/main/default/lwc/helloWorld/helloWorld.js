import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {

    moto = "Keep Going"
    motoOne = "Keep Going"
    changeHandler(event){
        this.moto = event.target.value //target the events current value
    }

    isVisible = false
    buttonClicked(event){
        this.isVisible = true
    }

    changeHandlerTwo(event){
        this.motoOne = event.target.value //target the events current value
    }
    get data(){
        return this.motoOne === "hello"
    }

}