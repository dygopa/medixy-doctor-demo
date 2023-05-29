import {
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { RegisterContext, IRegisterContext } from "../context/RegisterContext";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import {
  RegisterFailure,
  registerFailuresEnum,
} from "domain/core/failures/register/registerFailure";
import { IStepsContext, StepsContext } from "../Steps/context/StepsContext";
import { IRegister } from "domain/core/entities/registerEntity";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { FiCheck } from "react-icons/fi";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import {
  VALIDATE_EMAIL,
  VALIDATE_STRING,
} from "(presentation)/(utils)/errors-validation";

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
    password: formData?.password ?? "",
    names: formData?.names ?? "",
    first_lastname: formData?.first_lastname ?? "",
    second_lastname: formData?.second_lastname ?? "",
    phone_number: formData?.phone_number ?? "",
  });

  const [errors, setErrors] = useState({
    global: "",
    email: "",
    password: "",
    names: "",
    first_lastname: "",
    second_lastname: "",
    phone_number: "",
  });

  const [wrongEmail, setWrongEmail] = useState(false);
  const [termsContidions, setTermsContidions] = useState(false);
  const [activePolicy, setActivePolicy] = useState(false);

  const [wrongName, setWrongName] = useState(false);
  const [wrongFirstName, setWrongFirstName] = useState(false);
  const [wrongLastName, setWrongLastName] = useState(false);

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
  };

  const handleEmail = (value: string) => {
    if (value.length <= 2) {
      setErrors({
        ...errors,
        email: "El correo debe contener más de 2 carácteres",
      });
      return true;
    } else {
      setErrors({ ...errors, email: "" });
      return false;
    }
  };

  const handlePassword = (value: string) => {
    if (value.length <= 2) {
      setErrors({
        ...errors,
        password: "La contraseña debe contener más de 2 carácteres",
      });
      return true;
    } else {
      setErrors({ ...errors, password: "" });
      return false;
    }
  };

  const onSubmit = () => {
    let list: string[] = [];

    values.email === "" && list.push("email");
    values.password === "" && list.push("password");
    values.names === "" && list.push("names");
    values.first_lastname === "" && list.push("first_lastname");
    values.phone_number === "" && list.push("phone_number");

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

    formData = { ...(formData as Object), ...values };
    registerUser(formData)(dispatch);
    console.log(formData);
  };

  const handleErrors = () => {
    switch (error?.code) {
      case registerFailuresEnum.wrongPassword:
        setErrors({ ...errors, global: "Las credenciales son invalidas" });
        break;
      case registerFailuresEnum.tooManyRequest:
        setErrors({
          ...errors,
          global:
            "Se ha excedido el limite de intentos para registrar tu cuenta",
        });
        break;
      case registerFailuresEnum.serverError:
        setErrors({
          ...errors,
          global: "Algo no ha salido como se esperaba. Vuelve a intentarlo.",
        });
        break;
      case registerFailuresEnum.emailAlreadyRegistered:
        setErrors({
          ...errors,
          global: "El email ya esta siendo usado por otro proveedor.",
        });
        break;
      case registerFailuresEnum.curpAlreadyRegistered:
        setErrors({
          ...errors,
          global: "El CURP ya esta registrado por otro proveedor.",
        });
        break;
      default:
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
    if (successful) window.location.href = "/dashboard";
  }, [successful]);

  useMemo(() => {
    if (error) handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  console.log(error);
  console.log(errors);

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
        description="Cuenta creada exitosamente, redireccionando a tu cuenta..."
      />

      <div className="w-full flex flex-col justify-between items-center gap-3 text-center z-30">
        <p className="text-gray-950 font-semibold lg:text-3xl md:text-3xl text-2xl">
          Vamos a crear tu cuenta
        </p>
        <p className="text-gray-500 font-light lg:text-base md:text-base text-md">
          Estas a un paso de completar la creación de tu cuenta
        </p>
      </div>
      <div className="relative w-full">
        <FormInput
          type="text"
          className="w-full py-3 pr-10"
          placeholder="Jose"
          value={values.names}
          onChange={(e: any) => setValues({ ...values, names: e.target.value })}
        />
        {wrongName && (
          <span className="text-red-500 mt-1">
            El nombre no puede contener números
          </span>
        )}
        {listOfErrors.includes("names") && (
          <span className="text-red-500 mt-1">Campo requerido</span>
        )}
      </div>
      <div className="relative w-full grid grid-cols-2 justify-between items-center gap-3">
        <div className="relative w-full">
          <FormInput
            type="text"
            className="w-full py-3 pr-10"
            placeholder="Ramirez"
            value={values.first_lastname}
            onChange={(e: any) =>
              setValues({ ...values, first_lastname: e.target.value })
            }
          />
          {wrongFirstName && (
            <span className="text-red-500 mt-1">
              El primer apellido no puede contener números
            </span>
          )}
          {listOfErrors.includes("first_lastname") && (
            <span className="text-red-500 mt-1">Campo requerido</span>
          )}
        </div>
        <div className="relative w-full">
          <FormInput
            type="text"
            className="w-full py-3 pr-10"
            placeholder="Ortiz"
            value={values.second_lastname}
            onChange={(e: any) =>
              setValues({ ...values, second_lastname: e.target.value })
            }
          />
        </div>
      </div>
      <div className="relative w-full">
        <FormInput
          type="text"
          className="w-full py-3 pr-10"
          placeholder="+00 000-000-0000"
          value={values.phone_number}
          onChange={(e: any) =>
            setValues({ ...values, phone_number: e.target.value })
          }
        />
        {listOfErrors.includes("phone_number") && (
          <span className="text-red-500 mt-1">Campo requerido</span>
        )}
      </div>
      <div className="relative w-full">
        <FormInput
          type="text"
          className="w-full py-3 pr-10"
          placeholder="Correo electrónico"
          value={values.email}
          onChange={(e: any) => setValues({ ...values, email: e.target.value })}
        />
        {listOfErrors.includes("email") && (
          <span className="text-red-500 mt-1">Campo requerido</span>
        )}
        {wrongEmail && (
          <span className="text-red-500 mt-1">El email debe ser correcto</span>
        )}
      </div>

      <div className="relative w-full">
        <FormInput
          type="password"
          className="w-full py-3 pr-10"
          placeholder="Contraseña"
          value={values.password}
          onChange={(e: any) =>
            setValues({ ...values, password: e.target.value })
          }
        />
        {listOfErrors.includes("password") && (
          <span className="text-red-500 mt-1">Campo requerido</span>
        )}
      </div>
      {error && <span className="text-red-500 mt-1">{errors.global}</span>}
      <div className="w-full relative flex flex-col justify-between gap-3 items-start">
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
              className="text-primary font-medium  pointer-events-none underline"
              href="#"
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
            Acepto los{" "}
            <Link
              target="_blank"
              className="text-primary font-medium  pointer-events-none underline"
              href="#"
            >
              politica de privacidad
            </Link>{" "}
            de la plataforma
          </p>
        </div>
      </div>
      <Button
        onClick={() => !loading && onSubmit()}
        disabled={loading || !termsContidions || !activePolicy}
        variant="primary"
        type="submit"
        className="mt-4 mb-8 w-full"
      >
        {loading ? "Cargando" : "Continuar"}
      </Button>
    </div>
  );
}
