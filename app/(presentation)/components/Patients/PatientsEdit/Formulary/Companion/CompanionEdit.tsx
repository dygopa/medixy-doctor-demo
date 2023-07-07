import {
  VALIDATE_EMAIL,
  VALIDATE_NAMES,
  VALIDATE_NUMBERS,
} from "(presentation)/(utils)/errors-validation";
import AutocompleteInputStates from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputStates/AutocompleteInputStates";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { FiUser } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import {
  EditPatientContext,
  IEditPatientContext,
} from "../../context/EditPatientContext";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { getCountriesDialCodeES } from "(presentation)/(helper)/intl/intlHelper";
import IntlPhoneNumberInput from "(presentation)/components/core/BaseComponents/Intl/IntlPhoneNumberInput/IntlPhoneNumberInput";
import moment from "moment";

interface IEditProps {
  companionEdit: ISubject;
  setCompanionEdit: Dispatch<SetStateAction<ISubject | null>>;
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

export default function CompanionEdit({
  companionEdit,
  setCompanionEdit,
  values,
  setValues,
  errors,
  setErrors,
}: IEditProps) {
  const { state, actions, dispatch } =
    useContext<IEditPatientContext>(EditPatientContext);
  const { getFederalEntities, getMunicipalities, getCountryLocations } =
    actions;
  const { data: federalEntities } = state.getFederalEntities;
  const { data: municipalities, successful } = state.municipalities;
  const { data: countryLocations } = state.countryLocations;

  useEffect(() => {
    getFederalEntities()(dispatch);
  }, []);

  useEffect(() => {
    getMunicipalities({
      federalEntityId: values.federalEntity,
    })(dispatch);
  }, [values.federalEntity]);

  useMemo(() => {
    if (successful) {
      if (municipalities.data.length > 0) {
        const municipalitySearch = municipalities.data.find((elem) => {
          return elem.id === values.municipality;
        });
        getCountryLocations({
          federalEntityId: values.federalEntity,
          municipalityId: municipalitySearch?.catalogId,
        })(dispatch);
      }
    }
  }, [values.federalEntity, values.municipality, successful]);

  const setInitialValues = () => {
    setValues({
      ...values,
      name: companionEdit?.name ?? "",
      lastname: companionEdit?.lastName ?? "",
      motherlastname: companionEdit?.motherLastName ?? "",
      curp: companionEdit?.curp ?? "",
      sex: companionEdit?.sex ?? 0,
      gender: companionEdit?.gender ?? 0,
      email: companionEdit?.email ?? "",
      birthDate: companionEdit?.birthDate ?? "",
      phone: companionEdit?.phoneNumber ?? "",
      country: companionEdit?.country ?? "",
      federalEntity: companionEdit.federativeEntityId ?? 0,
      municipality: companionEdit.municipalityId ?? 0,
      countryLocation: companionEdit.countryLocationId ?? 0,
      street: companionEdit.street ?? "",
      city: companionEdit?.city ?? "",
      direction: companionEdit?.address ?? "",
    });
  };

  useEffect(() => {
    getFederalEntities()(dispatch);
    setInitialValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlename = (value: string) => {
    setValues({ ...values, name: value });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          name: "El nombre del contacto es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          name: "El nombre del contacto solo debe incluir letras",
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
          lastname: "El apellido del contacto es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          lastname: "El apellido del contacto solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, lastname: "" });
    return false;
  };

  const handleage = (value: string) => {
    setValues({ ...values, birthDate: value });

    let day = new Date()
    let birthdate= new Date(value);
    let age = day.getFullYear() - birthdate.getFullYear();
    let month = day.getMonth() - birthdate.getMonth();

    if (month < 0 || (month === 0 && day.getDate() < birthdate.getDate())) {
      age--
    }
    
    if(age <= 15) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          age: "El contacto debe tener al menos 15 años",
        };
      });
      return true;
    }

    if (value.length === 0) {
      setErrors((previousState) => {
        return {
          ...previousState,
          age: "Escribe la fecha de nacimiento del contacto",
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
          phone: "El teléfono del contacto es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NUMBERS(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del contacto solo lleva números",
        };
      });
      return true;
    }
    setErrors({ ...errors, phone: "" });
    return false;
  };

  const returnListCompanion = () => {
    setCompanionEdit(null);
    return;
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
        onClick={() => returnListCompanion()}
      >
        <Lucide icon="ChevronLeft" className="w-4 h-4" />
        <p className="text-base text-slate-500 py-2">
          Volver a la lista de Contactos
        </p>
      </div>
      <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
        <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
          <div className="w-full border-b mb-2">
            <p className="font-medium text-base text-slate-900 pb-2">
              Datos generales del Contacto
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
                  Primer apellido
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Primer apellido..."
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
                  Segundo apellido
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Segundo apellido..."
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
                  max={moment().format("YYYY-MM-DD")}
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
                  onChange={(e) => handleEmail(e.target.value)}
                />
                {errors.email.length > 0 && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col justify-between items-start relative gap-1">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Teléfono
                </p>
                <IntlPhoneNumberInput
                  preferredCountries={["mx", "US"]}
                  defaultValue={values.phone}
                  value={values.phone}
                  onPhoneNumberChange={(
                    isValid,
                    value,
                    countryData,
                    fullNumber
                  ) => handlephone(fullNumber)}
                  onPhoneNumberBlur={(e) => console.log(e)}
                  containerClassName="intl-tel-input w-full"
                  inputClassName={twMerge([
                    "disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900 w-full",
                    "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                    "transition duration-200 ease-in-out w-full bg-gray-100 text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80",
                  ])}
                />
                {errors.phone.length > 0 && (
                  <span className="text-red-500">{errors.phone}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
        <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
          <div className="w-full border-b mb-2">
            <p className="font-medium text-base text-slate-900 pb-2">
              Dirección
            </p>
          </div>
          <div className="w-full md:grid md:grid-cols-2 grid-cols-1 justify-start items-center gap-3">
            <div className="md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Entidad Federativa{" "}
                <span className="text-primary font-bold">*</span>
              </p>
              <FormSelect
                className="form-control w-full"
                defaultValue={values.federalEntity}
                value={values.federalEntity}
                onChange={(e: any) =>
                  setValues({
                    ...values,
                    federalEntity: parseInt(e.target.value),
                  })
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
                  setValues({
                    ...values,
                    municipality: parseInt(e.target.value),
                  })
                }
              >
                {municipalities.data?.map((elem: IMunicipality) => (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                ))}
              </FormSelect>
            </div>
            <div className="md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Localidad
              </p>
              <FormSelect
                className="form-control w-full"
                disabled={
                  values.municipality === 0 || values.federalEntity === 0
                }
                defaultValue={values.countryLocation}
                value={values.countryLocation}
                onChange={(e: any) =>
                  setValues({
                    ...values,
                    countryLocation: parseInt(e.target.value),
                  })
                }
              >
                {countryLocations.data?.map((elem: ICountryLocation) => (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                ))}
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
            {/*<div className="flex col-span-2 flex-col justify-between items-start relative gap-1">
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
              </div>*/}
          </div>
        </div>
      </div>
    </>
  );
}
