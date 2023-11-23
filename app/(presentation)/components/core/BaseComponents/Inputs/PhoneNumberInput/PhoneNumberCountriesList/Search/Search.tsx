import FormInput from "(presentation)/components/core/BaseComponents/Form/FormInput";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { CountryISO } from "../../PhoneNumberInput";

interface ISearchProps {
  countries: CountryISO[];
  setCountries: Dispatch<SetStateAction<CountryISO[]>>;
}

export default function Search({ countries, setCountries }: ISearchProps) {
  const [query, setQuery] = useState("");

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);

    if (value.length === 0) {
      setCountries(countries);
      return;
    }

    let newList: CountryISO[] = [];

    countries.forEach((country) => {
      if (
        country.nameES.toLowerCase().includes(value.toLowerCase()) ||
        country.dialCode.toLowerCase().includes(value.toLowerCase())
      ) {
        newList.push(country);
      }
    });

    setCountries(newList);
  };

  return (
    <div className="flex items-center border-b p-2">
      <div>
        <i className="fa-solid fa-magnifying-glass" />
      </div>

      <div className="w-full">
        <FormInput
          value={query}
          onChange={(e) => onSearch(e)}
          type="text"
          className="py-0 border-none shadow-none text-gray-900 placeholder:text-gray-400/90 text-sm focus:border-none focus:outline-none outline-none w-full bg-white focus:shadow-none focus:ring-0"
          placeholder="Buscar"
        />
      </div>
    </div>
  );
}
