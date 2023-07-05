import { useContext, useEffect, useMemo, useState } from "react";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { VALIDATE_EMAIL } from "(presentation)/(utils)/errors-validation";

export default function Formulary() {

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    global: "",
    email: "",
    password: "",
  });

  const handleEmail = () => {
    let hasError = false;

    if (values.email.length < 6) {
      setErrors({
        ...errors,
        email: "El correo debe contener más de 6 carácteres",
      });
      hasError = true;
    }
    if (!VALIDATE_EMAIL(values.email)) {
      setErrors({ ...errors, email: "El email debe ser correcto" });
      hasError = true;
    } else {
      errors["email"] = "";
    }

    console.log(values.email, errors);

    return hasError;
  };

  const handlePassword = () => {
    if (values.password.length < 6) {
      setErrors({
        ...errors,
        password: "La contraseña debe contener más de 6 carácteres",
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
    window.location.href = "/admin/dashboard";
  };

  /*const handleErrors = () => {
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
            "El servidor ha demorado mucho tiempo en responder, Vuelve a intentarlo más tarde.",
        });
        break;
    }
  };

  useMemo(() => {
    if (successful) redirect("/admin/dashboard");
  }, [successful]);

  useMemo(() => {
    if (error) handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);*/

  return (
    <form onSubmit={(e: any) => onSubmit(e)} className="w-full relative">
      {/*<AlertComponent
        variant="error"
        show={error !== null}
        description={errors.global}
      />
      <AlertComponent
        variant="success"
        show={successful === true}
        description="Redireccionando a tu cuenta..."
      />*/}
      <div className="w-full mx-auto flex flex-col justify-center items-center gap-2 mb-8 text-center">
        <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
          Panel administrativo
        </h2>
        <span className="font-light text-lg text-center">
          Escribe tus credenciales para acceder al panel administrativo
        </span>
      </div>
      <div className="mb-4">
        <div className="relative w-full text-slate-500 mr-6">
          <FormInput
            type="text"
            className="w-full py-3 pr-10"
            placeholder="Correo electrónico"
            value={values.email}
            onChange={(e: any) =>
              setValues({ ...values, email: e.target.value })
            }
          />
          <Lucide
            icon="AtSign"
            className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
          {errors.email.length > 0 && (
            <span className="text-red-500">{errors.email}</span>
          )}
        </div>
        <div className="mt-2">
          <span className="text-danger"></span>
        </div>
      </div>
      <div className="mb-5">
        <div className="relative w-full text-slate-500 mr-6">
          <FormInput
            type="password"
            className="w-full py-3 pr-10"
            placeholder="Contraseña"
            value={values.password}
            onChange={(e: any) =>
              setValues({ ...values, password: e.target.value })
            }
          />
          <Lucide
            icon="Lock"
            className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
        </div>

        <div className="mt-2">
          <span className="text-danger"></span>
          {errors.password.length > 0 && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 text-center mt-8">
        <Button
          disabled={values.password === "" || values.email === ""}
          variant="primary"
          type="submit"
          className="w-full py-2"
        >
          Acceder a mi cuenta
        </Button>
      </div>
    </form>
  );
}