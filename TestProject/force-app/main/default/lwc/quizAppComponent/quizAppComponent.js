import FullPhotoUrl from '@salesforce/schema/User.FullPhotoUrl';
import { LightningElement } from 'lwc';

export default class QuizAppComponent extends LightningElement {
    selected = {}//to store answers
    correctAnswers = 0 //to show result
    quiz =[
        {
            id : "Question 1",
            ques : "What is the value of 2+2 ?",
            ans : {
                a : 4,
                b : "Four",
                c : "Chaar"
            },
            correct : "c"
        },
        {
            id : "Question 2",
            ques : "What is the value of 2+2 ?",
            ans : {
                a : 4,
                b : "Four",
                c : "Chaar"
            },
            correct : "c"
        },
        {
            id : "Question 3",
            ques : "What is the value of 2+2 ?",
            ans : {
                a : 4,
                b : "Four",
                c : "Chaar"
            },
            correct : "c"
        }
    ] 

    get allNotSelected(){
        return !(Object.keys(this.selected).length === this.quiz.length)
    }

    eventHandler(event){
        console.log("name : ", event.target.name)
        console.log("value : ", event.target.value)
        const {name,value} = event.target // destructoring
        // shorthand form for
        //const name = event.target.name

        this.selected = {...this.selected, [name]:value} //storing the option as selected & for which question
        //[Question 1]:a
    }

    submitHandler(event){
        //form always refershes the page so to prevent it
        event.preventDefault()
        this.quiz.filter()

    }

    resetHandler(){

    }

    
}