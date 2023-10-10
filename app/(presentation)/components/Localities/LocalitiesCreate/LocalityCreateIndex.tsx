"use client";

import { IUser } from "domain/core/entities/userEntity";
import Formulary from "./Formulary/Formulary";
import {
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import LocalitiesProvider from "../context/LocalitiesContext";
import { ILocality } from "domain/core/entities/localityEntity";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import WithoutSteps from "./WithoutSteps/WithoutSteps";

interface ILocalityCreateIndexProps {
  user: IUser;
}

export default function LocalityCreateIndex({
  user,
}: ILocalityCreateIndexProps) {
  return (
    <div className="py-5">
      <LocalitiesProvider>
        <WithoutSteps userId={user.userId} accountId={user.accountId} />
      </LocalitiesProvider>
    </div>
  );
}
