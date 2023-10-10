"use client";

import { IUser } from "domain/core/entities/userEntity";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";
import LocalitiesProvider from "./context/LocalitiesContext";

interface ILocalitiesListIndexProps {
  user: IUser;
}

export default function LocalitiesListIndex({
  user,
}: ILocalitiesListIndexProps) {
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
