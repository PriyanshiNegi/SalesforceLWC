import { LightningElement, wire } from 'lwc';

// importing Id from user , this way can only be used for Id and not email or Name
import Id from '@salesforce/user/Id'

// importing adapter
import {getRecord} from 'lightning/uiRecordApi'

export default class WireUserDetails extends LightningElement {
    userId = Id
    userDetails
    // fetching other details for the user through wire
    // using wire service

    // @wire(adapter, {adapterConfig})
    // propertyorFunction

    // propertyorFunction = to catch the data

    // {adapterConfig} = important parameters/configurations that the adapter is expecting

    @wire(getRecord,{recordId : "0051m000005sYcGAAU",fields :['User.Name','User.Email']})
    // this function will give the response from adapter
    userDetailHandler(response){

        // {DataTransfer,error} these are the values hard-coded into wire by SF can directly use as userDetailHandler({data,error})>>object destructoring or as below
        console.log (response)

        let data = response.data
        let error = response.error

        // If we get data or if we get error
        if(data){
            this.userDetails = data.fields
        }
        if(error){
           console.log(error) 
        }
    }

    // wire property approach
    @wire(getRecord,{recordId : "0051m000005sYcGAAU",fields :['User.Name','User.Email']})
    userDetailProperty
    
}