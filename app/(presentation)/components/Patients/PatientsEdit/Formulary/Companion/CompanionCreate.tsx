import { VALIDATE_EMAIL, VALIDATE_NAMES } from "(presentation)/(utils)/errors-validation";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import React, { useContext, useEffect, useMemo } from "react";
import { EditPatientContext, IEditPatientContext } from "../../context/EditPatientContext";

interface IBasicDataProps {
  setNewCompanion: any;
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
    countryLocation: number;
    city: string;
    direction: string;
    street: string;
  };
  setValues: any;
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
  setErrors: any;
}

export default function CompanionCreate({
  setNewCompanion,
  values,
  setValues,
  errors,
  setErrors,
}: IBasicDataProps) {
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

  const handlename = (value: string) => {
    setValues({ ...values, name: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          name: "El nombre del paciente es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
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
      setErrors((previousState: any) => {
        return {
          ...previousState,
          lastname: "El apellido del paciente es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
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

  const handleage = (value: string) => {
    setValues({ ...values, birthDate: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
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
      setErrors((previousState: any) => {
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

  const handleEmail = (value: string) => {
    setValues({ ...values, email: value });
    if (values.email.length > 1) {
      if (!VALIDATE_EMAIL(values.email)) {
        setErrors({ ...errors, email: "El email debe ser correcto" });
        return true;
      }
    }
    setErrors({ ...errors, email: "" });
    return false;
  };

  return (
    <>
      <div
        className="flex justify-start gap-3 items-center lg:w-[40%] cursor-pointer"
        onClick={() => setNewCompanion(false)}
      >
        <Lucide icon="ChevronLeft" className="w-4 h-4" />
        <p className="text-base text-slate-500 pb-2">
          Volver a la lista de Contactos
        </p>
      </div>
      <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-lg text-slate-900 pb-2">
            Nuevo Contacto
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
            Fecha de nacimiento{" "}
            <span className="text-primary font-bold">*</span>
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
          <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
            Género
          </p>
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
            onChange={(e) => handleEmail(e.target.value)}
            placeholder="Email"
          />
          {errors.email.length > 0 && (
            <span className="text-red-500">{errors.email}</span>
          )}
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

        <div className="md:flex gap-3 w-full">
          <div className="input-group md:w-[50%]">
            <p className="input-label py-2">
              Entidad Federativa
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
          </div>
          <div className="input-group mt-3 md:mt-0 md:w-[50%]">
            <p className="input-label py-2">Municipio</p>
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
        </div>

        <div className="md:flex gap-3 w-full">
          <div className="input-group md:w-[50%]">
            <p className="input-label py-2">
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
          <div className="input-group mt-3 md:mt-0 md:w-[50%]">
            <p className="input-label py-2">Ciudad</p>
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
        </div>
        <div className="input-group w-full">
          <p className="input-label py-2">Dirección</p>
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
    </>
  );
}
