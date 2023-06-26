"use client";

import { AdminAccountRoutesEnum } from "(presentation)/(routes)/admin/accountRoutes";
import { useEffect } from "react";

export default function LogoutIndex() {
  useEffect(() => {
    window.location.href =
      window.location.origin + AdminAccountRoutesEnum.SignIn;
  }, []);

  return <div />;
}
