import AutocompleteInputLocations from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputLocations/AutocompleteInputLocations";
import AutocompleteInputMunicipalities from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputMunicipalities/AutocompleteInputMunicipalities";
import AutocompleteInputStates from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputStates/AutocompleteInputStates";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "(presentation)/components/MedicalRecord/MedicalRecord/context/MedicalRecordContext";
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
    }>
  >;
}
export default function Contact({ values, setValues, errors, setErrors }: IContactProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);

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
            <div className="md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Estado{" "}<span className="text-primary font-bold">*</span>
              </p>
                <AutocompleteInputStates
                  setDefaultValue
                  onClick={(item: IFederalEntity) =>
                    setValues({
                      ...values,
                      federalEntity: item.entityId,
                      municipality: 0,
                      municipalityCatalogId: 0,
                      countryLocation: 0,
                    })
                  }
                  className="form-control lg:w-full"
                  federalEntityId={values.federalEntity}
                />
              {errors.federalEntity && (
                <p className="text-danger mt-1">
                  Debe seleccionar la entidad federativa
                </p>
              )}
            </div>
            <div className="md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Municipio
              </p>
              <AutocompleteInputMunicipalities
                onClick={(item: IMunicipality) =>
                  setValues({
                    ...values,
                    municipality: item.id,
                    municipalityCatalogId: item.catalogId,
                    countryLocation: 0,
                  })
                }
                disabled={values.federalEntity === 0}
                className="form-control lg:w-full"
                municipalityId={values.municipality}
                federalEntityId={values.federalEntity}
              />
            </div>
            <div className="md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Colonia
              </p>
              <AutocompleteInputLocations
                onClick={(item: ICountryLocation) =>
                  setValues({ ...values, countryLocation: item.id })
                }
                disabled={values.municipality === 0}
                className="form-control lg:w-full"
                municipalityId={values.municipalityCatalogId}
                federalEntityId={values.federalEntity}
                countryLocationId={values.countryLocation}
              />
            </div>
            <div className="my-3 md:my-0 md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Ciudad
              </p>
              <FormInput
                type={"text"}
                placeholder="Ciudad"
                min={0}
                value={values.city}
                className="form-control w-full"
                onChange={(e: any) => {
                  setValues({ ...values, city: e.target.value });
                }}
              />
            </div>
            <div className="lex col-span-2 flex-col justify-between items-start relative gap-1">
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
    </div>
  );
}
