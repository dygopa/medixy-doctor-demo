"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "../core/BaseComponents/Button";
import ChangePassword from "./ChangePassword/ChangePassword";
import RecoveryPasswordProvider from "./context/RecoveryPasswordContext";
import Email from "./Email/Email";
import OTP from "./OTP/OTP";
import Steps from "./Steps/Steps";

export default function RecoveryPasswordIndex() {
  const [values, setValues] = useState({
    email: "",
    otp: "",
    password: "",
  });
  const [step, setStep] = useState(0);

  const getComponentByStep = () => {
    switch (step) {
      case 0:
        return (
          <Email values={values} setValues={setValues} setStep={setStep} />
        );
      case 1:
        return <OTP values={values} setValues={setValues} setStep={setStep} />;
      case 2:
        return <ChangePassword values={values} setValues={setValues} />;

      default:
        break;
    }
  };

  return (
    <RecoveryPasswordProvider>
      <div className="w-full flex flex-col items-start h-screen bg-slate-100 absolute top-0 left-0 z-40">
        <div className="w-full h-[10vh] bg-white border-b border-slate-200 flex justify-between items-center py-[0.8rem] px-[7%] sticky top-0 left-0 z-40">
          <div className="relative lg:w-[200px] md:w-[200px] w-[115px] h-[75px]">
            <Image
              src="/images/logo.png"
              className="h-full object-contain w-40"
              alt="Register main"
              fill
            />
          </div>
          <Button variant="primary" className="w-[190px] px-0">
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>
        <div className="w-full px-[7%] h-full flex flex-col items-center justify-start gap-[2.5rem] mx-auto py-[3rem]">
          <Steps step={step} setStep={setStep} />

          {getComponentByStep()}
        </div>
      </div>
    </RecoveryPasswordProvider>
  );
}
