import { VALIDATE_NUMBERS } from "(presentation)/(utils)/errors-validation";
import AddressAutocomplete from "(presentation)/components/core/BaseComponents/Autocomplete/AddressAutocomplete/AddressAutocomplete";
import AutocompleteInputLocations from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputLocations/AutocompleteInputLocations";
import AutocompleteInputMunicipalities from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputMunicipalities/AutocompleteInputMunicipalities";
import AutocompleteInputStates from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputStates/AutocompleteInputStates";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "(presentation)/components/MedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from "react";

interface IContactProps {
  values: {
    id: number;
    name: string;
    lastname: string;
    motherlastname: string;
    age: string;
    curp: string;
    sex: number;
    gender: number;
    phone: string;
    country: string;
    email: string;
    birthDate: string;
    federalEntity: number;
    municipality: number;
    countryLocation: number;
    municipalityCatalogId: number;
    city: string;
    direction: string;
    street: string;
    pictureUrl: string;
    postalCode: string;
  };
  setValues: Dispatch<
    SetStateAction<{
      id: number;
      name: string;
      lastname: string;
      motherlastname: string;
      age: string;
      curp: string;
      sex: number;
      gender: number;
      phone: string;
      country: string;
      email: string;
      birthDate: string;
      federalEntity: number;
      municipality: number;
      countryLocation: number;
      municipalityCatalogId: number;
      city: string;
      direction: string;
      street: string;
      pictureUrl: string;
      postalCode: string;
    }>
  >;
  errors: {
    global: string;
    name: string;
    lastname: string;
    motherlastname: string;
    age: string;
    curp: string;
    sex: string;
    country: string;
    email: string;
    phone: string;
    federalEntity: string;
    postalCode: string;
  };
  setErrors: Dispatch<
    SetStateAction<{
      global: string;
      name: string;
      lastname: string;
      motherlastname: string;
      age: string;
      curp: string;
      sex: string;
      country: string;
      email: string;
      phone: string;
      federalEntity: string;
      postalCode: string;
    }>
  >;
}
export default function Contact({
  values,
  setValues,
  errors,
  setErrors,
}: IContactProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );

  const handlePostalCode = (value: string) => {
    setValues({ ...values, postalCode: value });
    if (value.length > 0 && !VALIDATE_NUMBERS(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          postalCode: "El codigo postal solo lleva numeros",
        };
      });
      return true;
    }
    setErrors({ ...errors, postalCode: "" });
    return false;
  };

  return (
    <div className="w-full bg-white  rounded-md h-fit mt-4">
      <div className="w-full rounded-md p-5 flex">
        <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
          <div className="w-full border-b mb-2">
            <p className="font-medium text-base text-slate-900 pb-2">
              Dirección
            </p>
          </div>
          <div className="w-full md:grid md:grid-cols-2 grid-cols-1 justify-start items-center gap-3">
            <AddressAutocomplete
              formData={values}
              setFormData={setValues}
              isColumn
              federalEntityId={values.federalEntity}
              municipalityId={values.municipality}
              municipalityCatalogId={values.municipalityCatalogId}
              locationId={values.countryLocation}
            />
            <div className="my-3 md:my-0 md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Código postal
              </p>
              <FormInput
                type={"text"}
                placeholder="Código postal"
                min={0}
                value={values.postalCode}
                className="form-control w-full"
                onChange={(e) => handlePostalCode(e.target.value)}
              />
              {errors.postalCode.length > 0 && (
                <span className="text-red-500">{errors.postalCode}</span>
              )}
            </div>
            </div>
            <div className="w-full">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Calle
              </p>
              <FormInput
                type={"text"}
                placeholder="Calle"
                min={0}
                value={values.street}
                className="form-control w-full"
                onChange={(e: any) => {
                  setValues({ ...values, street: e.target.value });
                }}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
