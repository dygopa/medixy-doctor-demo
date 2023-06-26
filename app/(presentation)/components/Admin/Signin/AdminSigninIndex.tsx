"use client";

import Image from "next/image";
import FormularyProvider from "./Formulary/context/FormularyContext";
import Formulary from "./Formulary/Formulary";
import Side from "./Side/Side";

export default function AdminSigninIndex() {
  return (
    <div className="flex h-screen bg-white w-full absolute top-0 left-0">
      <div className="w-1/2 relative lg:block hidden">
        <Side />
      </div>

      <div className="lg:w-1/2 w-full ">
        <div className="lg:flex items-center h-full w-full py-32 xl:px-26 lg:px-12 md:px-12 px-12">
          <div className="mb-14 lg:hidden block">
            <div className="flex justify-center items-center h-full w-full">
              <Image
                src="/images/logo.png"
                width={250}
                height={250}
                alt="App logo"
              />
            </div>
          </div>

          <div className="w-full lg:px-24 md:px-24 sm:px-16 px-0">
            <FormularyProvider>
              <Formulary />
            </FormularyProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
