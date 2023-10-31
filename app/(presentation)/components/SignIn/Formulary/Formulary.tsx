import { useContext, useEffect, useMemo, useState } from "react";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import {
  FormularyContext,
  IFormularyContext,
} from "./context/FormularyContext";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import {
  AuthFailure,
  authFailuresEnum,
} from "domain/core/failures/auth/authFailure";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Link from "next/link";
import { VALIDATE_EMAIL } from "(presentation)/(utils)/errors-validation";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { EmailValidator } from "(presentation)/(validators)/emailValidator";
import { PasswordValidator } from "(presentation)/(validators)/passwordValidator";

export default function Formulary() {
  const { state, actions, dispatch } =
    useContext<IFormularyContext>(FormularyContext);
  const { signInUser } = actions;
  const { data, loading, error, successful } = state.signInUser;

  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [inputPassword, setInputPassword] = useState("password");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    global: "",
    email: "",
    password: "",
  });

  const onShowAlertSuccess = () => {
    setShowAlertSuccess(true);

    setTimeout(() => {
      setShowAlertSuccess(false);
    }, 6000);
  };

  useEffect(() => {
    if (from && from === "recovery-password") onShowAlertSuccess();
  }, [from]);

  const handleEmail = () => {
    let hasError = false;

    if (!new EmailValidator(values.email).validate_min_length().isValid) {
      setErrors({
        ...errors,
        email:
          new EmailValidator(values.email).validate_min_length().error
            ?.message ?? "",
      });
      hasError = true;
    }

    if (!new EmailValidator(values.email).validate_regexp().isValid) {
      setErrors({
        ...errors,
        email:
          new EmailValidator(values.email).validate_regexp().error?.message ??
          "",
      });
      hasError = true;
    } else {
      errors["email"] = "";
    }

    console.log(values.email, errors);

    return hasError;
  };

  const handlePassword = () => {
    if (!new PasswordValidator(values.password).validate_min_length().isValid) {
      setErrors({
        ...errors,
        password:
          new PasswordValidator(values.password).validate_min_length().error
            ?.message ?? "",
      });
      return true;
    } else {
      setErrors({ ...errors, password: "" });
      return false;
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (handleEmail() || handlePassword()) {
      return;
    }

    signInUser({
      email: values.email.toLowerCase(),
      password: values.password,
    })(dispatch);
  };

  const handleErrors = () => {
    switch (error?.code) {
      case authFailuresEnum.wrongPassword:
        setErrors({ ...errors, global: "Las credenciales son invalidas" });
        break;
      case authFailuresEnum.userNotFound:
        setErrors({
          ...errors,
          global: "No existe una cuenta con estas credenciales",
        });
        break;
      case authFailuresEnum.tooManyRequest:
        setErrors({
          ...errors,
          global: "Se ha excedido el limite de intentos de inicio de sesión",
        });
        break;
      case authFailuresEnum.badGateway:
        setErrors({
          ...errors,
          global:
            "El servidor ha demorado mucho tiempo en responder, Vuelve a intentarlo más tarde.",
        });
        break;
      case authFailuresEnum.serverError:
        setErrors({
          ...errors,
          global: "Algo no ha salido como se esperaba. Vuelve a intentarlo.",
        });
        break;
      default:
        setErrors({
          ...errors,
          global:
            "El servidor ha demorado mucho tiempo en responder. Vuelve a intentarlo más tarde.",
        });
        break;
    }
  };

  const viewPassword = () => {
    if (inputPassword === "password") {
      setInputPassword("text");
      return;
    }
    setInputPassword("password");
  };

  useMemo(() => {
    if (successful) window.location.href = "/dashboard";
  }, [successful]);

  useMemo(() => {
    if (error) handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <form onSubmit={(e: any) => onSubmit(e)} className="w-full relative">
      <AlertComponent
        variant="error"
        show={error !== null}
        description={errors.global}
      />
      <AlertComponent
        variant="success"
        show={successful === true}
        description="Redireccionando a tu cuenta..."
      />
      <AlertComponent
        variant="success"
        show={showAlertSuccess}
        description="¡Se ha reestablecido tu contraseña satisfactoriamente!"
      />
      <div className="w-[70%] mx-auto flex flex-col justify-center items-center gap-2 mb-8 text-center">
        <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
          Inicio de sesión
        </h2>
        <span className="font-light text-lg text-center">
          Escribe tus credenciales para acceder al panel de proveedores
        </span>
      </div>
      <div className="mb-4">
        <div className="relative w-full text-slate-500 mr-6">
          <FormInput
            type="text"
            className="w-full py-3 pr-10"
            placeholder="Correo Electrónico"
            value={values.email}
            onFocus={(e: any) =>
              setValues({ ...values, email: e.target.value })
            }
            onBlur={(e: any) => setValues({ ...values, email: e.target.value })}
            onChange={(e: any) =>
              setValues({ ...values, email: e.target.value })
            }
          />
          <Lucide
            icon="AtSign"
            className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
          {errors.email.length > 0 && (
            <div className="mt-1">
              <span className="text-red-500">{errors.email}</span>
            </div>
          )}
        </div>
        <div className="mt-2">
          <span className="text-danger"></span>
        </div>
      </div>
      <div className="mb-5">
        <div className="relative w-full text-slate-500 mr-6">
          <FormInput
            type={inputPassword}
            className="w-full py-3 pr-10"
            placeholder="Contraseña"
            value={values.password}
            onFocus={(e: any) =>
              setValues({ ...values, password: e.target.value })
            }
            onBlur={(e: any) =>
              setValues({ ...values, password: e.target.value })
            }
            onChange={(e: any) =>
              setValues({ ...values, password: e.target.value })
            }
          />
          <Lucide
            icon="Lock"
            className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
          <Lucide
            icon={inputPassword === "text" ? "EyeOff" : "Eye"}
            className={twMerge([
              "absolute inset-y-0 right-7 w-4 h-4 my-auto mr-3 cursor-pointer transition-all",
              inputPassword === "text" && "text-black",
            ])}
            onClick={(e: any) => {
              viewPassword();
            }}
          />
        </div>

        <div className="mt-2">
          <span className="text-danger"></span>
          {errors.password.length > 0 && (
            <div className="mt-1">
              <span className="text-red-500">{errors.password}</span>
            </div>
          )}
        </div>
      </div>
      <div className="text-end">
        <Link
          className="text-base text-primary font-light"
          href="/recovery-password"
        >
          ¿Olvidaste tu <span className="font-semibold">contraseña</span>?
        </Link>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 text-center mt-8">
        <Button
          disabled={loading || values.password === "" || values.email === ""}
          variant="primary"
          type="submit"
          className="w-full py-2"
        >
          {loading ? "Cargando" : "Acceder a mi cuenta"}
        </Button>
        <Link className="text-base text-primary font-light" href="/register">
          No tengo una cuenta,{" "}
          <span className="font-semibold">crear una cuenta</span>
        </Link>
        {/*<Link className="text-base text-primary font-light" href="/invited">
          Soy un invitado, <span className="font-semibold">validarme</span>
          </Link>*/}
      </div>
    </form>
  );
}
