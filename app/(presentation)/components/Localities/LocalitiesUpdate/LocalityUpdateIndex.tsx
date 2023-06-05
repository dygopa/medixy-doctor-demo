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

export default function LocalityUpdateIndex({localityId}:{localityId:number}) {
  const { state } = useContext<IAuthContext>(AuthContext);
  const { data, loading } = state.getUserAuthenticated;
  if (!data?.userId) return <div />;
  return (
    <div className="py-5">
      <LocalitiesProvider>
        <Formulary userId={loading ? "" : data.userId} localityId={localityId} />
      </LocalitiesProvider>
    </div>
  );
}
