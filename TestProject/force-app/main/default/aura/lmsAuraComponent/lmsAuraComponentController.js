({
    // handling the message being received
    // component = instance of this particular component
    // message = the message being received
    handleMessage : function(component, message){
        // if the sent message is not null && the parameter being sent is not null
        if(message!=null && message.getParam("lmsData")!=null){
            component.set("v.messageReceived",message.getParam("lmsData").value)
        }

    },
    inputHandler :function(component,event){
        //printing value to console
        console.log(event.target.value)
        // setting messageValue = event.target.value
        component.set("v.messageValue",event.target.value)
    },
    publishMessage : function(component){
        // message to be passed
        let msg = component.get("v.messageValue")
        let message={
            lmsData:{
                value:msg
            }
        }
    // publish method can only be called from lightning message channel so use id (aura id) provided there
    // component.find("SampleMessageChannel") = instance of the messageChannel
    component.find("SampleMessageChannel").publish(message)
    }
})
