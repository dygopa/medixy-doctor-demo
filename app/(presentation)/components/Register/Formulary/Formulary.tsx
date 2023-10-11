import { useContext, useMemo, useState } from "react";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { RegisterContext, IRegisterContext } from "../context/RegisterContext";
import { registerFailuresEnum } from "domain/core/failures/register/registerFailure";
import { IStepsContext, StepsContext } from "../Steps/context/StepsContext";
import { twMerge } from "tailwind-merge";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import {
  VALIDATE_EMAIL,
  VALIDATE_NAMES,
  VALIDATE_NUMBERS,
} from "(presentation)/(utils)/errors-validation";

import "react-intl-tel-input/dist/main.css";
import IntlPhoneNumberInput from "(presentation)/components/core/BaseComponents/Intl/IntlPhoneNumberInput/IntlPhoneNumberInput";

export default function Formulary() {
  const { state, actions, dispatch } =
    useContext<IRegisterContext>(RegisterContext);
  const { registerUser, updateRegisterData } = actions;
  const { data, loading, error, successful } = state.registerUser;
  let { data: formData } = state.registerData;

  const {
    state: stepState,
    actions: stepActions,
    dispatch: stepDispatch,
  } = useContext<IStepsContext>(StepsContext);
  const { changeStep } = stepActions;

  let [listOfErrors, setListOfErrors] = useState<Array<String>>([]);

  let [values, setValues] = useState({
    email: formData?.email ?? "",
    names: formData?.names ?? "",
    first_lastname: formData?.first_lastname ?? "",
    second_lastname: formData?.second_lastname ?? "",
    phone_number: formData?.phone_number ?? "",
    pwaProfessionId: 0,
    password: null,
    //curp: formData?.curp ?? "",
  });

  const [errors, setErrors] = useState({
    global: "",
    email: "",
    names: "",
    first_lastname: "",
    second_lastname: "",
    phone_number: "",
    //curp: "",
  });

  let profesions = [
    { id: 8, name: "Bioanalista" },
    { id: 7, name: "Enfermero/a" },
    { id: 4, name: "Farmaceuta" },
    { id: 3, name: "Fisioterapeuta" },
    { id: 1, name: "Médico" },
    { id: 6, name: "Nutriólogo" },
    { id: 2, name: "Odontólogo" },
    { id: 5, name: "Técnico radiólogo" },
  ];

  const [wrongEmail, setWrongEmail] = useState(false);
  const [termsContidions, setTermsContidions] = useState(true);
  const [activePolicy, setActivePolicy] = useState(true);

  const [wrongName, setWrongName] = useState(false);
  const [wrongFirstName, setWrongFirstName] = useState(false);
  const [wrongLastName, setWrongLastName] = useState(false);
  const [inputPassword, setInputPassword] = useState("password");

  /*const viewPassword = () => {
    if (inputPassword === "password") {
      setInputPassword("text");
      return;
    }
    setInputPassword("password");
  };

  const CheckboxComponent = ({
    active,
    customClick,
  }: {
    active: boolean;
    customClick: Function;
  }) => {
    return (
      <div
        onClick={() => {
          customClick();
        }}
        className={twMerge([
          "w-[16px] h-[16px] rounded-md border border-slate-300  cursor-pointer hover:bg-slate-300 transition text-white",
          active ? "bg-primary" : "bg-white",
        ])}
      >
        {active && <FiCheck />}
      </div>
    );
  };*/

  const handlename = (value: string, e: any) => {
    setValues({ ...values, names: value });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          names: "El nombre es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          names: "El nombre solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, names: "" });
    return false;
  };

  const handlelastname = (value: string) => {
    setValues({ ...values, first_lastname: value });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          first_lastname: "El apellido es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          first_lastname: "El apellido solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, first_lastname: "" });
    return false;
  };

  const handlephone = (value: string, isValid: boolean) => {
    setValues({ ...values, phone_number: value.trim() });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone_number: "El teléfono es obligatorio",
        };
      });
      return true;
    }
    if (!isValid) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          phone_number:
            "El teléfono no tiene un formato correcto (33 1234 5678)",
        };
      });
      return true;
    }
    if (!VALIDATE_NUMBERS(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone_number: "El teléfono solo debe incluir números",
        };
      });
      return true;
    }
    setErrors({ ...errors, phone_number: "" });
    return false;
  };

  const handleEmail = (value: string) => {
    setValues({ ...values, email: value.trim() });
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

  /*const handlePassword = (value: string) => {
    setValues({ ...values, password: value });
    if (value.length <= 5) {
      setErrors({
        ...errors,
        password: "La contraseña debe contener al menos 6 carácteres",
      });
      return true;
    } else {
      setErrors({ ...errors, password: "" });
      return false;
    }
  };

  const handleage = (value: string) => {
    setValues({ ...values, birth_date: value });
    if (moment().isBefore(new Date(value))) {
      setErrors({
        ...errors,
        birthdate: "La fecha no debe ser mayor a la fecha actual",
      });
      return true;
    }
    setErrors({ ...errors, birthdate: "" });
    return false;
  };

  /*const handleCURP = (value: string) => {
    setValues({ ...values, curp: value.trim() });
    if (values.curp.length <= 9) {
      setErrors({ ...errors, curp: "El CURP debe tener más de 10 caracteres" });
      return true;
    } else {
      setErrors({ ...errors, curp: "" });
    }
  };*/

  const validForm = () => {
    let errorsFieldsCount = 0;

    if (errors.names.length > 0) errorsFieldsCount++;

    if (errors.first_lastname.length > 0) errorsFieldsCount++;

    if (errors.second_lastname.length > 0) errorsFieldsCount++;

    if (errors.phone_number.length > 0) errorsFieldsCount++;

    if (errors.email.length > 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const onSubmit = () => {
    let list: string[] = [];

    values.email === "" && list.push("email");
    //values.password === "" && list.push("password");
    values.names === "" && list.push("names");
    values.first_lastname === "" && list.push("first_lastname");
    values.phone_number === "" && list.push("phone_number");
    //values.curp === "" && list.push("curp");

    setListOfErrors(list);
    if (list.length > 0) {
      console.log(listOfErrors);
      return;
    }
    if (!VALIDATE_EMAIL(values.email)) {
      setWrongEmail(true);
      return;
    } else {
      setWrongEmail(false);
    }

    formData = { ...(formData as Object), ...values, first_service: true };
    registerUser(formData)(dispatch);
    console.log(formData);
  };

  const handleErrors = () => {
    switch (error?.code) {
      case registerFailuresEnum.wrongPassword:
        errors["global"] = "Las credenciales son invalidas";
        break;
      case registerFailuresEnum.tooManyRequest:
        errors["global"] =
          "Se ha excedido el limite de intentos para registrar tu cuenta";
        break;
      case registerFailuresEnum.serverError:
        errors["global"] =
          "Algo no ha salido como se esperaba. Vuelve a intentarlo.";
        break;
      case registerFailuresEnum.emailAlreadyRegistered:
        errors["global"] = "El email ya esta siendo usado por otro proveedor.";
        break;
      case registerFailuresEnum.badGateway:
        errors["global"] =
          "El servidor ha demorado mucho tiempo en responder, vuelve a intentarlo más tarde.";
        break;
      case registerFailuresEnum.curpAlreadyRegistered:
        errors["global"] = "El CURP ya esta registrado por otro proveedor.";
        break;
      default:
        errors["global"] =
          "El servidor ha demorado mucho tiempo en responder, Vuelve a intentarlo más tarde.";
        break;
    }
  };

  const setValuesFormData = () => {
    formData = { ...(formData as Object), ...values };
    updateRegisterData(formData)(dispatch);
  };

  useMemo(() => {
    setValuesFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useMemo(() => {
    if (successful) window.location.reload();
  }, [successful]);

  useMemo(() => {
    if (error) handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div className="lg:w-[60%] md:w-[70%] lg:px-20 md:px-14 sm:px-20 px-8 w-full h-fit flex flex-col justify-between items-center gap-6">
      <AlertComponent
        variant="error"
        show={error !== null}
        description={errors.global}
      />
      <AlertComponent
        variant="success"
        show={successful === true}
        description="Cuenta creada exitosamente."
      />

      <div className="w-full flex flex-col justify-between items-center gap-3 text-center z-30">
        <p className="text-gray-950 font-semibold lg:text-3xl md:text-3xl text-2xl">
          Vamos a crear tu cuenta
        </p>
        <p className="text-gray-500 font-light lg:text-base md:text-base text-md">
          Estas a un paso de completar la creación de tu cuenta
        </p>
      </div>
      {/*<div className="relative w-full">
        <FormInput
          type="text"
          className="w-full py-3 pr-10 bg-white"
          placeholder="Ingresa tu CURP"
          value={values.curp}
          onChange={(e: any) => handleCURP(e.target.value)}
        />
        {errors.curp.length > 0 && (
          <p className="text-red-500">{errors.curp}</p>
        )}
        {!errors.curp && listOfErrors.includes("curp") && (
          <span className="text-red-500 mt-1">Campo requerido</span>
        )}
        <div className="w-full mt-2">
          <Link
            target="_blank"
            href="https://www.gob.mx/curp/"
            className="text-primary font-light lg:text-base md:text-base text-md"
          >
            ¿No sabes cual es tu CURP? Visita este sitio
          </Link>
        </div>
        </div>*/}
      <div className="font-normal text-secondary lg:text-lg md:text-lg text-md">
        ¿Qué profesional de la salud eres?
      </div>
      <div className="relative w-full text-slate-500">
        <FormSelect
          className="form-control w-full bg-white"
          defaultValue={values.pwaProfessionId}
          value={values.pwaProfessionId}
          onChange={(e) =>
            setValues({ ...values, pwaProfessionId: +e.target.value })
          }
        >
          <option value="0" disabled>
            Selecciona tu profesión
          </option>
          {profesions.map((elem, i) => (
            <option key={i} value={elem["id"]}>
              {elem["name"]}
            </option>
          ))}
        </FormSelect>
      </div>
      <div className="font-normal text-secondary lg:text-lg md:text-lg text-md">
        Indícanos tus datos personales
      </div>
      <div className="relative w-full">
        <FormInput
          type="text"
          className="w-full py-3 pr-10 bg-white"
          placeholder="Nombre(s)"
          value={values.names}
          onChange={(e: any) => handlename(e.target.value, e)}
        />
        {errors.names.length > 0 && (
          <div className="mt-1">
            <span className="text-red-500 mt-3">{errors.names}</span>
          </div>
        )}
        {!errors.names && listOfErrors.includes("names") && (
          <div className="mt-1">
            <span className="text-red-500 mt-1">Campo requerido</span>
          </div>
        )}
      </div>
      <div className="relative w-full grid grid-cols-2 justify-between gap-3">
        <div className="relative w-full">
          <FormInput
            type="text"
            className="w-full py-3 pr-10 bg-white"
            placeholder="Primer Apellido"
            value={values.first_lastname}
            onChange={(e: any) => handlelastname(e.target.value)}
          />
          {errors.first_lastname.length > 0 && (
            <div className="mt-1">
              <span className="text-red-500">{errors.first_lastname}</span>
            </div>
          )}
          {!errors.first_lastname &&
            listOfErrors.includes("first_lastname") && (
              <div className="mt-1">
                <span className="text-red-500 mt-1">Campo requerido</span>
              </div>
            )}
        </div>
        <div className="relative w-full">
          <FormInput
            type="text"
            className="w-full py-3 pr-10 bg-white"
            placeholder="Segundo Apellido"
            value={values.second_lastname}
            onChange={(e: any) =>
              setValues({ ...values, second_lastname: e.target.value })
            }
          />
        </div>
      </div>

      <div className="relative w-full">
        <IntlPhoneNumberInput
          preferredCountries={["mx", "US"]}
          onPhoneNumberChange={(isValid, value, countryData, fullNumber) =>
            handlephone(fullNumber, isValid)
          }
          onPhoneNumberBlur={(e) => console.log(e)}
          containerClassName="intl-tel-input w-full"
          inputClassName={twMerge([
            "disabled:bg-white disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900 w-full",
            "[&[readonly]]:bg-white [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
            "transition duration-200 ease-in-out w-full bg-white text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80 py-3 pr-10",
          ])}
          placeholder="33 1234 5678"
        />
        {errors.phone_number.length > 0 && (
          <div className="mt-1">
            <span className="text-red-500 mt-2">{errors.phone_number}</span>
          </div>
        )}
        {!errors.phone_number && listOfErrors.includes("phone_number") && (
          <div className="mt-1">
            <span className="text-red-500 mt-1">Campo requerido</span>
          </div>
        )}
      </div>

      {/*<div className="relative w-full">
        <FormInput
          type={"text"}
          placeholder="Fecha de Nacimiento (No obligatorio)"
          max={moment().format("YYYY-MM-DD")}
          defaultValue={values.birth_date}
          className="w-full py-3 pr-10 bg-white"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          onChange={(e: any) => handleage(e.target.value)}
        />
        {errors.birthdate.length > 0 && (
          <div className="mt-1">
            <span className="text-red-500 mt-2">{errors.birthdate}</span>
          </div>
        )}
        </div>*/}

      <div className="relative w-full">
        <FormInput
          type="email"
          className="w-full py-3 pr-10 bg-white"
          placeholder="Correo electrónico"
          value={values.email}
          onChange={(e: any) => handleEmail(e.target.value)}
        />
        {errors.email.length > 0 && (
          <div className="mt-1">
            <span className="text-red-500">{errors.email}</span>
          </div>
        )}
        {!errors.email && listOfErrors.includes("email") && (
          <div className="mt-1">
            <span className="text-red-500 mt-1">Campo requerido</span>
          </div>
        )}
      </div>

      {/*<div className="relative w-full">
        <FormInput
          type={inputPassword}
          className="w-full py-3 pr-10 bg-white"
          placeholder="Contraseña"
          value={values.password}
          onChange={(e: any) => handlePassword(e.target.value)}
        />
        <Lucide
          icon={inputPassword === "text" ? "EyeOff" : "Eye"}
          className={twMerge([
            "absolute top-4 right-0 w-4 h-4 my-auto mr-3 cursor-pointer transition-all",
            inputPassword === "text" && "text-black",
          ])}
          onClick={(e: any) => {
            viewPassword();
          }}
        />
        {errors.password.length > 0 && (
          <div className="mt-1">
            <span className="text-red-500">{errors.password}</span>
          </div>
        )}
        {!errors.password && listOfErrors.includes("password") && (
          <div className="mt-1">
            <span className="text-red-500 mt-1">Campo requerido</span>
          </div>
        )}
      </div>
      {error && <span className="text-red-500 mt-1">{errors.global}</span>}
      {/*<div className="w-full relative flex flex-col justify-between gap-3 items-start">
        <div className="w-full flex justify-start items-center gap-3">
          <CheckboxComponent
            active={termsContidions}
            customClick={() => {
              setTermsContidions(!termsContidions);
            }}
          />
          <p className="font-light text-sm text-slate-900">
            Acepto los{" "}
            <Link
              target="_blank"
              className="text-primary font-medium underline"
              href="/register"
            >
              terminos y condiciones
            </Link>{" "}
            de la plataforma
          </p>
        </div>
        <div className="w-full flex justify-start items-center gap-3">
          <CheckboxComponent
            active={activePolicy}
            customClick={() => {
              setActivePolicy(!activePolicy);
            }}
          />
          <p className="font-light text-sm text-slate-900">
            Acepto la{" "}
            <Link
              target="_blank"
              className="text-primary font-medium underline"
              href="/register"
            >
              politica de privacidad
            </Link>{" "}
            de la plataforma
          </p>
        </div>
          </div>*/}
      <Button
        onClick={() => !loading && onSubmit()}
        disabled={
          loading ||
          !termsContidions ||
          !activePolicy ||
          validForm() > 0 ||
          values.pwaProfessionId === 0
        }
        variant="primary"
        type="submit"
        className="mt-4 mb-8 w-full"
      >
        {loading ? "Cargando" : "Continuar"}
      </Button>
    </div>
  );
}
