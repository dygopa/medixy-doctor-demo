"use client";

import React, { useContext, useEffect, useState } from "react";
import ServicesProvider from "../context/ServicesContext";
import { usePathname, useSearchParams } from "next/navigation";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import Formulary from "./Formulary/Formulary";

export default function ServiceViewIndex() {
  const { state } = useContext<IAuthContext>(AuthContext);
  const { data, loading } = state.getUserAuthenticated;

  return (
    <div className="py-5">
      <ServicesProvider>
        <Formulary userId={loading ? "" : data.userId} />
      </ServicesProvider>
    </div>
  );
}
