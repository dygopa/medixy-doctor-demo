"use client";

import { IUser } from "domain/core/entities/userEntity";
import React, { useState, useEffect, useContext, useMemo } from "react";
import DoctorsCase from "./DoctorsCase/DoctorsCase";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import DashboardProvider from "./DoctorsCase/context/DashboardContext";

export default function DashboardIndex() {
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
    <div className="py-8">
      <DashboardProvider>
        <DoctorsCase account={account} />
      </DashboardProvider>
    </div>
  );
}
