"use client";

import RegisterProvider, {
  IRegisterContext,
  RegisterContext,
} from "./context/RegisterContext";
import StepsProvider from "./Steps/context/StepsContext";
import Decider from "./Decider";
import Image from "next/image";
import Link from "next/link";
import Button from "../core/BaseComponents/Button";
import { useContext, useEffect } from "react";

export default function RegisterIndex() {
  const { state, actions, dispatch } =
    useContext<IRegisterContext>(RegisterContext);
  const { getUserAuthenticated } = actions;
  const { data: user, loading } = state.getUserAuthenticated;

  const getUserAuthenticatedDispatch = () => {
    const accessToken = localStorage.getItem("prosit.access_token") ?? "";

    getUserAuthenticated(accessToken)(dispatch);
  };

  useEffect(() => {
    getUserAuthenticatedDispatch();
  }, []);

  if (loading) return <div />;

  return (
    <div className="w-full flex flex-col items-start h-screen bg-slate-100 absolute top-0 left-0 z-40">
      <div className="w-full h-[10vh] bg-white border-b border-slate-200 flex justify-between items-center py-[0.8rem] px-[7%] sticky top-0 left-0 z-40">
        <div className="relative lg:w-[200px] md:w-[200px] w-[115px] h-[75px]">
          <Link href="/login">
            <Image
              src="/images/logo.png"
              className="h-full object-contain w-40"
              alt="Register main"
              fill
            />
          </Link>
        </div>
        <Button variant="primary" className="w-[190px] px-0">
          <Link href="/login">Iniciar sesión</Link>
        </Button>
      </div>
      <div className="w-full px-[7%] h-full flex flex-col items-center justify-start gap-[2.5rem] mx-auto py-[3rem]">
        <StepsProvider>
          <Decider user={user} />
        </StepsProvider>
      </div>
    </div>
  );
}
