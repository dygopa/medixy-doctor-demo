"use client";

import Formulary from "./Formulary/Formulary";
import ServicesProvider from "../context/ServicesContext";
import { IUser } from "domain/core/entities/userEntity";

interface IServicesCreateIndexProps {
  user: IUser;
}

export default function ServicesCreateIndex({
  user,
}: IServicesCreateIndexProps) {
  return (
    <div className="py-5">
      <ServicesProvider>
        <Formulary userId={user.userId} accountId={user.accountId} />
      </ServicesProvider>
    </div>
  );
}
