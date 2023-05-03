"use client";

import Formulary from "./Formulary/Formulary";
import RegisterProvider from "./context/RegisterContext";
import Steps from "./Steps/Steps";
import StepsProvider from "./Steps/context/StepsContext";
import Decider from "./Decider";
import Image from "next/image";
import Link from "next/link";
import Button from "../core/BaseComponents/Button";

export default function RegisterIndex() {
  return (
    <div className="w-full flex flex-col justify-between items-start h-screen bg-slate-100">
      <div className="w-full h-[10vh] bg-white border-b border-slate-200 flex justify-between items-center py-[0.8rem] px-[7%] sticky top-0 left-0">
        <img
          src="/images/logo.png"
          className="h-full object-contain w-40"
          alt="Register main"
        />
        <Button variant="primary">
          <Link href="/login" >Iniciar sesión</Link>
        </Button>
      </div>
      <div className="w-full px-[25%] h-full flex flex-col items-center justify-start gap-[2.5rem] mx-auto py-[3rem]">
        <StepsProvider>
          <Steps/>
          <RegisterProvider>
            <Decider/>
          </RegisterProvider>
        </StepsProvider>
      </div>
    </div>
  );
}
