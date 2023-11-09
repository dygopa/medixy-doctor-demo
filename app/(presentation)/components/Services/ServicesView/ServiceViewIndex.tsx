"use client";

import ServicesProvider from "../context/ServicesContext";
import FormularyIndex from "./Formulary/IndexFormulary";
import { IUser } from "domain/core/entities/userEntity";

interface IServiceViewIndexProps {
  user: IUser;
}

export default function ServiceViewIndex({ user }: IServiceViewIndexProps) {
  return (
    <div className="py-5">
      <ServicesProvider>
        <FormularyIndex accountId={user.accountId} userId={user.userId} />
      </ServicesProvider>
    </div>
  );
}
