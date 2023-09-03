import { VALIDATE_NUMBERS } from "(presentation)/(utils)/errors-validation";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import IntlPhoneNumberInput from "(presentation)/components/core/BaseComponents/Intl/IntlPhoneNumberInput/IntlPhoneNumberInput";
import { IUser } from "domain/core/entities/userEntity";
import { useState } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { twMerge } from "tailwind-merge";

interface IFormularyProps {
  account: IUser;
  setAccount: any;
}

export default function Contact({ account, setAccount }: IFormularyProps) {
  const [errors, setErrors] = useState({
    phone: "",
  });

  const handlephone = (value: string) => {
    setAccount({ ...account, phone: value });
    if (!VALIDATE_NUMBERS(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del paciente solo lleva números",
        };
      });
      return true;
    }
    setErrors({ ...errors, phone: "" });
    return false;
  };

  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-base text-slate-900 pb-2">Contácto</p>
        </div>
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-start items-center gap-3">
          <div className="flex flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Teléfono de Contacto
            </p>
            <IntlPhoneNumberInput
              preferredCountries={["mx"]}
              defaultCountry={"mx"}
              defaultValue={account.phone}
              value={account.phone}
              onPhoneNumberChange={(isValid, value, countryData, fullNumber) =>
                handlephone(fullNumber)
              }
              onPhoneNumberBlur={(e) => console.log(e)}
              inputClassName={twMerge([
                "disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900",
                "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                "transition duration-200 ease-in-out w-full bg-gray-100 text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80",
              ])}
            />
            {errors.phone.length > 0 && (
              <span className="text-red-500">{errors.phone}</span>
            )}
          </div>
          {/*<div className="flex flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Sitio web
            </p>
            <FormInput
              type={"text"}
              placeholder="www.misitio.com"
              min={0}
              value={account?.websiteUrl}
              className="form-control w-full"
              onChange={(e) =>
                setAccount({ ...account, websiteUrl: e.target.value })
              }
            />
            </div>*/}
        </div>
      </div>
    </div>
  );
}
