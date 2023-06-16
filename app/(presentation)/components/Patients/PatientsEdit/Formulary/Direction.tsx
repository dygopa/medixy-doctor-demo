import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import { IUser } from "domain/core/entities/userEntity";
import {
  EditPatientContext,
  IEditPatientContext,
} from "../context/EditPatientContext";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import AutocompleteInputStates from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputStates/AutocompleteInputStates";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import AutocompleteInputMunicipalities from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputMunicipalities/AutocompleteInputMunicipalities";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import AutocompleteInputLocations from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputLocations/AutocompleteInputLocations";

interface IContactProps {
  values: {
    name: string;
    lastname: string;
    motherlastname: string;
    age: string;
    curp: string;
    sex: number;
    gender: number;
    phone: string;
    country: string;
    birthDate: string;
    email: string;
    federalEntity: IFederalEntity;
    municipality: IMunicipality;
    countryLocation: ICountryLocation;
    city: string;
    direction: string;
    street: string;
  };
  setValues: Dispatch<
    SetStateAction<{
      name: string;
      lastname: string;
      motherlastname: string;
      age: string;
      curp: string;
      sex: number;
      gender: number;
      birthDate: string;
      phone: string;
      country: string;
      email: string;
      federalEntity: IFederalEntity;
      municipality: IMunicipality;
      countryLocation: ICountryLocation;
      city: string;
      direction: string;
      street: string;
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

export default function Contact({
  values,
  setValues,
  errors,
  setErrors,
}: IContactProps) {
  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-base text-slate-900 pb-2">Dirección</p>
        </div>
        <div className="w-full md:grid md:grid-cols-2 grid-cols-1 justify-start items-center gap-3">
          <div className="md:flex md:flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Entidad Federativa
            </p>
            <AutocompleteInputStates
              defaultValue={values.federalEntity.nameEntity}
              itemsAdded={[values.federalEntity]}
              placeholder="Entidad federativa"
              onChange={(item: string) => {
                setValues({
                  ...values,
                  federalEntity: {} as IFederalEntity,
                  municipality: {} as IMunicipality,
                });

                setErrors({
                  ...errors,
                  federalEntity: "Debe seleccionar una entidad federativa",
                });
              }}
              onClick={(item: IFederalEntity) => {
                setValues({
                  ...values,
                  federalEntity: item,
                });

                setErrors({ ...errors, federalEntity: "" });
              }}
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
              defaultValue={values.municipality.name}
              itemsAdded={[values.municipality]}
              placeholder="Municipio"
              disabled={!values.federalEntity.entityId}
              federalEntityId={values.federalEntity.entityId}
              onChange={(item: string) => {
                setValues({
                  ...values,
                  municipality: {} as IMunicipality,
                  countryLocation: {} as ICountryLocation,
                });
              }}
              onClick={(item: IMunicipality) => {
                setValues({
                  ...values,
                  municipality: item,
                });
              }}
            />
          </div>
          <div className="md:flex md:flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Localidad
            </p>
            <AutocompleteInputLocations
              defaultValue={values.countryLocation.name}
              itemsAdded={[values.countryLocation]}
              placeholder="Localidad"
              disabled={
                !values.municipality.id || !values.federalEntity.entityId
              }
              municipalityId={values.municipality.id}
              onChange={(item: string) => {
                setValues({
                  ...values,
                  countryLocation: {} as ICountryLocation,
                });
              }}
              onClick={(item: ICountryLocation) => {
                setValues({
                  ...values,
                  countryLocation: item,
                });
              }}
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
          <div className="flex col-span-2 flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Dirección Completa
            </p>
            <FormInput
              type={"text"}
              value={values.direction}
              placeholder="Dirección completa de su residencia"
              className="form-control w-full"
              onChange={(e: any) => {
                setValues({ ...values, direction: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
