"use client";

import RegisterProvider from "./context/RegisterContext";
import StepsProvider from "./Steps/context/StepsContext";
import Decider from "./Decider";
import Image from "next/image";
import Link from "next/link";
import Button from "../core/BaseComponents/Button";
import { IUser } from "domain/core/entities/userEntity";
import { redirect } from "next/navigation";

interface IRegisterIndexProps {
  user: IUser | null;
}

export default function RegisterIndex({ user }: IRegisterIndexProps) {
  if (user && user.status !== 3) redirect("/dashboard");

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
          {/*<Steps />*/}
          <RegisterProvider>
            <Decider user={user} />
          </RegisterProvider>
        </StepsProvider>
      </div>
    </div>
  );
}
