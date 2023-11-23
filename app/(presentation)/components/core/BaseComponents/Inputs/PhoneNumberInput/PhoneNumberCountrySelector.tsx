import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import PhoneNumberCountriesList from "./PhoneNumberCountriesList/PhoneNumberCountriesList";
import { CountryISO } from "./PhoneNumberInput";

interface IPhoneNumberCountrySelectorProps {
  countries: CountryISO[];
  values: {
    phoneCode: string;
    phoneNumber: string;
    fullPhoneNumber: string;
    code: string;
  };
  onChangeCountry: (country: CountryISO) => void;
  focus: boolean;
  height?: string | number;
}

export default function PhoneNumberCountrySelector({
  countries,
  values,
  onChangeCountry,
  focus,
  height = "44px",
}: IPhoneNumberCountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (focus) setIsOpen(false);
  }, [focus]);

  if (countries.length === 0) return <div />;

  return (
    <>
      <div>
        <div
          style={{ height: height }}
          className="bg-white rounded-tl-md rounded-bl-md hover:bg-slate-100 cursor-pointer shadow-sm"
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-full px-2"
          >
            <div className="flex items-center">
              <div className="mr-4">
                <span className={`fi fi-${values.code}`} />
              </div>

              <div>
                <i
                  className={
                    isOpen
                      ? "fa-solid fa-chevron-up"
                      : "fa-solid fa-chevron-down"
                  }
                />
              </div>
            </div>
          </button>
        </div>
      </div>

      <div
        className={clsx([
          "lg:max-w-[350px] md:max-w-[350px] max-w-full max-h-[350px] bg-white absolute top-[47px] rounded-md left-0 z-[60]",
          isOpen ? "block" : "hidden",
        ])}
      >
        <PhoneNumberCountriesList
          countries={countries}
          values={values}
          onChangeCountry={onChangeCountry}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}
