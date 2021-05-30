import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from '../firebase';
import logo from '../logo.png'
import './Login.css'
const Login = () => {
    const signIn = () =>{
        auth.signInWithPopup(provider).catch((error)=>{
            alert(error.message);
        })
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src={logo} alt="Any Talk Logo" width="100%"/>
               
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    );
};

export default Login;