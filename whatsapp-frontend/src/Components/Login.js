import React from 'react'
import './Login.css';
import logo from './logo.png';
import { Button } from '@material-ui/core';


function Login({signIn}) {
   

    return (
        <div className="login">
            <div className="login__container">
                <img src={logo} alt="" />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button  onClick={signIn}>Sign In With Google</Button>
                
            </div>
        </div>
    )
}

export default Login
