import { LightningElement, wire } from 'lwc';
import {getListUi} from 'lightning/uiListApi'
import {updateRecord} from 'lightning/uiRecordApi'

// importing object reference
import CONTACT_OBJECT from '@salesforce/schema/Contact'
// columns are always hardcoded
const COLS =[
    {label:'Id', fieldName:'Id'},
    {label:'Name', fieldName :'Name'},
    {label:'Id', fieldName:'Id'},
    {label:'Title', fieldName:'Title'},
    {label:'Phone', fieldName:'Phone', editable: true},
    {label:'Email', fieldName:'Email', type:'email',editable: true}
    // by default if type is not declared then it is text
]
export default class UpdateRecordAdapter extends LightningElement {

    // getting the contact records displayed on screen
    contacts =[]
    columns = COLS
    draftValues = []
    @wire(getListUi, {
        objectApiName:CONTACT_OBJECT,
        listViewApiName:'AllContacts'
    })
    listViewHandler({data, error}){
        if(data){
            console.log(data)
            // this returns data in the form record>record > all the values that can be looped through
            // each item is the contact record 
            this.contacts = data.records.records.map(item=>{
                return{
                    // without the getValue method we would have to declare like 
                    // "Name": item.fields.name.value and so on for every field value
                    "Id": this.getValue(item, 'Id'),
                    "Name": this.getValue(item, 'Name'),
                    "Title": this.getValue(item, 'Title'),
                    "Phone": this.getValue(item, 'Phone'),
                    "Email": this.getValue(item, 'Email')
                }
            })
        }
        if(error){
            console.error(error)
        }
    }

    getValue(data,field){
        // record>fields>name
        // translates to => item.fields[Name].value
        return data.fields[field].value
    }

    handleSave(event){
            // printing draft values
            console.log(JSON.stringify(event.detail.draftValues))//this draft has the updated value and the id for the record (according to the key-field defined)

            // creating map of draft values
            const recordInputs=event.detail.draftValues.map(draft=>{
                // updating the value of the field with draft
                const fields = {...draft};
                return { fields:fields };
            })
            // since we have multiple records and updateRecord will only update 1 at a time so we run a loop through it
            const promises = recordInputs.map(recordInput=>updateRecord(recordInput))
            // due to multiple Promises "const promised" here is an array of promises
            Promise.all(promises).then(()=>{
                console.log('COntact updated Successfully')
                this.draftValues=[]
            }).catch(error=>{
                console.error("Error updating the record", error)
            })
            
    }
}