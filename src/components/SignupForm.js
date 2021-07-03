import React, { useState } from 'react'
import { useGlobalState } from '../utils/stateContext'
import { signUp } from '../services/authService'

function SignupForm({history}) {
    const {dispatch} = useGlobalState()
    const [error, setError] = useState("")

    const initialFormData = {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    function handleFormData(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        signUp(formData)
            .then((user)=>{
                if (user.error){

                }
            })
            .then(({username, jwt}) => {
                dispatch({
                    type: "setLoggedInUser",
                    data: username
                })
                dispatch({
                    type: "setToken",
                    data: jwt
                })
                return history.push("/messages")
            })
            .catch( err =>{
                setError(err.message)
            });
    }
    
    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" value={formData.username} onChange={handleFormData} />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleFormData}/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"value={formData.password} onChange={handleFormData} />
                <label htmlFor="password_confirmation">Password Confirmation</label>
                <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData} />
                <input type="submit" value="Sign up" />
            </form>
        </div>
    )
}

export default SignupForm
