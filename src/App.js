import { AppBar } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Anytalk from './Anytalk/Anytalk';

import './App.css';
import AppNavbar from './AppNavbar';
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login/Login';
import {auth } from './firebase'
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,

          })
        );
      }
      else{
        dispatch(logout());
      }
    })
  },[]
  )

  return (
    <div className='app'>
      {user ? <Anytalk></Anytalk> : <Login></Login>}



    </div>
  );
}

export default App;
