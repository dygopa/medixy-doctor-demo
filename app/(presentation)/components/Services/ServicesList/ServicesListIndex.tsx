"use client";

import { IUser } from "domain/core/entities/userEntity";
import Filters from "./Filters/Filters";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";
import ServicesProvider from "../context/ServicesContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext, IAuthContext } from "(presentation)/(layouts)/AppLayout/context/AuthContext";

export default function ServicesListIndex() {

  const { state, actions, dispatch } = useContext<IAuthContext>(AuthContext);
  const { getUserAuthenticated } = actions;

  const { data, loading, error, successful } = state.getUserAuthenticated;

  const [user, setUser] = useState<IUser>({} as IUser);

  const [loadedUser, setLoadedUser] = useState(false)

  const loadUser = () => {
    getUserAuthenticated()(dispatch)
    setLoadedUser(true)
  }

  useEffect(()=>{
    loadUser()
  }, [loadedUser])  

  useMemo(()=>{
      if(successful) setUser(data)
  }, [successful])

  return (
    <div className="container py-5">
      <Navigator />

      <div className="mt-10">
        <ServicesProvider>
          <div className="mt-8">
            <Table user={user}/>
          </div>
        </ServicesProvider>
      </div>
    </div>
  );
}
