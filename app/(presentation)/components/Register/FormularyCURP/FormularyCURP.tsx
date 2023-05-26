import { useContext, useEffect, useMemo, useState } from "react";
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
import Link from "next/link";
import { IRegister } from "domain/core/entities/registerEntity";

export default function FormularyCURP() {
  const { state, actions, dispatch } =
    useContext<IRegisterContext>(RegisterContext);
  const { updateRegisterData } = actions;
  const { loading, error, successful } = state.searchCURP;
  let { data: formData } = state.registerData;

  const { actions: stepActions, dispatch: stepDispatch } =
    useContext<IStepsContext>(StepsContext);
  const { changeStep } = stepActions;

  const [values, setValues] = useState({
    curp: formData?.curp ?? "",
  });

  const [errors, setErrors] = useState({
    global: "",
    curp: "",
  });

  const handleCURP = (value: string) => {
    if (value.length <= 2 || value.length === 0) {
      errors["curp"] = "El CURP debe tener más de 2 caracteres";
    } else {
      setErrors({ ...errors, curp: "" });
    }
  };

  const onSubmit = () => {
    if (values.curp.length <= 9) {
      setErrors({ ...errors, curp: "El CURP debe tener más de 10 caracteres" });
      return;
    } else {
      setErrors({ ...errors, curp: "" });
      formData = { ...(formData as Object), curp: values.curp };
      updateRegisterData(formData)(dispatch);
      changeStep(0)(stepDispatch);
    }
  };

  const handleErrors = () => {
    switch (error?.code) {
      case registerFailuresEnum.curpNotFound:
        setErrors({
          ...errors,
          global: "El CURP no existe en nuestra plataforma",
        });
        break;

      default:
        break;
    }
  };

  useMemo(() => {
    if (error) handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div className="lg:w-[60%] md:w-[70%] lg:px-20 md:px-14 sm:px-20 px-8 w-full h-fit flex flex-col justify-between items-center gap-6">
      <div className="w-full flex flex-col justify-between items-center gap-3 text-center">
        <p className="text-gray-950 font-semibold lg:text-3xl md:text-3xl text-2xl">
          ¿Cuál es tú CURP?
        </p>
        <p className="text-gray-500 font-light lg:text-base md:text-base text-md">
          Por favor, indicanos tu CURP para comenzar la creación de tu cuenta
        </p>
      </div>
      <div className="relative w-full text-slate-500">
        <FormInput
          type="text"
          className="w-full py-3 pr-10"
          placeholder="CURP"
          value={values.curp}
          onChange={(e: any) => setValues({ ...values, curp: e.target.value })}
        />
        {errors["curp"] !== "" && (
          <p className="text-red-500">{errors["curp"]}</p>
        )}
      </div>

      <div className="w-full text-center">
        <Link
          target="_blank"
          href="https://www.gob.mx/curp/"
          className="text-primary font-light lg:text-base md:text-base text-md"
        >
          ¿No sabes cual es tu CURP? visita este sitio
        </Link>
        <Button
          onClick={() => onSubmit()}
          disabled={loading || values.curp.length === 0}
          variant="primary"
          type="submit"
          className="mt-4 w-full"
        >
          {loading ? "Cargando" : "Continuar"}
        </Button>
      </div>
    </div>
  );
}
