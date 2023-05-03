"use client";

import { IUser } from "domain/core/entities/userEntity";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";
import LocalitiesProvider from "./context/LocalitiesContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext, IAuthContext } from "(presentation)/(layouts)/AppLayout/context/AuthContext";

export default function LocalitiesListIndex() {

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
      <LocalitiesProvider>
        <div className="mt-8">
          <Table user={user}/>
        </div>
      </LocalitiesProvider>
    </div>
  );
}
