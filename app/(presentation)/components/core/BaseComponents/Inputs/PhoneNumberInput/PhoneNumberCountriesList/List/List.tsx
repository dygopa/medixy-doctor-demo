import { Dispatch, SetStateAction } from "react";
import { CountryISO } from "../../PhoneNumberInput";
import "/node_modules/flag-icons/css/flag-icons.min.css";

interface IListProps {
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

export default function List({
  countries,
  values,
  onChangeCountry,
  setIsOpen,
}: IListProps) {
  return (
    <div>
      {countries.map((country) => (
        <button
          key={country.code}
          type="button"
          onClick={() => {
            onChangeCountry(country);
            setIsOpen(false);
          }}
          className="w-full h-auto p-2 hover:bg-slate-100"
        >
          <div className="flex items-center justify-between text-left">
            <div className="flex items-center">
              <div className="mr-2">
                <span className={`fi fi-${country.code}`} />
              </div>

              <div>
                <p>
                  {country.nameES} ({country.dialCode})
                </p>
              </div>
            </div>

            {values.code === country.code && (
              <div>
                <i className="fa-solid fa-check" />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
