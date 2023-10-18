"use client";

import { IUser } from "domain/core/entities/userEntity";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";
import ServicesProvider from "../context/ServicesContext";
import ManageServicesPopup from "./ManageServicesPopup/ManageServicesPopup";

interface IServicesListIndexProps {
  user: IUser;
}

export default function ServicesListIndex({ user }: IServicesListIndexProps) {
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
    </>
  );
}
