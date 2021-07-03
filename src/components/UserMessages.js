import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Message from './Message'
import { getMessagesByUser } from '../services/messageService'
import { useGlobalState } from '../utils/stateContext'

const DisplayMessages = ({messages, user}) => messages.length > 0 ?
    messages.map((message, index)=>
        <Message key={index} message={message}/>
    )
    : <p>{user} has no messages</p>

const MyMessages =()=>{
    const {store} = useGlobalState();
    const { loggedInUser } = store;
    const [userMessageList, setUserMessageList] = useState(null);
    const {user} = useParams();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        getMessagesByUser(user)
            .then( messages =>{
                setUserMessageList(messages)
                setIsLoading(false)
            });
    },[user]);

    return(
        <section>
            <h3>{user === loggedInUser ? "My" : `${user}'s`} Messages</h3>
            { isLoading ?
                <p>Loading messages...</p>
                : <DisplayMessages messages={userMessageList} user={user}/>}
        </section>
    )
}

export default MyMessages