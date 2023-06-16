import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { Dispatch, SetStateAction } from "react";
import { FiUser } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

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

export default function BasicData({
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
    if (value.length === 0) {
      setErrors((previousState) => {
        return {
          ...previousState,
          age: "Escribe la fecha de nacimiento del paciente",
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
          phone: "Escribe el teléfono del paciente",
        };
      });
      return true;
    }
    setErrors({ ...errors, phone: "" });
    return false;
  };

  console.log(values);

  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-base text-slate-900 pb-2">
            Datos generales
          </p>
        </div>
        <div className="w-full lg:flex justify-between items-center gap-4">
          <div className="lg:w-[30%] flex flex-col justify-center items-center text-center gap-3">
            <input
              accept="image/png, image/jpeg, application/pdf"
              type="file"
              className="hidden"
            />
            <div
              className={twMerge([
                "transition w-[10rem] h-[10rem] rounded-full border flex flex-col justify-center items-center cursor-pointer",
                "hover:bg-slate-200",
              ])}
            >
              <FiUser size={60} />
            </div>
            <p className="text-[13px] text-slate-500 font-medium">
              Recomendado (.png, .jpg, .jpeg)
            </p>
          </div>
          <div className="lg:w-[70%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-start items-center gap-3 lg:mt-0 mt-6">
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Nombre(s)
              </p>
              <FormInput
                type={"text"}
                placeholder="Nombre..."
                defaultValue={values.name}
                min={0}
                className="form-control w-full"
                onChange={(e: any) => handlename(e.target.value)}
              />
              {errors.name.length > 0 && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Apellido paterno
              </p>
              <FormInput
                type={"text"}
                placeholder="Apellido paterno..."
                defaultValue={values.lastname}
                min={0}
                className="form-control w-full"
                onChange={(e: any) => handlelastname(e.target.value)}
              />
              {errors.lastname.length > 0 && (
                <span className="text-red-500">{errors.lastname}</span>
              )}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Apellido materno
              </p>
              <FormInput
                type={"text"}
                placeholder="Apellido materno..."
                defaultValue={values.motherlastname}
                min={0}
                className="form-control w-full"
                onChange={(e: any) =>
                  setValues({ ...values, motherlastname: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                CURP
              </p>
              <FormInput
                type={"text"}
                placeholder="CURP..."
                defaultValue={values.curp}
                onChange={(e: any) =>
                  setValues({ ...values, curp: e.target.value })
                }
                className="form-control w-full"
              />
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Fecha de nacimiento
              </p>
              <FormInput
                type={"date"}
                min={0}
                /*defaultValue={
                  account?.birthDate !== ""
                    ? moment(account?.birthDate).toDate().getDate()
                    : Date.now()
                }*/
                defaultValue={values.birthDate}
                className="form-control w-full"
                onChange={(e: any) => handleage(e.target.value)}
              />
              {errors.age.length > 0 && (
                <span className="text-red-500">{errors.age}</span>
              )}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Sexo
              </p>
              <FormSelect
                className="form-control w-full"
                defaultValue={values.sex}
                value={values.sex}
                onChange={(e: any) =>
                  setValues({ ...values, sex: parseInt(e.target.value, 10) })
                }
              >
                <option value={0}>No Especificado</option>
                <option value={1}>Femenino</option>
                <option value={2}>Masculino</option>
              </FormSelect>
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Género
              </p>
              <FormSelect
                value={values?.gender}
                className="form-control w-full"
                onChange={(e) =>
                  setValues({ ...values, gender: +e.target.value })
                }
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
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                País nacimiento
              </p>
              <FormSelect
                className="form-control w-full"
                defaultValue={values.country}
                value={values.country}
                onChange={(e: any) =>
                  setValues({ ...values, country: e.target.value })
                }
              >
                <option value="">Tu pais de nacimiento</option>
                <option value="MEX">México</option>
              </FormSelect>
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Email
              </p>
              <FormInput
                type="email"
                defaultValue={values.email}
                placeholder="Correo Electrónico"
                min={0}
                className="form-control w-full"
                onChange={(e: any) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Teléfono
              </p>
              <FormInput
                type="tel"
                placeholder="Número de teléfono"
                min={0}
                defaultValue={values.phone}
                className="form-control w-full"
                onChange={(e) => handlephone(e.target.value)}
              />
              {errors.phone.length > 0 && (
                <span className="text-red-500">{errors.phone}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
