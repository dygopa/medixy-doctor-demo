"use client";

import { AdminAccountRoutesEnum } from "(presentation)/(routes)/admin/accountRoutes";
import { useContext, useEffect } from "react";
import { ISignOutContext, SignOutContext } from "./context/SignOutContext";

export default function LogoutIndex() {
  const { state, actions, dispatch } =
    useContext<ISignOutContext>(SignOutContext);
  const { signOutUser } = actions;
  const { successful } = state.signOutUserState;

  useEffect(() => {
    signOutUser()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successful)
      window.location.href = window.location.origin + AdminAccountRoutesEnum.SignIn;
  }, [successful]);

  return <div />;
}
