import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function FinishRegister() {

  const [inputPassword, setInputPassword] = useState("password");

  const [values, setValues] = useState({
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    global: "",
  })

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

  return (
    <div className="lg:w-[80%] md:w-[90%] lg:px-20 md:px-14 sm:px-20 px-8 w-full h-fit flex flex-col justify-between items-center gap-6">
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
        </div>
        <Button
          variant="primary"
          type="submit"
          className="mt-4 mb-8 w-full"
        >
          Iniciar Sesión
        </Button>
      </div>
    </div>
  )
}