"use client";

import { IUser } from "domain/core/entities/userEntity";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";
import LocalitiesProvider from "./context/LocalitiesContext";
import { useContext, useMemo, useState } from "react";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";

export default function LocalitiesListIndex() {
  const { state } = useContext<IAuthContext>(AuthContext);
  const { data, successful } = state.getUserAuthenticated;

  const [user, setUser] = useState<IUser>({} as IUser);

  useMemo(() => {
    if (successful) setUser(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  return (
    <div className="py-5">
      <Navigator />
      <LocalitiesProvider>
        <div className="mt-8">
          <Table user={user} />
        </div>
      </LocalitiesProvider>
    </div>
  );
}
