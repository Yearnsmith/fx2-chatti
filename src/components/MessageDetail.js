import React, { useEffect, useState } from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import { getMessageById, deleteMessage } from '../services/messageService'
import { useGlobalState } from '../utils/stateContext'

const MessageDetail =()=>{
    //console.log(match);
    //console.log(message);
    const {store, dispatch} = useGlobalState();
    const {loggedInUser} = store;
    const [message, setMessage] = useState(null);
    const {id} = useParams();
    const history = useHistory();

    useEffect(()=>{
        getMessageById(id)
            .then( message => setMessage(message) )
            .catch( error => console.log(error) );
    }, [id]);

    function removeMessage(e){
        e.preventDefault();
        deleteMessage(id)
            .then(message => {
                console.log("Message deleted");
                dispatch( { type:'deleteMessage', data: id } );
                return history.push("/messages");
            })
            .catch(error => console.log(error));
    };
    // if (!message) return null

    return(
        <div>
            {message? 
            <>
                {message.text}
                <p><Link to={`/messages/users/${message.username}`}>{message.username}</Link> {message.posted}</p>
                {
                    loggedInUser === message.username &&
                        <button onClick={removeMessage}>Delete message</button>
                }
            </>
            :
                <>
                    <p>Invalid id for a message</p>
                    <Link to="/messages">Go back to the home page</Link>
                </>
            }
        </div>
    )
}

export default MessageDetail