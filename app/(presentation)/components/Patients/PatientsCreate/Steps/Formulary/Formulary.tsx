import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import {
  CreatePatientContext,
  ICreatePatientContext,
} from "../../context/CreatePatientContext";
import { ISubject } from "domain/core/entities/subjectEntity";
import { subjectFailuresEnum } from "domain/core/failures/subject/subjectFailure";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { useRouter } from "next/navigation";
import {
  VALIDATE_EMAIL,
  VALIDATE_NAMES,
  VALIDATE_NUMBERS,
  VALIDATE_STRING,
} from "(presentation)/(utils)/errors-validation";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { twMerge } from "tailwind-merge";
import { getCountriesDialCodeES } from "(presentation)/(helper)/intl/intlHelper";
import IntlPhoneNumberInput from "(presentation)/components/core/BaseComponents/Intl/IntlPhoneNumberInput/IntlPhoneNumberInput";
import moment from "moment";
import AutocompleteInputStates from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputStates/AutocompleteInputStates";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import AutocompleteInputMunicipalities from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputMunicipalities/AutocompleteInputMunicipalities";
import AutocompleteInputLocations from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputLocations/AutocompleteInputLocations";
import AddressAutocomplete from "(presentation)/components/core/BaseComponents/Autocomplete/AddressAutocomplete/AddressAutocomplete";
import Link from "next/link";

interface IBasicDataProps {
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
    email: string;
    birthDate: string;
    federalEntity: number;
    municipality: number;
    municipalityCatalogId: number;
    countryLocation: number;
    city: string;
    direction: string;
    street: string;
    postalCode: string;
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
      municipalityCatalogId: number;
      countryLocation: number;
      city: string;
      direction: string;
      street: string;
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

export default function Formulary({
  values,
  setValues,
  errors,
  setErrors,
}: IBasicDataProps) {
  const handlename = (value: string, e: any) => {
    setValues({ ...values, name: value });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          name: "El nombre del paciente es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          name: "El nombre del paciente solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, name: "" });
    return false;
  };

  const handlelastname = (value: string) => {
    setValues({ ...values, lastname: value });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          lastname: "El apellido del paciente es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          lastname: "El apellido del paciente solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, lastname: "" });
    return false;
  };

  const handleSecondLastname = (value: string) => {
    setValues({ ...values, motherlastname: value });
    if (value.length > 0 && !VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          motherlastname: "El apellido del paciente solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, motherlastname: "" });
    return false;
  };

  const handlePostalCode = (value: string) => {
    setValues({ ...values, postalCode: value });
    if (value.length > 0 && !VALIDATE_NUMBERS(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          postalCode: "El codigo postal solo debe incluir numeros",
        };
      });
      return true;
    }
    setErrors({ ...errors, postalCode: "" });
    return false;
  };

  const handleage = (value: string) => {
    setValues({ ...values, age: value });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          age: "La fecha de nacimiento es obligatoria",
        };
      });
      return true;
    }
    setErrors({ ...errors, age: "" });
    return false;
  };

  const handlephone = (value: string) => {
    setValues({ ...values, phone: value });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del paciente es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NUMBERS(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del paciente solo debe incluir números",
        };
      });
      return true;
    }
    setErrors({ ...errors, phone: "" });
    return false;
  };

  const handleEmail = (value: string) => {
    setValues({ ...values, email: value });
    if (values.email.length > 1) {
      if (!VALIDATE_EMAIL(values.email)) {
        setErrors({
          ...errors,
          email: "El correo debe tener un formato válido",
        });
        return true;
      }
    }
    setErrors({ ...errors, email: "" });
    return false;
  };

  return (
    <div className="w-full bg-white shadow-xl lg:w-[60%] shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full border-b mb-2">
        <p className="font-medium text-base text-slate-900 pb-2">
          Nuevo Paciente
        </p>
      </div>
      <div className="input-group w-full">
        <p className="input-label py-2">CURP</p>
        <FormInput
          type="text"
          onChange={(e: any) => setValues({ ...values, curp: e.target.value })}
          placeholder="CURP"
        />
        <div className="w-full pb-2 mt-1">
          <Link
            target="_blank"
            href="https://www.gob.mx/curp/"
            className="text-primary font-light text-sm"
          >
            ¿No sabes cual es tu CURP? Visita este sitio
          </Link>
        </div>
      </div>
      <div className="input-group w-full">
        <p className="input-label pb-2">
          Nombre <span className="text-primary font-bold">*</span>
        </p>
        <FormInput
          type="text"
          onChange={(e: any) => handlename(e.target.value, e)}
          placeholder="Nombre"
        />
        {errors.name.length > 0 && (
          <span className="text-red-500">{errors.name}</span>
        )}
      </div>
      <div className="md:flex gap-3 w-full">
        <div className="input-group md:w-[50%]">
          <p className="input-label py-2">
            Primer apellido <span className="text-primary font-bold">*</span>
          </p>
          <FormInput
            type="text"
            onChange={(e: any) => handlelastname(e.target.value)}
            placeholder="Primer apellido"
          />
          {errors.lastname.length > 0 && (
            <div className="mt-1">
              <span className="text-red-500">{errors.lastname}</span>
            </div>
          )}
        </div>
        <div className="input-group mt-3 md:mt-0 md:w-[50%]">
          <p className="input-label py-2">Segundo apellido</p>
          <FormInput
            type="text"
            onChange={(e: any) => handleSecondLastname(e.target.value)}
            placeholder="Segundo apellido"
          />
          {errors.motherlastname.length > 0 && (
            <div className="mt-1">
              <span className="text-red-500">{errors.motherlastname}</span>
            </div>
          )}
        </div>
      </div>

      <div className="input-group w-full">
        <p className="input-label py-2">
          Fecha de nacimiento <span className="text-primary font-bold">*</span>
        </p>
        <FormInput
          type={"date"}
          max={moment().format("YYYY-MM-DD")}
          onChange={(e: any) => handleage(e.target.value)}
          className="form-control w-full"
        />
        {errors.age.length > 0 && (
          <div className="mt-1">
            <span className="text-red-500">{errors.age}</span>
          </div>
        )}
      </div>

      <div className="input-group w-full">
        <p className="input-label py-2">Sexo</p>
        <FormSelect
          className="form-control"
          onChange={(e) => setValues({ ...values, sex: +e.target.value })}
        >
          <option value={0}>No Especificado</option>
          <option value={1}>Masculino</option>
          <option value={2}>Femenino</option>
        </FormSelect>
      </div>

      {/*<div className="input-group w-full">
        <p className="input-label py-2">Género</p>
        <FormSelect
          value={values?.gender}
          className="form-control w-full"
          onChange={(e) => setValues({ ...values, gender: +e.target.value })}
        >
          <option value={0}>No especificado</option>
          <option value={1}>Masculino</option>
          <option value={2}>Femenino</option>
          <option value={3}>Transegénero</option>
          <option value={4}>Transexual</option>
          <option value={5}>Travesti</option>
          <option value={6}>Intersexial</option>
          <option value={7}>Otro</option>
        </FormSelect>
        </div>*/}

      <div className="md:flex gap-3 w-full">
        <div className="input-group md:w-[50%]">
          <p className="input-label py-2">
            Teléfono <span className="text-primary font-bold">*</span>
          </p>
          <div className="w-full">
            <IntlPhoneNumberInput
              preferredCountries={["mx", "US"]}
              onPhoneNumberChange={(isValid, value, countryData, fullNumber) =>
                handlephone(fullNumber)
              }
              onPhoneNumberBlur={(e) => console.log(e)}
              containerClassName="intl-tel-input w-full"
              inputClassName={twMerge([
                "disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900 w-full",
                "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                "transition duration-200 ease-in-out w-full bg-gray-100 text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80",
              ])}
            />
          </div>
          {errors.phone.length > 0 && (
            <div className="mt-1">
              <span className="text-red-500">{errors.phone}</span>
            </div>
          )}
        </div>
        <div className="input-group md:w-[50%]">
          <p className="input-label py-2">Email</p>
          <FormInput
            type="email"
            onChange={(e) => handleEmail(e.target.value)}
            placeholder="Email"
          />
          {errors.email.length > 0 && (
            <div className="mt-1">
              <span className="text-red-500">{errors.email}</span>
            </div>
          )}
        </div>
      </div>

      {/*<div className="w-full md:grid md:grid-cols-2 grid-cols-1 justify-start items-center gap-3">
        <AddressAutocomplete
          formData={values}
          setFormData={setValues}
          isColumn
          isCreatePatient
          federalEntityId={values.federalEntity}
          municipalityId={values.municipality}
          municipalityCatalogId={values.municipalityCatalogId}
          locationId={values.countryLocation}
        />
        <div className="input-group md:flex md:flex-col justify-between items-start relative gap-1">
          <p className="input-label py-2">Código postal</p>
          <FormInput
            type={"text"}
            placeholder="Código postal"
            value={values.postalCode}
            className="form-control w-full"
            onChange={(e) => handlePostalCode(e.target.value)}
          />
          {errors.postalCode.length > 0 && (
            <div className="mt-1">
              <span className="text-red-500">{errors.postalCode}</span>
            </div>
          )}
        </div>
      </div>
      <div className="input-group w-full">
        <p className="input-label py-2">Calle</p>
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
        </div>*/}
    </div>
  );
}
