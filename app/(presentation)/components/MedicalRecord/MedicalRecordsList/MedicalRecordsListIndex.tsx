"use client";

import Filters from "./Filters/Filters";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";
import TableResponsive from "./Table/TableResponsive";
import MedicalRecordsListProvider from "./context/MedicalRecordsListContext";
import { useContext, useMemo, useState } from "react";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import { IUser } from "domain/core/entities/userEntity";

export default function MedicalRecordsListIndex() {
  const { state } = useContext<IAuthContext>(AuthContext);
  const { data, successful } = state.getUserAuthenticated;

  const [user, setUser] = useState<IUser>({} as IUser);

  useMemo(() => {
    if (successful) setUser(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  if (!user?.userId) return <div />;

  return (
    <MedicalRecordsListProvider>
      <div className="py-5">
        <Navigator />

        <div className="mt-5 md:mt-7">
          <div className="">
            <Filters />
          </div>

          <div className="">
            <div className="md:block hidden">
              <Table />
            </div>

            <div className="lg:hidden md:hidden block">
              <TableResponsive />
            </div>
          </div>
        </div>
      </div>
    </MedicalRecordsListProvider>
  );
}
