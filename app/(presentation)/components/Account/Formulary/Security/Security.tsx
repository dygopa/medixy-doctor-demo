import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import { IUser } from "domain/core/entities/userEntity";
import { useContext, useState } from "react";
import { IUserContext, UserContext } from "../../context/UserContext";

interface IFormularyProps {
  account: IUser;
  formData: {
    password: string;
  };
  setFormData: any;
  errors: {
    global: string,
    password: string,
  };
  setErrors: any;
}

export default function Security({ account, formData, setFormData, errors, setErrors }: IFormularyProps) {
  const { state } = useContext<IUserContext>(UserContext);

  const { loading, successful, error } = state.changePasswords;

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

  return(
    <div className="my-9">
      <AlertComponent
        variant="error"
        show={error !== null}
        description={"Ha ocurrido un error actualizando la cuenta"}
      />
      <SuccessfulComponent
        tittle="Actualizado con exito"
        show={successful}
        description={"Cuenta actualizada exitosamente"}
      />

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
                Nueva Constraseña
              </p>
              <FormInput
                type={"text"}
                placeholder="Escribe tu nueva Constraseña"
                min={0}
                className="form-control w-full"
                onChange={(e: any) => handlePassword(e.target.value)}
              />
              {errors.password.length > 0 && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Email
              </p>
              <FormInput
                type={"text"}
                placeholder="Correo electronico"
                min={0}
                className="form-control w-full"
                value={account.email}
                defaultValue={account.email}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}