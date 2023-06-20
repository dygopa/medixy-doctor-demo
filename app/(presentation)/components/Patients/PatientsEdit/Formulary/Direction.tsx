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
  useMemo,
} from "react";
import AutocompleteInputStates from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputStates/AutocompleteInputStates";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import AutocompleteInputMunicipalities from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputMunicipalities/AutocompleteInputMunicipalities";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import AutocompleteInputLocations from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputLocations/AutocompleteInputLocations";
import { IUserContext, UserContext } from "(presentation)/components/Account/context/UserContext";

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
    federalEntity: number;
    municipality: number;
    countryLocation: number;
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
      federalEntity: number;
      municipality: number;
      countryLocation: number;
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

  const { state, actions, dispatch } = useContext<IEditPatientContext>(EditPatientContext);
  const { getFederalEntities, getMunicipalities, getCountryLocations } = actions;
  const { data: federalEntities } = state.getFederalEntities;
  const { data: municipalities, successful } = state.municipalities;
  const { data: countryLocations } = state.countryLocations;

  useEffect(() => {
    getFederalEntities()(dispatch);
  }, [])

  useEffect(() => {
    getMunicipalities({
      federalEntityId: values.federalEntity,
    })(dispatch);
  }, [values.federalEntity])

  useMemo(() => {
    if (successful) {
      if (municipalities.data.length > 0) {
        const municipalitySearch = municipalities.data.find((elem) => {
          return elem.id === values.municipality;
        })
        getCountryLocations({
          federalEntityId: values.federalEntity,
          municipalityId: municipalitySearch?.catalogId,
        })(dispatch);
      }
    }
  }, [values.federalEntity, values.municipality, successful])

  console.log(countryLocations)

  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-base text-slate-900 pb-2">Dirección</p>
        </div>
        <div className="w-full md:grid md:grid-cols-2 grid-cols-1 justify-start items-center gap-3">
          <div className="md:flex md:flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Entidad Federativa{" "}<span className="text-primary font-bold">*</span>
            </p>
            <FormSelect
              className="form-control w-full"
              defaultValue={values.federalEntity}
              value={values.federalEntity}
              onChange={(e: any) =>
                setValues({ ...values, federalEntity: parseInt(e.target.value) })
              }
            >
              {federalEntities.map((elem) => (
                <option key={elem.entityId} value={elem.entityId}>
                  {elem.nameEntity}
                </option>
              ))}
            </FormSelect>

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
            <FormSelect
              className="form-control w-full"
              disabled={values.federalEntity === 0}
              defaultValue={values.municipality}
              value={values.municipality}
              onChange={(e: any) =>
                setValues({ ...values, municipality: parseInt(e.target.value) })
              }
            >
              {municipalities.data?.map((elem: IMunicipality) => (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                ))
              }
            </FormSelect>
          </div>
          <div className="md:flex md:flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Localidad
            </p>
            <FormSelect
              className="form-control w-full"
              disabled={values.municipality === 0}
              defaultValue={values.countryLocation}
              value={values.countryLocation}
              onChange={(e: any) =>
                setValues({ ...values, countryLocation: parseInt(e.target.value) })
              }
            >
              {countryLocations.data?.map((elem: ICountryLocation) => (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                ))
              }
            </FormSelect>
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
