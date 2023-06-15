import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import clsx from "clsx";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

type valuesTypes = {
  consultationDate: string;
  referredBy: string;
  consultationReason: string;
  sufferingDate: string;
  diagnose: ICIE10[];
  observations: string;
};

type errorsTypes = {
  consultationDate: string;
  consultationReason: string;
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
      <div className="xl:flex justify-between mb-4">
        <div className="xl:flex lg:flex xl:mb-0 mb-4 items-center">
          <div className="mr-5 xl:w-[170px] lg:w-[150px] w-full xl:mb-0 lg:mb-0 mb-1">
            <p className="text-slate-900 font-lighter text-md flex">
              Fecha de la consulta{" "}
              <span className="text-primary font-bold">*</span>
            </p>
          </div>

          <div className="xl:w-[300px] w-full">
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

        <div className="xl:flex lg:flex items-center xl:mt-0 mt-4">
          <div className="mr-5 xl:w-[150px] w-[150px] xl:mb-0 lg:mb-0 mb-1 xl:text-end">
            <p className="text-md">Referido por</p>
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
          <div className="mr-5 lg:w-[200px] w-full xl:mb-0 lg:mb-0 mb-1">
            <p className="text-slate-900 font-lighter text-md flex">
              Mótivo de la consulta{" "}
              <span className="text-primary font-bold">*</span>
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
          <div className="mr-5 lg:w-[200px] xl:mb-0 lg:mb-0 mb-1">
            <p className="text-md">Inicio del padecimiento</p>
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
