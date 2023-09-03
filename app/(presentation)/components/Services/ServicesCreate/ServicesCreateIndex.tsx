"use client";

import Navigator from "./Navigator/Navigator";
import Formulary from "./Formulary/Formulary";
import {
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ServicesProvider from "../context/ServicesContext";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";

export default function ServicesCreateIndex() {
  const { state } = useContext<IAuthContext>(AuthContext);
  const { data, loading } = state.getUserAuthenticated;

  return (
    <div className="py-5">
      <ServicesProvider>
        <Formulary
          userId={loading ? "" : data?.userId}
          accountId={loading ? "" : data?.accountId}
        />
      </ServicesProvider>
    </div>
  );
}
