"use client";

import FormularyProvider from "./Formulary/context/FormularyContext";
import Formulary from "./Formulary/Formulary";
import Side from "./Side/Side";

export default function SignInIndex() {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/2 relative">
        <Side />
      </div>

      <div className="w-1/2 px-32">
        <div className="flex items-center h-full py-32">
          <FormularyProvider>
            <Formulary />
          </FormularyProvider>
        </div>
      </div>
    </div>
  );
}
