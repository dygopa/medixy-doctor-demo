"use client";

import { IUser } from "domain/core/entities/userEntity";
import Formulary from "./Formulary/Formulary";
import LocalitiesProvider from "../context/LocalitiesContext";

export default function LocalityUpdateIndex({
  localityId,
  user,
}: {
  localityId: number;
  user: IUser;
}) {
  return (
    <div className="py-5">
      <LocalitiesProvider>
        <Formulary userId={user.userId} localityId={localityId} />
      </LocalitiesProvider>
    </div>
  );
}
