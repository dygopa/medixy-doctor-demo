"use client";

import { IUser } from "domain/core/entities/userEntity";
import React, { useState, useEffect, useContext, useMemo } from "react";
import Navigator from "./Navigator/Navigator";
import Formulary from "./Formulary/Formulary";
import UserProvider from "./context/UserContext";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";

export default function AccountIndex() {
  const { state, actions, dispatch } = useContext<IAuthContext>(AuthContext);
  const { getUserAuthenticated } = actions;

  const { data, loading, error, successful } = state.getUserAuthenticated;

  const [account, setAccount] = useState<IUser>({} as IUser);

  const [loadedUser, setLoadedUser] = useState(false);

  const loadUser = () => {
    getUserAuthenticated()(dispatch);
    setLoadedUser(true);
  };

  useEffect(() => {
    loadUser();
  }, [loadedUser]);

  useMemo(() => {
    if (successful) setAccount(data);
  }, [successful]);

  return (
    <UserProvider>
      <div className="py-5 relative">
        <Formulary account={account} setAccount={setAccount} />
      </div>
    </UserProvider>
  );
}
