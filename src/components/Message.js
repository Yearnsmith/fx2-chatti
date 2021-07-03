import React from 'react'
import {Link} from 'react-router-dom'

const Message =({message})=>{
    //console.log(match)
    //console.log(message)
    return(
        <article>
            {message? 
            <>
                <p><Link to={`/messages/${message.id}`} >{message.text}</Link></p>
                <p><Link to={`/messages/users/${message.username}`}>{message.username}</Link> {message.posted}</p>
            </>
            :
                <>
                    <p>Invalid id for a message</p>
                    <Link to="/messages">Go back to the home page</Link>
                </>
            }
        </article>
        
    )
}

export default Message