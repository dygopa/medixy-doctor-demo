import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import { IUser } from "domain/core/entities/userEntity";
import { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IUserContext, UserContext } from "../../context/UserContext";

interface IFormularyProps {
  account: IUser;
}

export default function Security({ account }: IFormularyProps) {
  const { state, actions, dispatch } = useContext<IUserContext>(UserContext);
  const { updatePassword } = actions;

  const { loading, successful, error } = state.changePasswords;

  const [errors, setErrors] = useState({
    global: "",
    password: "",
    repeatPassword: "",
  });

  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });

  const [inputPassword, setInputPassword] = useState("password");

  const viewPassword = () => {
    if (inputPassword === "password") {
      setInputPassword("text");
      return;
    }
    setInputPassword("password");
  };

  const validForm = () => {
    let errorsFieldsCount = 0;

    if (errors.global.length > 0) errorsFieldsCount++;

    if (errors.password.length > 0) errorsFieldsCount++;

    if (errors.repeatPassword.length > 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const handlePassword = (value: string) => {
    setFormData({ ...formData, password: value });
    if (value.length <= 5) {
      setErrors({
        ...errors,
        password: "La nueva contraseña debe contener al menos 6 carácteres",
      });
      return true;
    } else {
      setErrors({ ...errors, password: "" });
      return false;
    }
  };

  const handlePasswordRepeat = (value: string) => {
    setFormData({ ...formData, repeatPassword: value });
    if (value !== formData.password) {
      setErrors({
        ...errors,
        repeatPassword: "La nueva contraseña no coincide",
      });
      return true;
    } else {
      setErrors({ ...errors, repeatPassword: "" });
      return false;
    }
  };

  return (
    <div>
      <AlertComponent
        variant="error"
        show={error !== null}
        description={"Ha ocurrido un error actualizando la cuenta"}
      />
      <SuccessfulComponent
        tittle="Actualizado con exito"
        show={successful}
        description={"Contraseña actualizada exitosamente"}
      />
      <div className="lg:flex justify-end items-center md:absolute top-[20px] right-5 z-[50]">
        <Button
          variant="primary"
          disabled={
            loading ||
            formData.password === "" ||
            formData.repeatPassword === "" ||
            validForm() > 0
          }
          onClick={() => {
            updatePassword(formData.password)(dispatch);
          }}
          className="px-16 mt-3 md:mt-0 w-full md:w-fit"
        >
          Actualizar contraseña
        </Button>
      </div>

      <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7 pb-12">
        <div className="w-full gap-4">
          <div className="w-full border-b mb-6">
            <p className="font-medium text-base text-slate-900 pb-2">
              Cambiar contraseña
            </p>
          </div>
          <div className="w-full grid md:grid-cols-2 grid-cols-1 justify-start items-start gap-3 lg:mt-0 mt-6">
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Nueva Contraseña
              </p>
              <FormInput
                type={inputPassword}
                placeholder="Escribe tu nueva contraseña"
                min={0}
                className="form-control w-full"
                onChange={(e: any) => handlePassword(e.target.value)}
              />
              <Lucide
                icon={inputPassword === "text" ? "eye-closed" : "eye-outline"}
                className={twMerge([
                  "absolute top-11 right-0 w-4 h-4 my-auto mr-3 cursor-pointer transition-all",
                  inputPassword === "text" && "text-black",
                ])}
                onClick={(e: any) => {
                  viewPassword();
                }}
              />
              {errors.password.length > 0 && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Repite la nueva contraseña
              </p>
              <FormInput
                type={inputPassword}
                placeholder="Escribe tu nueva contraseña"
                min={0}
                className="form-control w-full"
                onChange={(e: any) => handlePasswordRepeat(e.target.value)}
              />
              <Lucide
                icon={inputPassword === "text" ? "eye-closed" : "eye-outline"}
                className={twMerge([
                  "absolute top-11 right-0 w-4 h-4 my-auto mr-3 cursor-pointer transition-all",
                  inputPassword === "text" && "text-black",
                ])}
                onClick={(e: any) => {
                  viewPassword();
                }}
              />
              {errors.repeatPassword.length > 0 && (
                <span className="text-red-500">{errors.repeatPassword}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
