"use client";

import React, { useState, useEffect, useContext, useMemo} from 'react'
import { AuthContext, IAuthContext } from '(presentation)/(layouts)/AppLayout/context/AuthContext';

export default function Index() {
    
    const { state, actions, dispatch } = useContext<IAuthContext>(AuthContext);
    const { getUserAuthenticated } = actions;

    const { data, loading, error, successful } = state.getUserAuthenticated;

    const [loadedUser, setLoadedUser] = useState(false)
  
    const loadUser = () => {
      getUserAuthenticated()(dispatch)
      setLoadedUser(true)
    }
  
    useEffect(()=>{
      loadUser()
    }, [loadedUser])  

    useMemo(()=>{
        if (successful) window.location.href = "/dashboard";
    }, [successful])

    return (
        <div className="container py-5"></div>
    );
}