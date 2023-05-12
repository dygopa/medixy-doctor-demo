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

export default function LocalityUpdateIndex() {
  const { state, actions, dispatch } = useContext<IAuthContext>(AuthContext);
  const { getUserAuthenticated } = actions;

  const { data, loading, error, successful } = state.getUserAuthenticated;

  const [loadedUser, setLoadedUser] = useState(false);

  const loadUser = () => {
    getUserAuthenticated()(dispatch);
    setLoadedUser(true);
  };

  useEffect(() => {
    loadUser();
  }, [loadedUser]);

  return (
    <div className="py-5">
      <LocalitiesProvider>
        <Formulary userId={loading ? "" : data.userId} />
      </LocalitiesProvider>
    </div>
  );
}
