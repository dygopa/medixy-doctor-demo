"use client";

import { IUser } from "domain/core/entities/userEntity";
import Filters from "./Filters/Filters";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";
import ServicesProvider from "../context/ServicesContext";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import ManageServicesPopup from "./ManageServicesPopup/ManageServicesPopup";

export default function ServicesListIndex() {
  const { state } = useContext<IAuthContext>(AuthContext);
  const { data, successful } = state.getUserAuthenticated;

  const [user, setUser] = useState<IUser>({} as IUser);

  useMemo(() => {
    if (successful) setUser(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  if (!user?.userId) return <div />;

  return (
    <>
      <div className="py-5">
        <Navigator />

        <div className="mt-10">
          <ServicesProvider>
            <div className="mt-8">
              <Table user={user} />
            </div>
          </ServicesProvider>
        </div>
      </div>

      <ManageServicesPopup />
    </>
  );
}
