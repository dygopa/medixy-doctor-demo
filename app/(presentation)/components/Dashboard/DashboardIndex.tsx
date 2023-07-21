"use client";

import { IUser } from "domain/core/entities/userEntity";
import React, { useState, useEffect, useContext, useMemo } from "react";
import DoctorsCase from "./DoctorsCase/DoctorsCase";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import DashboardProvider from "./DoctorsCase/context/DashboardContext";
import ScheduleProvider from "../Schedule/context/ScheduleContext";
import Popup from "../core/Popup/Popup";

export default function DashboardIndex() {
  const { state } = useContext<IAuthContext>(AuthContext);

  const { data, successful } = state.getUserAuthenticated;

  const [account, setAccount] = useState<IUser>({} as IUser);

  useMemo(() => {
    if (successful) setAccount(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  if (!account.userId) return <div />;

  return (
    <div className="py-8">
      <DashboardProvider>
        <ScheduleProvider>
          <Popup/>
          <DoctorsCase account={account} />
        </ScheduleProvider>
      </DashboardProvider>
    </div>
  );
}
