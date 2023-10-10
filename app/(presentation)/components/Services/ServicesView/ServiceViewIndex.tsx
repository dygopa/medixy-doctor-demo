"use client";

import ServicesProvider from "../context/ServicesContext";
import Formulary from "./Formulary/Formulary";
import { IUser } from "domain/core/entities/userEntity";

interface IServiceViewIndexProps {
  user: IUser;
}

export default function ServiceViewIndex({ user }: IServiceViewIndexProps) {
  return (
    <div className="py-5">
      <ServicesProvider>
        <Formulary accountId={user.accountId} userId={user.userId} />
      </ServicesProvider>
    </div>
  );
}
