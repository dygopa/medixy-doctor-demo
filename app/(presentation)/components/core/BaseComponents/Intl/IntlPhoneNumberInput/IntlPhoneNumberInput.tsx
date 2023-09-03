import { getCountriesDialCodeES } from "(presentation)/(helper)/intl/intlHelper";
import { FocusEvent } from "react";
import IntlTelInput, { CountryData } from "react-intl-tel-input";

interface IIntlPhoneNumberInputProps {
  defaultCountry?: string | undefined;
  defaultValue?: string | undefined;
  value?: string | undefined;
  preferredCountries?: string[] | undefined;
  onPhoneNumberChange?:
    | ((
        isValid: boolean,
        value: string,
        selectedCountryData: CountryData,
        fullNumber: string,
        extension: string
      ) => void)
    | undefined;
  onPhoneNumberBlur?:
    | ((
        isValid: boolean,
        value: string,
        selectedCountryData: CountryData,
        fullNumber: string,
        extension: string,
        event: FocusEvent<HTMLInputElement, Element>
      ) => void)
    | undefined;
  containerClassName?: string | undefined;
  inputClassName?: string | undefined;
  placeholder?: string | undefined;
}

export default function IntlPhoneNumberInput({
  defaultCountry,
  defaultValue,
  value,
  preferredCountries,
  onPhoneNumberChange,
  onPhoneNumberBlur,
  containerClassName,
  inputClassName,
  placeholder
}: IIntlPhoneNumberInputProps) {
  return (
    <IntlTelInput
      defaultCountry={defaultCountry}
      preferredCountries={preferredCountries}
      defaultValue={defaultValue}
      value={value}
      onPhoneNumberChange={onPhoneNumberChange}
      onPhoneNumberBlur={onPhoneNumberBlur}
      countriesData={getCountriesDialCodeES()}
      containerClassName={containerClassName}
      inputClassName={inputClassName}
      placeholder={placeholder}
    />
  );
}
