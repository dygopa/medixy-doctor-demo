"use client";

import Navigator from "./Navigator/Navigator";
import Formulary from "./Formulary/Formulary";
import { SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import ServicesProvider from "../context/ServicesContext";
import { AuthContext, IAuthContext } from "(presentation)/(layouts)/AppLayout/context/AuthContext";

export default function ServicesCreateIndex() {

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

  return (
    <div className="container py-5">
      <ServicesProvider>
        <Formulary userId={loading ? "" : data.userId}/>
      </ServicesProvider>
    </div>
  );
}
