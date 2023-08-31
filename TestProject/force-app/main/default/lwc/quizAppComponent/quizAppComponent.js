import FullPhotoUrl from '@salesforce/schema/User.FullPhotoUrl';
import { LightningElement } from 'lwc';

export default class QuizAppComponent extends LightningElement {
    selected = {}//to store answers
    correctAnswers = 0 //to show result
    isSubmitted = false //to show results
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

    //if all are not selected to disable button
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

    //getting correct answer count
    submitHandler(event){
        this.isSubmitted =true
        //form always refershes the page so to prevent it
        event.preventDefault()
        //filtering all questions, picking question as item
        //this.selected[item.id] = this.selected[Question 1] = a
        //means value stored in Question 1
        let correct = this.quiz.filter(item=>this.selected[item.id] === item.correct)
        //as filter will return length
        this.correctAnswers = correct.length
        console.log ("The Correct Answers are :",this.correctAnswers )

    }

    //for resetting options
    resetHandler(){
        this.selected = {}//reset back to empty
        this.correctAnswers = 0;
        //to remove prompt once reset
        this.isSubmitted = false
    }

    //adding padding for prompt and colors according to answer  
    get ifAllCorrect(){
        return `slds-p-around_small slds-text-heading_large ${this.quiz.length == this.correctAnswers ? 'slds-text-color_success' : 'slds-text-color_error'}`
    }

    
}