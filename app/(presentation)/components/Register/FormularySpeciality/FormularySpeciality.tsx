import { useContext, useEffect, useMemo, useState } from "react";
import { FormInput, FormSelect } from "(presentation)/components/core/BaseComponents/Form";
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

export default function FormularySpeciality() {
  const { state, actions, dispatch } =
    useContext<IRegisterContext>(RegisterContext);
  const { updateRegisterData, getMedicalSpecialities } = actions;
  const { data: specialities } = state.medicalSpecialities;
  let { data: formData } = state.registerData;

  const { actions: stepActions, dispatch: stepDispatch } =
    useContext<IStepsContext>(StepsContext);
  const { changeStep } = stepActions;

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

  const [values, setValues] = useState({
    pwaProfessionId: 0,
    specialty_id: 0
  });

  const [errors, setErrors] = useState({
    global: "",
    curp: "",
  });

  const setInitialsValues = () => {
    let val = {
      pwaProfessionId: formData?.pwa_profession_id ?? 0,
      specialty_id: formData?.specialty_id ?? 0
    }

    setValues(val);
  }

  const onSubmit = () => {
    if (values.pwaProfessionId === 0) {
      setErrors({ ...errors, curp: "El CURP debe tener más de 10 caracteres" });
      return;
    } else {
      setErrors({ ...errors, curp: "" });
      formData = { ...(formData as Object), 
        pwa_profession_id: values.pwaProfessionId,
        specialty_id: values.specialty_id,
      };
      updateRegisterData(formData)(dispatch);
      changeStep(0)(stepDispatch);
    }
  };
  const [loadedAPI, setLoadedAPI] = useState(false);

  const loadAPI = () => {
    getMedicalSpecialities()(dispatch);
    setLoadedAPI(true);
  };

  useEffect(() => {
    setInitialsValues();
    loadAPI();
  }, [loadedAPI]);


  console.log(values)

  return (
    <div className="lg:w-[60%] md:w-[70%] lg:px-20 md:px-14 sm:px-20 px-8 w-full h-fit flex flex-col justify-between items-center gap-6">
      <div className="w-full flex flex-col justify-between items-center gap-3 text-center">
        <p className="text-gray-950 font-semibold lg:text-3xl md:text-3xl text-2xl">
          ¿Cuál es tú especialidad?
        </p>
        <p className="text-gray-500 font-light lg:text-base md:text-base text-md">
          Por favor, indícanos tu profesión y especialidad para comenzar la creación de tu cuenta
        </p>
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
          <option value="0">Selecciona tu profesión</option>
          {profesions.map((elem, i) => (
            <option key={i} value={elem["id"]}>
              {elem["name"]}
            </option>
          ))}
        </FormSelect>
        {errors["curp"] !== "" && (
          <p className="text-red-500">{errors["curp"]}</p>
        )}
      </div>
      <div className="relative w-full text-slate-500">
        <FormSelect
          className="form-control w-full bg-white"
          defaultValue={formData.specialty_id}
          value={formData.specialty_id}
          disabled={values.pwaProfessionId===0}
          onChange={(e) =>
            setValues({ ...values, specialty_id: +e.target.value })
          }
        >
          <option value="0">Selecciona tu especialidad</option>
          {specialities &&
            [...(specialities as Array<any>)].map((elem, i) => (
              <option key={i} value={elem["id"]}>
                {elem["name"]}
              </option>
            ))}
        </FormSelect>
      </div>

      <div className="w-full text-center">
        <Button
          onClick={() => onSubmit()}
          disabled={values.pwaProfessionId === 0 || values.specialty_id===0}
          variant="primary"
          type="submit"
          className="mt-4 w-full"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
