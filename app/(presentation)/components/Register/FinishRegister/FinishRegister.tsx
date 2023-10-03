import { AuthContext, IAuthContext } from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IRegisterContext, RegisterContext } from "../context/RegisterContext";

export default function FinishRegister() {
  const { state, actions, dispatch } = useContext<IAuthContext>(AuthContext);
  const { getUserAuthenticated } = actions;
  const { data, loading, error, successful } = state.getUserAuthenticated;

  const { state: stateRegister, actions: actionsRegister, dispatch: dispatchRegister } =
    useContext<IRegisterContext>(RegisterContext);
  const { updatePassword } = actionsRegister;
  const { data: dataRegister, loading: loadingRegister, error: errorRegister, successful: successfulRegister } = stateRegister.registerUser;

  const [inputPassword, setInputPassword] = useState("password");
  const [load, setLoad] = useState(false);

  const [values, setValues] = useState({
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    global: "",
  })

  const setValuesInitial = () => {
    setValues({...values, email: data.email})
  }

  useMemo(() => {
    if(successful) setValuesInitial()
  }, [successful])

  const viewPassword = () => {
    if (inputPassword === "password") {
      setInputPassword("text");
      return;
    }
    setInputPassword("password");
  };

  const handlePassword = (value: string) => {
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

  useEffect(() => {
    if(load) {
      getUserAuthenticated()(dispatch)
    }
    setLoad(false)
  })

  useMemo(() => {
    if(!data.userId) window.location.href = "/login"
  },[data])

  useMemo(() => {
    if(successfulRegister) window.location.href = "/dashboard"
  },[successfulRegister])

  if(!data.userId) return <div />

  return (
    <div className="lg:w-[80%] md:w-[90%] lg:px-20 md:px-14 sm:px-20 px-8 w-full h-fit flex flex-col justify-between items-center gap-6">
      <AlertComponent
        variant="success"
        show={successfulRegister === true}
        description="Contraseña guardado con éxito. Redireccionando a tu cuenta..."
      />
      <p className="text-primary font-normal lg:text-base md:text-base text-md">
        ¡Felicidades, ya te registraste en Prosit!
      </p>
      <p className="text-gray-950 font-semibold text-center lg:text-3xl md:text-3xl text-2xl">
        Inicia sesión para completar tu perfil y recibe un regalo por un valor de $2,500.00 pesos
      </p>
      <div className="w-full md:w-[70%] flex flex-col justify-between gap-3">
        <div className="text-primary font-normal lg:text-base md:text-base text-md">
          Confirma tu correo electrónico
        </div>
        <FormInput
          type="email"
          className="w-full py-3 pr-10 bg-white"
          placeholder="Correo Electrónico"
          value={values.email}
          disabled
          //value={values.email}
        />
        <div className="text-primary font-normal mt-3 lg:text-base md:text-base text-md">
          Crea tu contraseña
        </div>
        <div className="relative w-full">
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
        </div>
        <Button
          variant="primary"
          type="submit"
          className="mt-4 mb-8 w-full"
          onClick={() => updatePassword({password: values.password})(dispatchRegister)}
        >
          {loadingRegister ? "Guardando la contraseña..." : "Iniciar Sesión"}
        </Button>
      </div>
    </div>
  )
}