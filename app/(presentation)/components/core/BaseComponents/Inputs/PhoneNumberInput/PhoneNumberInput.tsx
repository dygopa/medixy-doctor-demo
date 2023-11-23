import { useState, useEffect, ChangeEvent } from "react";
import CountriesCodeJson from "(presentation)/(assets)/json/countriesCodeJson.json";
import PhoneNumberCountrySelector from "./PhoneNumberCountrySelector";
import { PhoneNumberValidator } from "(presentation)/(validators)/phoneNumberValidator";
import clsx from "clsx";

interface IPhoneNumberInputProps {
  preferredCountries?: string[] | null;
  defaultSelectedCountry?: string | null;
  defaultValue?: string;
  onPhoneNumberChange: (obj: {
    phoneCode: string;
    phoneNumber: string;
    fullPhoneNumber: string;
    code: string;
  }) => void;
  isDark?: boolean;
  height?: string | number;
}

export interface CountryISO {
  nameEN: string;
  nameES: string;
  dialCode: string;
  code: string;
  placeholder: string;
}

export default function PhoneNumberInput({
  preferredCountries,
  defaultSelectedCountry,
  onPhoneNumberChange,
  isDark = false,
  height = "44px",
  defaultValue = "",
}: IPhoneNumberInputProps) {
  const [countries, setCountries] = useState<CountryISO[]>([]);
  const [values, setValues] = useState({
    phoneCode: "",
    phoneNumber: "",
    fullPhoneNumber: "",
    code: "",
  });
  const [focus, setFocus] = useState(false);

  const setCountriesDialCodes = () => {
    const countries: CountryISO[] = [];

    CountriesCodeJson.countries.forEach((country) => {
      let countryIso: CountryISO = {} as CountryISO;

      if (
        preferredCountries &&
        preferredCountries.length > 0 &&
        preferredCountries.indexOf(country.code.toLowerCase()) >= 0
      ) {
        countryIso = {
          nameEN: country.name_en,
          nameES: country.name_es,
          dialCode: country.dial_code,
          code: country.code.toLowerCase(),
          placeholder: country?.placeholder ?? "",
        };
      } else if (!preferredCountries) {
        countryIso = {
          nameEN: country.name_en,
          nameES: country.name_es,
          dialCode: country.dial_code,
          code: country.code.toLowerCase(),
          placeholder: country?.placeholder ?? "",
        };
      }

      if (countryIso.code?.length > 0) countries.push(countryIso);

      if (countries.length > 0 && defaultSelectedCountry) {
        const country = countries.find(
          (element) => element.code === defaultSelectedCountry.toLowerCase()
        );

        if (country?.code && country?.code?.length > 0) {
          setValues({
            ...values,
            phoneCode: country.dialCode,
            phoneNumber: defaultValue.trim(),
            fullPhoneNumber: `${country.dialCode}${defaultValue.trim()}`,
            code: country.code,
          });
        } else {
          setValues({
            ...values,
            phoneCode: countries[0].dialCode,
            phoneNumber: defaultValue.trim(),
            fullPhoneNumber: `${countries[0].dialCode}${defaultValue.trim()}`,
            code: countries[0].code,
          });
        }
      }

      if (countries.length > 0 && !defaultSelectedCountry) {
        setValues({
          ...values,
          phoneCode: countries[0].dialCode,
          phoneNumber: defaultValue.trim(),
          fullPhoneNumber: `${countries[0].dialCode}${defaultValue.trim()}`,
          code: countries[0].code,
        });
      }
    });

    setCountries(countries);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (
      value.trim().length === 0 ||
      new PhoneNumberValidator(value).validate_regexp().isValid
    ) {
      setValues({
        ...values,
        phoneNumber: value.trim(),
        fullPhoneNumber: `${values.phoneCode}${value.trim()}`,
      });
    }
  };

  const onChangeCountry = (country: CountryISO) => {
    setValues({
      ...values,
      phoneCode: country.dialCode,
      code: country.code,
      fullPhoneNumber: `${country.dialCode}${values.phoneNumber.trim()}`,
    });
  };

  const getPlaceHolder = (code: string) => {
    if (countries.length === 0) return "";

    const country = countries.find((element) => element.code === code);

    if (country) return country.placeholder;

    return "";
  };

  useEffect(() => {
    setCountriesDialCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onPhoneNumberChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div className="flex w-full relative">
      <div>
        <PhoneNumberCountrySelector
          values={values}
          onChangeCountry={onChangeCountry}
          countries={countries}
          focus={focus}
          height={height}
        />
      </div>

      <div className="w-full relative flex">
        <div
          style={{ height: height }}
          className={clsx([
            isDark ? "bg-gray-100" : "bg-white",
            focus
              ? "shadow-sm border ring-0 border-t-4 border-r-0 border-l-4 border-b-4 border-opacity-20 border-primary"
              : "shadow-sm border ring-0 border-t-4 border-r-0 border-l-4 border-b-4 border-opacity-20 border-transparent",
          ])}
        >
          <div className="px-2 h-full flex items-center">
            <p>{values.phoneCode}</p>
          </div>
        </div>

        <input
          type="text"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{ height: height }}
          className={clsx([
            "w-full py-3 pl-0 pr-10 rounded-tl-none rounded-bl-none rounded-md text-gray-900 placeholder:text-gray-400/90 text-sm",
            isDark ? "bg-gray-100" : "bg-white",
            focus
              ? "shadow-sm focus:ring-0 focus:border-t-4 focus:border-r-4 focus:border-l-0 focus:border-b-4 focus:border-opacity-20 focus:border-primary"
              : "ring-0 border-none",
          ])}
          placeholder={getPlaceHolder(values.code)}
          value={values.phoneNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        />
      </div>
    </div>
  );
}
