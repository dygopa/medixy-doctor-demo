import { Dispatch, SetStateAction, useState } from "react";
import { CountryISO } from "../PhoneNumberInput";
import List from "./List/List";
import Search from "./Search/Search";

interface IPhoneNumberCountriesListProps {
  countries: CountryISO[];
  values: {
    phoneCode: string;
    phoneNumber: string;
    fullPhoneNumber: string;
    code: string;
  };
  onChangeCountry: (country: CountryISO) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function PhoneNumberCountriesList({
  countries,
  values,
  onChangeCountry,
  setIsOpen,
}: IPhoneNumberCountriesListProps) {
  const [list, setList] = useState<CountryISO[]>(countries);

  return (
    <div>
      <div>
        <Search countries={countries} setCountries={setList} />
      </div>

      <div className="w-full max-h-[300px] overflow-y-auto">
        <List
          countries={list}
          values={values}
          onChangeCountry={onChangeCountry}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
}
