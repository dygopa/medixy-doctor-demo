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
import { IPatient } from "domain/core/entities/patientEntity";
import { patientFailuresEnum } from "domain/core/failures/patient/patientFailure";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { useRouter } from "next/navigation";

interface IBasicDataProps {
  values: {
    name: string;
    lastname: string;
    motherlastname: string;
    age: string;
    curp: string;
    sex: number;
    phone: string;
    email: string;
  };
  setValues: Dispatch<
    SetStateAction<{
      name: string;
      lastname: string;
      motherlastname: string;
      age: string;
      curp: string;
      sex: number;
      phone: string;
      email: string;
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
    email: string;
    phone: string;
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
      email: string;
      phone: string;
    }>
  >;
}

export default function Formulary({
  values,
  setValues,
  errors,
  setErrors,
}: IBasicDataProps) {
  const handlename = (value: string) => {
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
    setErrors({ ...errors, lastname: "" });
    return false;
  };

  const handleage = (value: string) => {
    setValues({ ...values, age: value });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          age: "La fecha de nacimiento es obligatorio",
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
    setErrors({ ...errors, phone: "" });
    return false;
  };

  return (
    <div className="w-full bg-white shadow-xl lg:w-[60%] shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full border-b mb-2">
        <p className="font-medium text-base text-slate-900 pb-2">
          Nuevo paciente
        </p>
      </div>
      <div className="input-group w-full">
        <p className="input-label pb-2">
          Nombre <span className="text-primary font-bold">*</span>
        </p>
        <FormInput
          type="text"
          onChange={(e: any) => handlename(e.target.value)}
          placeholder="Nombre"
        />
        {errors.name.length > 0 && (
          <span className="text-red-500">{errors.name}</span>
        )}
      </div>
      <div className="md:flex gap-3 w-full">
        <div className="input-group md:w-[50%]">
          <p className="input-label py-2">
            Apellido Paterno <span className="text-primary font-bold">*</span>
          </p>
          <FormInput
            type="text"
            onChange={(e: any) => handlelastname(e.target.value)}
            placeholder="Primer apellido"
          />
          {errors.lastname.length > 0 && (
            <span className="text-red-500">{errors.lastname}</span>
          )}
        </div>
        <div className="input-group mt-3 md:mt-0 md:w-[50%]">
          <p className="input-label py-2">Apellido Materno</p>
          <FormInput
            type="text"
            onChange={(e: any) =>
              setValues({ ...values, motherlastname: e.target.value })
            }
            placeholder="Segundo apellido"
          />
        </div>
      </div>

      <div className="input-group w-full">
        <p className="input-label py-2">
          Fecha de nacimiento <span className="text-primary font-bold">*</span>
        </p>
        <FormInput
          type={"date"}
          min={0}
          onChange={(e: any) => handleage(e.target.value)}
          className="form-control w-full"
        />
        {errors.age.length > 0 && (
          <span className="text-red-500">{errors.age}</span>
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

      <div className="input-group w-full">
        <p className="input-label py-2">
          Teléfono <span className="text-primary font-bold">*</span>
        </p>
        <FormInput
          type="text"
          onChange={(e) => handlephone(e.target.value)}
          placeholder="Teléfono"
        />
        {errors.phone.length > 0 && (
          <span className="text-red-500">{errors.phone}</span>
        )}
      </div>

      <div className="input-group w-full">
        <p className="input-label py-2">Email</p>
        <FormInput
          type="email"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          placeholder="Email"
        />
      </div>

      <div className="input-group w-full">
        <p className="input-label py-2">CURP</p>
        <FormInput
          type="text"
          onChange={(e: any) =>
            setValues({ ...values, curp: e.target.value })
          }
          placeholder="CURP"
        />
      </div>

      <div className="input-group w-full"></div>
    </div>
  );
}
