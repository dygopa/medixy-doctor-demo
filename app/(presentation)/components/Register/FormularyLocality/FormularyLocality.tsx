import { useContext, useEffect, useMemo, useState } from "react";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { RegisterContext, IRegisterContext } from "../context/RegisterContext";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import {
  RegisterFailure,
  registerFailuresEnum,
} from "domain/core/failures/register/registerFailure";
import { IStepsContext, StepsContext } from "../Steps/context/StepsContext";
import { IMunicipality } from "domain/core/entities/municipalityEntity";

export default function FormularyLocality() {
  const { state, actions, dispatch } =
    useContext<IRegisterContext>(RegisterContext);
  const { updateRegisterData, getFederalEntities, getMunicipalities } = actions;
  const { data: federalEntities } = state.getFederalEntities;
  const { data: municipalities, successful: successfulMunicipalities } = state.municipalities;
  let { data: formData } = state.registerData;

  const { actions: stepActions, dispatch: stepDispatch } =
    useContext<IStepsContext>(StepsContext);
  const { changeStep } = stepActions;

  const [values, setValues] = useState({
    federalEntity: formData?.state_id ?? -1,
    municipality: formData?.municipality_id ?? -1,
    locality_is_public: typeof formData?.locality_is_public === "undefined" ? -1 : formData.locality_is_public ? 1 : 0,
  });

  const onSubmit = () => {
      formData = { ...(formData as Object), 
        state_id: values.federalEntity,
        municipality_id: values.municipality,
        locality_is_public: values.locality_is_public === 1 ? true : false,
      };
      updateRegisterData(formData)(dispatch);
      console.log(formData);
      changeStep(1)(stepDispatch);
  };

  useEffect(() => {
    getFederalEntities()(dispatch);
  }, [])

  useEffect(() => {
    if (values.federalEntity > 0) {
      getMunicipalities({
        federalEntityId: values.federalEntity,
      })(dispatch);
   }
  }, [values.federalEntity])

  console.log(values)

  return (
    <div className="lg:w-[60%] md:w-[70%] lg:px-20 md:px-14 sm:px-20 px-8 w-full h-fit flex flex-col justify-between items-center gap-6">
      <div className="w-full flex flex-col justify-between items-center gap-3 text-center">
        <p className="text-gray-950 font-semibold lg:text-3xl md:text-3xl text-2xl">
          ¿Donde queda tu consultorio?
        </p>
        <p className="text-gray-500 font-light lg:text-base md:text-base text-md">
          Selecciona la localidad del consultorio que más frecuentas. Podrás editar o crear este y otros consultorios una vez registrado.
        </p>
      </div>
      <div className="relative w-full text-slate-500">
        <FormSelect
          className="form-control w-full bg-white"
          defaultValue={values.federalEntity.toString()}
          value={values.federalEntity.toString()}
          onChange={(e: any) =>
            setValues({ ...values, federalEntity: parseInt(e.target.value) })
          }
        >
          <option value={'-1'}>
            Seleccione la entidad federal
          </option>
          {federalEntities.map((elem) => (
            <option key={elem.entityId} value={elem.entityId}>
              {elem.nameEntity}
            </option>
          ))}
        </FormSelect>
      </div>
      <div className="relative w-full text-slate-500">
       <FormSelect
          className="form-control w-full bg-white"
          disabled={values.federalEntity < 0}
          value={values.municipality.toString()}
          defaultValue={values.municipality.toString()}
          onChange={(e: any) =>
            setValues({ ...values, municipality: parseInt(e.target.value) })
          }
        >
          <option value={'-1'}>
            Seleccione el municipio
          </option>
          <option value={"0"}>
            NO ESPECIFICADO
          </option>
          {municipalities.data?.map((elem: IMunicipality) => (
              <option key={elem.id} value={elem.id}>
                {elem.name}
              </option>
            ))
          }
        </FormSelect>
      </div>

      <div className="relative w-full text-slate-500">
        <FormSelect
          className="form-control w-full bg-white"
          defaultValue={values.locality_is_public}
          value={values.locality_is_public}
          onChange={(e: any) =>
            setValues({
              ...values,
              locality_is_public: +e.target.value,
            })
          }
        >
          <option value={-1}>
            Selecciona el sector
          </option>
          <option value={1}>
            Público
          </option>
          <option value={0}>
            Privado
          </option>
        </FormSelect>
      </div>

      <Button
        onClick={() => onSubmit()}
        disabled={values.federalEntity < 0 || values.municipality < 0 || values.locality_is_public < 0}
        variant="primary"
        type="submit"
        className="mt-4 w-full"
      >
        Continuar
      </Button>
    </div>
  );
}
