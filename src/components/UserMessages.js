import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Message from './Message'
import { useGlobalState } from '../utils/stateContext'
import { getMessagesByUser } from '../services/messageService'

const MyMessages =({history})=>{
    const {store} = useGlobalState()
    const {loggedInUser} = store
    const [myMessageList, setMyMessageList] = useState([])
    const {user} = useParams();
    console.log("user:", user)

    if (!loggedInUser) history.pushState("/login")
    useEffect(()=>{
        // const current_user = sessionStorage.getItem("username")
        getMessagesByUser(user)
            .then((messages) =>{
                setMyMessageList(messages)
            });
    },[]);

    return(
        <div>
            {loggedInUser ? 
            <>
                <h3>My Messages</h3>
                {myMessageList.map((message, index)=>
                    <Message key={index} message={message}/>
                )}
            </>
            : <>
            <p>You need to <Link to="login">log in</Link> to see your messages</p>
            </>
            
        }
        </div>
    )
}

export default MyMessages