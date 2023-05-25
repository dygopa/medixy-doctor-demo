import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type valuesTypes = {
  consultationDate: string;
  referredBy: string;
  consultationReason: string;
  sufferingDate: string;
  generalInspection: string;
  respiratorySystem: string;
  digestiveSystem: string;
  cardiovascularSystem: string;
  reproductiveSystem: string;
  urinarySystem: string;
  ophthalmologicalSystem: string;
  locomotorSystem: string;
  earInspection: string;
  neurologicalInspection: string;
  skinInspection: string;
  size: string;
  weight: string;
  temperature: string;
  respiratoryFrequency: string;
  oximetry: string;
  muscleMass: string;
  glicemy: string;
  diagnose: string;
  observations: string;
};

type errorsTypes = {
  consultationDate: string;
  consultationReason: string;
  size: string;
  weight: string;
  temperature: string;
  respiratoryFrequency: string;
  oximetry: string;
  muscleMass: string;
  glicemy: string;
};

interface IBasicDetailsProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
  errors: errorsTypes;
  setErrors: Dispatch<SetStateAction<errorsTypes>>;
}

export default function BasicDetails({
  values,
  setValues,
  errors,
  setErrors,
}: IBasicDetailsProps) {
  const params = useSearchParams();

  const consultationDate = params.get("consultationDate");
  const consultationReason = params.get("consultationReason");

  const handleConsultationDateErrors = (value: string) => {
    if (value.length === 0) {
      setErrors((previousState) => {
        return {
          ...previousState,
          consultationDate: "Debe indicar la fecha de la consulta",
        };
      });
      return;
    }

    setErrors((previousState) => {
      return {
        ...previousState,
        consultationDate: "",
      };
    });
  };

  const handleConsultationReasonErrors = (value: string) => {
    if (value.length === 0) {
      setErrors((previousState) => {
        return {
          ...previousState,
          consultationReason: "Debe escribir el mótivo de la consulta",
        };
      });
      return;
    }

    setErrors((previousState) => {
      return {
        ...previousState,
        consultationReason: "",
      };
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues({ ...values, [name]: value });

    if (name === "consultationDate") {
      handleConsultationDateErrors(value);
      return;
    }

    if (name === "consultationReason") {
      handleConsultationReasonErrors(value);
      return;
    }
  };

  const validateForm = () => {
    if (consultationDate === "true")
      handleConsultationDateErrors(values.consultationDate);

    if (consultationReason === "true")
      handleConsultationReasonErrors(values.consultationReason);
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultationDate, consultationReason]);

  return (
    <div>
      <div className="mb-4">
        <div className="xl:flex lg:flex xl:mb-0 mb-4 items-center">
          <div className="mr-5 xl:mb-0 lg:mb-0 mb-1 xl:w-[250px] w-[200px]">
            <p className="text-slate-900 font-lighter text-lg flex">
              Fecha de la consulta <p className="text-danger">*</p>
            </p>
          </div>

          <div className="w-full">
            <FormInput
              value={values.consultationDate}
              name="consultationDate"
              type="date"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
              className={clsx([
                "h-[50px]  w-full",
                errors.consultationDate.length > 0 &&
                  "border-danger hover:border-danger",
              ])}
            />

            {errors.consultationDate.length > 0 && (
              <p className="text-danger mt-1">{errors.consultationDate}</p>
            )}
          </div>
        </div>

        <div className="xl:flex lg:flex items-center mt-4">
          <div className="mr-5 xl:w-[250px] w-[200px] xl:mb-0 lg:mb-0 mb-1">
            <p className="text-slate-900 font-lighter text-lg">Referido por</p>
          </div>

          <div className="w-full">
            <FormInput
              value={values.referredBy}
              name="referredBy"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
              className="h-[50px] w-full"
            />
          </div>
        </div>
      </div>

      <div className="xl:flex items-center justify-between w-full mb-4">
        <div className="xl:flex lg:flex items-center w-full">
          <div className="mr-5 xl:w-[250px] lg:w-[200px] w-full xl:mb-0 lg:mb-0 mb-1">
            <p className="text-slate-900 font-lighter text-lg flex">
              Mótivo de la consulta <p className="text-danger">*</p>
            </p>
          </div>

          <div className="w-full">
            <FormInput
              value={values.consultationReason}
              name="consultationReason"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
              className={clsx([
                "h-[50px] w-full",
                errors.consultationReason.length > 0 &&
                  "border-danger hover:border-danger",
              ])}
            />

            {errors.consultationReason.length > 0 && (
              <p className="text-danger mt-1">{errors.consultationReason}</p>
            )}
          </div>
        </div>
      </div>

      <div className="xl:flex items-center justify-between w-full mb-4">
        <div className="xl:flex lg:flex items-center w-full">
          <div className="mr-5 xl:w-[250px] lg:w-[200px] xl:mb-0 lg:mb-0 mb-1">
            <p className="text-slate-900 font-lighter text-lg">
              Inicio del padecimiento
            </p>
          </div>

          <div className="w-full">
            <FormInput
              value={values.sufferingDate}
              name="sufferingDate"
              type="date"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
              className="h-[50px] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
