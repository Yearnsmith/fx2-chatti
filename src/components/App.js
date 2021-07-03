import React, { useEffect, useReducer } from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { getMessages } from '../services/messageService'
import About from './About'
import NotFound from './NotFound'
import Navigation from './Navigation'
import LoginForm from './LoginForm'
import SignUpForm from './SignupForm'
import MessageForm from './MessageForm'
import Messages from './Messages'
import UserMessages from './UserMessages'
import MessageDetail from './MessageDetail'
import reducer from '../utils/reducer'
import { StateContext } from '../utils/stateContext'
const App = () => {
  //define the initialstate
  const initialstate ={
    messageList: [],
    loggedInUser: sessionStorage.getItem("username") || null,
    auth: { token: sessionStorage.getItem("token") } || null
  }
  //useReducer has two arguments
  // reducer function
  // initial state (same as useState)
  //store is where the state is stored
  //dispatch invoked the reducer function
  const [store, dispatch] = useReducer(reducer, initialstate )

  //const [loggedInUser, setLoggedInUser] = useState("")
  //const [messageList, setMessageList] = useState([])

  useEffect(()=>{
    //setMessageList(initialMessageList)
    //will run the reducer, and will send an object that is the action
    console.log("effect")
    getMessages()
      .then((messages) => {
        dispatch({
            type: "setMessageList",
            data: messages
        })
      })
      .catch(error => console.log(error))

  },[])

  return (
    <div >
      <h1>Chatti</h1>
      
      <StateContext.Provider value={{store, dispatch}}>
        <BrowserRouter>
          <Navigation/>
          <Switch>
            <Route exact path="/">
              <Redirect to="messages" />
            </Route>
            <Route exact path="/messages" component={Messages}/>
            {/* <Route exact path="/messages/mymessages" component={UserMessages} /> */}
            <Route exact path="/messages/users/:user" component={UserMessages} />
            <Route exact path="/messages/:id" component={MessageDetail} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/newmessage" component={MessageForm} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </StateContext.Provider>
          
    </div>
  )
}

export default App
