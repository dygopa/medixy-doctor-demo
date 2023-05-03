import { useContext, useEffect, useMemo, useState } from "react";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { FormularyContext, IFormularyContext } from "./context/FormularyContext";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import { AuthFailure, authFailuresEnum } from "domain/core/failures/auth/authFailure";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";

export default function Formulary() {
  const { state, actions, dispatch } = useContext<IFormularyContext>(FormularyContext);
  const { signInUser } = actions;
  const { data, loading, error, successful } = state.signInUser;

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    global: "",
    email: "",
    password: "",
  })

  const handleEmail = (value: string) => {
    setErrors({ ...errors, global: "" });

    if (value.length <= 2) {
      setErrors({ ...errors, email: "El correo debe contener más de 2 carácteres" })
    } else {
      setErrors({ ...errors, email: "" })
    }
    
    setValues({ ...values, email: value });
  }

  const handlePassword = (value: string) => {
    setErrors({ ...errors, global: "" });

    if (value.length <= 2) {
      setErrors({ ...errors, password: "La contraseña debe contener más de 2 carácteres" })
    } else {
      setErrors({ ...errors, password: "" })
    }
    
    setValues({ ...values, password: value });
  }

  const onSubmit = (e: any) => {
    e.preventDefault();

    handleEmail(values.email);
    handlePassword(values.password);

    if (errors.password.length !== 0 || errors.email.length !== 0) {
      return;
    } 

    signInUser({ email: values.email, password: values.password })(dispatch);
  }

  const handleErrors = () => {
    switch (error?.code) {
      case authFailuresEnum.wrongPassword:
        setErrors({ ...errors, global: "Las credenciales son invalidas" })
        break;
      case authFailuresEnum.userNotFound:
        setErrors({ ...errors, global: "Las credenciales son invalidas" })
        break;
      case authFailuresEnum.tooManyRequest:
        setErrors({ ...errors, global: "Se ha excedido el limite de intentos de inicio de sesión" })
        break;
      case authFailuresEnum.serverError:
        setErrors({ ...errors, global: "Algo no ha salido como se esperaba. Vuelve a intentarlo." })
        break;
    
      default:
        break;
    }
  }

  useMemo(() => {
    if (successful) window.location.href = "/dashboard";
  }, [successful])

  useMemo(() => {
    if (error) handleErrors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <form onSubmit={(e: any) => onSubmit(e)} className="w-full relative">
      <AlertComponent variant="error" show={errors.global !== ""} description={errors.global} />
      <AlertComponent variant="success" show={successful === true} description="Redireccionando a tu cuenta..." />
      <div className="mb-3">
        <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
          Inicio de sesión
        </h2>
      </div>
      <div className="mb-8">
        <span className="font-light text-lg">
          Escribe tus credenciales para acceder al panel de proveedores
        </span>
      </div>
      <div className="mb-4">
        <div className="relative w-full text-slate-500 mr-6">
          <FormInput
            type="text"
            className="w-full py-3 pr-10"
            placeholder="Correo electrónico"
            value={values.email}
            onChange={(e: any) => handleEmail(e.target.value)}
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
            onChange={(e: any) => handlePassword(e.target.value)}
          />
          <Lucide
            icon="Lock"
            className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
          {errors.password.length > 0 && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>
        <div className="mt-2">
          <span className="text-danger"></span>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" />
      </div>
      <Button disabled={loading} variant="primary" type="submit" className="py-3 px-8 mb-4">
        {loading ? (
          "Cargando"
        ) : (
          "Acceder a mi cuenta"
        )}
        
      </Button>
    </form>
  );
}
