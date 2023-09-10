import { LightningElement ,wire} from 'lwc';

// importing from ApexClass
import gettingAccounts from '@salesforce/apex/AcountController.gettingAccounts'
import gettingFilteredAccounts from '@salesforce/apex/AcountController.gettingFilteredAccounts'
import gettingSearchedAccounts from '@salesforce/apex/AcountController.gettingSearchedAccounts'

export default class AccessingApexFunction extends LightningElement {

    selectedType

    // without parameters
    @wire(gettingAccounts)
    accountList

    // with paramteres
    @wire(gettingFilteredAccounts, {type:'$selectedType'})
    filteredAccounts
    
    get typeOptions(){
        return [
            {label:"Customer - Channel", value:"Customer - Channel"},
            {label:"Customer - Direct", value:"Customer - Direct"}
        ]
    }
    typeHandler(event){
        this.selectedType = event.target.value
    }

    // Imperative Call
    //without parameters
    accounts
    clickHandler(){
        gettingAccounts().then((result)=>{
            console.log(result)
            this.accounts = result
        }).catch((error)=>{
            console.log(error)
        })
    }

    inputValue=''
    searched
    delay
    // with parameters
    searchHandler(event){
        // clearing any delay when the user starts typing
        window.clearTimeout(this.delay)
        this.inputValue = event.target.value
        // calling function after delay
        this.delay = setTimeout(()=>{
            this.callApex()
        },1000)
    }

    callApex(){
        gettingSearchedAccounts({searchKey : this.inputValue}).then((result)=>{
            console.log(result)
            this.searched = result
        }).catch((error)=>{
            console.log(error)
        })
    }
    // there's an issue with the searchHandler that it keeps calling the method again and again as we keep typing the
    //  characters to prevent this we are going to use debouncing
}