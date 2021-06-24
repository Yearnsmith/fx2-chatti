import React, { useState } from 'react'
import { useGlobalState } from '../utils/stateContext'

const MessageForm =({history})=>{

    const {store, dispatch} = useGlobalState()
    const {loggedInUser, messageList} = store

    const initialFormData = {
        text: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    function handleFormData(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(formData)
        addMessage(formData.text)
        //clean the form after submitting
        setFormData({
            ...formData,
            text: ""
        })
        return history.push("/messages")
    }

    function getNextId(){
        const ids = messageList.map(m => m.id) //[3, 2, 1]
        return ids.sort()[ids.length - 1] + 1 // -> [1, 2, 3] -> 3 -> 4
      }

    function addMessage(text){
        const message = {
          id: getNextId(),
          text: text, 
          user: loggedInUser
        }
        // setMessageList(
        //   (messageList) => [message, ...messageList]
        // )
        //will run the reducer, and will send an object that is the action
        dispatch({
          type: "addMessage",
          data: message 
        })
      }
    

    return(
        <div>
            {loggedInUser?
                <form onSubmit={handleSubmit}>
                    <label htmlFor="text">What's on your mind {loggedInUser}?</label>
                    <input type="text" name="text" id="text" value={formData.text} onChange={handleFormData}/>
                    <input type="submit" value="Send" />
                </form>
            : 
                <p>you're not logged in</p>
            }
            
        </div>
    )
}

export default MessageForm