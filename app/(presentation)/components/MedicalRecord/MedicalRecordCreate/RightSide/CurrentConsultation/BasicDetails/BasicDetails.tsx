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

  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };

    if (screenSize.width === 0 && screenSize.height === 0) updateDimension();

    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

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
      <div
        className={clsx([
          "justify-between mb-4",
          screenSize.width <= 1500 ? "block" : "xl:flex",
        ])}
      >
        <div className="xl:flex lg:flex xl:mb-4 mb-4 items-center">
          <div className="mr-5 xl:w-[170px] lg:w-[150px] w-full xl:mb-0 lg:mb-0 mb-1">
            <p className="text-slate-900 font-lighter text-md flex">
              Fecha de la consulta{" "}
              <span className="text-primary font-bold">*</span>
            </p>
          </div>

          <div
            className={clsx([
              "w-full",
              screenSize.width <= 1500 ? "w-full" : "xl:w-[300px]",
            ])}
          >
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

        <div className="xl:flex lg:flex items-center xl:mt-0 mt-4 xl:ml-6 ml-0">
          <div className="mr-5 xl:w-[170px] w-[150px] xl:mb-0 lg:mb-0 mb-1">
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
          <div className="mr-5 xl:w-[200px] lg:w-[150px] w-full xl:mb-0 lg:mb-0 mb-1">
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
          <div className="mr-5 xl:w-[200px] lg:w-[150px] xl:mb-0 lg:mb-0 mb-1">
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
