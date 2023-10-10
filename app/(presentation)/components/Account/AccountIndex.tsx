"use client";

import { IUser } from "domain/core/entities/userEntity";
import React, { useState, useEffect, useContext, useMemo } from "react";
import Navigator from "./Navigator/Navigator";
import Formulary from "./Formulary/Formulary";
import UserProvider from "./context/UserContext";

interface IAccountIndexProps {
  user: IUser;
}

export default function AccountIndex({ user }: IAccountIndexProps) {
  const [account, setAccount] = useState<IUser>({} as IUser);

  useMemo(() => {
    if (user) setAccount(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <UserProvider>
      <div className="py-5 relative">
        <Formulary user={user} account={account} setAccount={setAccount} />
      </div>
    </UserProvider>
  );
}
