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
  const { state } = useContext<IAuthContext>(AuthContext);
  const { data, successful } = state.getUserAuthenticated;

  const [account, setAccount] = useState<IUser>({} as IUser);

  useMemo(() => {
    if (successful) setAccount(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  return (
    <UserProvider>
      <div className="py-5 relative">
        <Formulary account={account} setAccount={setAccount} />
      </div>
    </UserProvider>
  );
}
