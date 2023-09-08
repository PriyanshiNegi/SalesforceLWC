import { LightningElement,wire} from 'lwc';

// importing the wire adapter
import { getObjectInfo, getObjectInfos , getPicklistValues} from 'lightning/uiObjectInfoApi';

// importing object refrence
import ACCOUNT from '@salesforce/schema/Account'
import OPPORTUNITY from '@salesforce/schema/Opportunity'
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
import TYPE_FIELD from '@salesforce/schema/Account.Type'

export default class GetObjectInfoWire extends LightningElement {
    //-------------- wire function---------------
    // defaultRecordTypeId
    // @wire(getObjectInfo,{objectApiName : ACCOUNT})
    // objectInfo({data,error}){
    //     if(data){
    //         console.log(data)
    //         this.defaultRecordTypeId = data.defaultRecordTypeId
    //     }
    //     if(error){
    //         console.error(error)
    //     }
    // }

    //-----------wire property----------------ADAPTER 1
    @wire(getObjectInfo,{objectApiName : ACCOUNT})
    objectInfo

    objectNames = [ACCOUNT,OPPORTUNITY]
    objectInformation
  
    // ADAPTER 2
    //try to use reactive in places where dynamic data is being used to prevent undefined error
    @wire(getObjectInfos,{objectApiName : '$objectNames'})
    objectInfosHandler({data}){
        if(data){
            console.log("THIS IS IT")
            console.log(data)
            this.objectInformation = data
        }
    }

    // ADAPTER 3
    // getting the recordTypeId from the getObjectInfo wire and referencing it here
    @wire(getPicklistValues,{recordTypeId : '$objectInfo.data.defaultRecordTypeId', fieldApiName : INDUSTRY_FIELD})
    getpicklistHandler({data,error}){
        if(data){
            console.log(data)
            this.industryOptions = [...this.generatePicklist(data)]
        }
        if(error){
            console.error(error)
        }
    }

    selectedIndustry = ''
    industryOptions = []
    // get options(){
    //     return [
    //         {label: '', value: ''},
    //         {label: '', value: ''},
    //         {label: '', value: ''}
    //     ];
    // }

    // PICKLIST NUMBER 1

    // passing options data >> picklist label and values
    generatePicklist(data){
        // since we need to transform the data we will use map (transform in the above form  of label and values) this is the js format for combobox
        return data.values.map(item =>({label: item.label, value: item.value}))
    }

    handleChange(event){
        this.selectedIndustry = event.detail.value;
    }

    // PICKLIST NUMBER 2
    selectedType=''
    typeOptions=[]
    @wire(getPicklistValues, { recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:TYPE_FIELD})
    typePicklist({data, error}){
        if(data){
            console.log(data)
            // for transforming the type picklist values into label and value format
            this.typeOptions = [...this.generatePicklist(data)]
        }
        if(error){
            console.error(error)
        }
    }
    handleTypeChange(event) {
        this.selectedType = event.detail.value;
    }
}