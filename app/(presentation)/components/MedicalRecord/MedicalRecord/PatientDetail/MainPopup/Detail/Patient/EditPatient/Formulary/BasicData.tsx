import {
  VALIDATE_EMAIL,
  VALIDATE_NAMES,
  VALIDATE_NUMBERS,
} from "(presentation)/(utils)/errors-validation";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react";
import { FiUser } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import "react-intl-tel-input/dist/main.css";
import IntlPhoneNumberInput from "(presentation)/components/core/BaseComponents/Intl/IntlPhoneNumberInput/IntlPhoneNumberInput";
import moment from "moment";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "(presentation)/components/MedicalRecord/MedicalRecord/context/MedicalRecordContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IBasicDataProps {
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
    countryLocation: string;
    municipalityCatalogId: number;
    city: string;
    direction: string;
    street: string;
    pictureUrl: string;
    postal_code: string;
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
      countryLocation: string;
      municipalityCatalogId: number;
      city: string;
      direction: string;
      street: string;
      pictureUrl: string;
      postal_code: string;
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

export default function BasicData({
  values,
  setValues,
  errors,
  setErrors,
}: IBasicDataProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { updateAvatar } = actions;
  const {
    data,
    loading,
    error,
    successful: successfulAvatar,
  } = state.updateAvatar;

  const { getCountriesISO } = actions;
  const { data: countriesISO } = state.getCountriesISO;

  const router = useRouter();

  let avatarRef = useRef<HTMLInputElement>(null);

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  async function handleChangeAvatar(e: ChangeEvent<HTMLInputElement>) {
    let file = e.target.files![0] as File;

    let base64 = await toBase64(file);
    let splittedType = file!.type.split("/");
    var base64result = base64?.toString().split(",")[1];

    let obj = {
      id: values.id,
      data: base64result,
      type: `${splittedType[1]}`,
    };

    updateAvatar(obj, values.id)(dispatch);
  }

  const handleClickRef = () => avatarRef.current && avatarRef.current.click();
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
    if (moment().isBefore(new Date(value))) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          age: "La fecha no debe ser mayor a la fecha actual",
        };
      });
      return true;
    }
    setErrors({ ...errors, age: "" });
    return false;
  };

  const handlephone = (value: string, isValid: boolean) => {
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
    if (!isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del contacto no es correcto",
        };
      });
      return true;
    }
    if (!VALIDATE_NUMBERS(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del paciente solo lleva números",
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

  useEffect(() => {
    getCountriesISO()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full bg-white  rounded-md h-fit">
        <div className="w-full rounded-md p-5 flex">
          <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
            <div className="w-full border-b mb-2">
              <p className="font-medium text-base text-slate-900 pb-2">
                Datos generales
              </p>
            </div>
            <div className="w-full lg:flex justify-between items-center gap-4">
              <div className="lg:w-[30%] flex flex-col justify-center items-center text-center gap-3">
                {values?.pictureUrl?.length > 0 ? (
                  <>
                    <div className="w-[150px] h-[150px] relative flex justify-center hover:border hover:border-primary rounded-full">
                      <input
                        accept="image/png, image/jpeg, application/pdf"
                        type="file"
                        ref={avatarRef}
                        className="opacity-0 top-0 h-full z-50 cursor-pointer"
                        onChange={(e) => {
                          handleChangeAvatar(e);
                        }}
                      />
                      <Image
                        className="object-cover rounded-full "
                        src={successfulAvatar ? data : values.pictureUrl}
                        alt=""
                        fill
                      />
                    </div>

                    <p className="text-[13px] text-slate-500 font-medium">
                      Recomendado (.png, .jpg, .jpeg)
                    </p>
                    {loading && (
                      <p className="text-[13px] text-slate-800 font-bold">
                        Guardando su foto de perfil...
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      accept="image/png, image/jpeg, application/pdf"
                      type="file"
                      ref={avatarRef}
                      className="hidden"
                      onChange={(e) => {
                        handleChangeAvatar(e);
                      }}
                    />
                    <div
                      onClick={handleClickRef}
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
                    {loading && (
                      <p className="text-[13px] text-slate-800 font-bold">
                        Guardando su foto de perfil...
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="lg:w-[70%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-start items-center gap-3 lg:mt-0 mt-6">
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Nombre(s) <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Nombres"
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
                    Primer Apellido{" "}
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Primer Apellido"
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
                    Segundo Apellido
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Segundo Apellido"
                    defaultValue={values.motherlastname}
                    min={0}
                    className="form-control w-full"
                    onChange={(e: any) => handleSecondLastname(e.target.value)}
                  />
                  {errors.motherlastname.length > 0 && (
                    <span className="text-red-500">
                      {errors.motherlastname}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    CURP
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="CURP"
                    defaultValue={values.curp}
                    onChange={(e: any) =>
                      setValues({ ...values, curp: e.target.value })
                    }
                    className="form-control w-full"
                  />
                </div>
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Fecha de Nacimiento{" "}
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type={"date"}
                    max={moment().format("YYYY-MM-DD")}
                    defaultValue={values?.birthDate}
                    value={values.birthDate}
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
                      setValues({
                        ...values,
                        sex: parseInt(e.target.value, 10),
                      })
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
                    País Nacimiento
                  </p>
                  <FormSelect
                    className="form-control w-full"
                    defaultValue={values.country}
                    value={values.country}
                    onChange={(e: any) =>
                      setValues({ ...values, country: e.target.value })
                    }
                  >
                    <option value="">Tu pais de Nacimiento</option>
                    {countriesISO.length > 0 &&
                      countriesISO.map((elem) => (
                        <option key={elem.iso} value={elem.iso}>
                          {elem.iso} - {elem.name}
                        </option>
                      ))}
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
                    onChange={(e: any) => handleEmail(e.target.value)}
                  />
                  {errors.email.length > 0 && (
                    <span className="text-red-500">{errors.email}</span>
                  )}
                </div>
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Teléfono <span className="text-primary font-bold">*</span>
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
                    ) => handlephone(fullNumber, isValid)}
                    containerClassName="intl-tel-input w-full"
                    inputClassName={twMerge([
                      "disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900 w-full",
                      "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                      "transition duration-200 ease-in-out w-full bg-gray-100 text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80",
                    ])}
                    placeholder="33 1234 5678"
                  />
                  {errors.phone.length > 0 && (
                    <span className="text-red-500">{errors.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
