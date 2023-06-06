import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
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
  diagnose: string[];
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

interface IVitalSignsProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
  errors: errorsTypes;
  setErrors: Dispatch<SetStateAction<errorsTypes>>;
}

export default function VitalSigns({
  values,
  setValues,
  errors,
  setErrors,
}: IVitalSignsProps) {
  const [showBody, setShowBody] = useState(false);

  const params = useSearchParams();

  const size = params.get("size");
  const weight = params.get("weight");
  const temperature = params.get("temperature");
  const respiratoryFrequency = params.get("respiratoryFrequency");
  const oximetry = params.get("oximetry");
  const muscleMass = params.get("muscleMass");
  const glicemy = params.get("glicemy");

  const handleSizeErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          size: "Debe ingresar solo carácteres númericos",
        };
      });
      return;
    }

    setErrors((previousState) => {
      return {
        ...previousState,
        size: "",
      };
    });
  };

  const handleWeightErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          weight: "Debe ingresar solo carácteres númericos",
        };
      });
      return;
    }

    setErrors((previousState) => {
      return {
        ...previousState,
        weight: "",
      };
    });
  };

  const handleTemperatureErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          temperature: "Debe ingresar solo carácteres númericos",
        };
      });
      return;
    }

    setErrors((previousState) => {
      return {
        ...previousState,
        temperature: "",
      };
    });
  };

  const handleRespiratoryFrequencyErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          respiratoryFrequency: "Debe ingresar solo carácteres númericos",
        };
      });
      return;
    }

    setErrors((previousState) => {
      return {
        ...previousState,
        respiratoryFrequency: "",
      };
    });
  };

  const handleOximetryErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          oximetry: "Debe ingresar solo carácteres númericos",
        };
      });
      return;
    }

    setErrors((previousState) => {
      return {
        ...previousState,
        oximetry: "",
      };
    });
  };

  const handleMuscleMassErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          muscleMass: "Debe ingresar solo carácteres númericos",
        };
      });
      return;
    }

    setErrors((previousState) => {
      return {
        ...previousState,
        muscleMass: "",
      };
    });
  };

  const handleGlicemyErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          glicemy: "Debe ingresar solo carácteres númericos",
        };
      });
      return;
    }

    setErrors((previousState) => {
      return {
        ...previousState,
        glicemy: "",
      };
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues({ ...values, [name]: value });

    switch (name) {
      case "size":
        handleSizeErrors(value);
        break;
      case "weight":
        handleWeightErrors(value);
        break;
      case "temperature":
        handleTemperatureErrors(value);
        break;
      case "respiratoryFrequency":
        handleRespiratoryFrequencyErrors(value);
        break;
      case "oximetry":
        handleOximetryErrors(value);
        break;
      case "muscleMass":
        handleMuscleMassErrors(value);
        break;
      case "glicemy":
        handleGlicemyErrors(value);
        break;

      default:
        break;
    }
  };

  const validateForm = () => {
    if (size === "true") {
      handleSizeErrors(values.size);
      setShowBody(true);
    }

    if (weight === "true") {
      handleWeightErrors(values.weight);
      setShowBody(true);
    }

    if (temperature === "true") {
      handleTemperatureErrors(values.temperature);
      setShowBody(true);
    }

    if (respiratoryFrequency === "true") {
      handleRespiratoryFrequencyErrors(values.respiratoryFrequency);
      setShowBody(true);
    }

    if (oximetry === "true") {
      handleOximetryErrors(values.oximetry);
      setShowBody(true);
    }

    if (muscleMass === "true") {
      handleMuscleMassErrors(values.muscleMass);
      setShowBody(true);
    }

    if (glicemy === "true") {
      handleGlicemyErrors(values.glicemy);
      setShowBody(true);
    }
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    size,
    weight,
    temperature,
    respiratoryFrequency,
    oximetry,
    muscleMass,
    glicemy,
  ]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowBody(!showBody)}
        className="w-full flex justify-between items-center border-b mb-5 pb-2"
      >
        <div>
          <p className="font-bold text-lg text-slate-900">Signos vítales</p>
        </div>

        <div>
          <Lucide
            icon={showBody ? "Minus" : "Plus"}
            color="#22345F"
            size={30}
          />
        </div>
      </button>

      <div className={clsx([showBody ? "block" : "hidden"])}>
        <div className="xl:flex items-center justify-between mb-4">
          <div className="xl:flex items-center xl:mb-4 mb-4">
            <div className="xl:mr-5 mb-1 w-[400px]">
              <p className="text-lg">Talla (mts)</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.size}
                name="size"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                className={clsx([
                  "h-[50px] xl:w-full w-full",
                  errors.size.length > 0 && "border-danger hover:border-danger",
                ])}
              />

              {errors.size.length > 0 && (
                <p className="text-danger mt-1">{errors.size}</p>
              )}
            </div>
          </div>

          <div className="xl:flex items-center xl:mb-4 mb-4">
            <div className="xl:mr-5 mb-1 xl:w-[335px] w-full xl:text-end">
              <p className="text-lg">Peso (Kg)</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.weight}
                name="weight"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                className={clsx([
                  "h-[50px] xl:w-full w-full",
                  errors.weight.length > 0 &&
                    "border-danger hover:border-danger",
                ])}
              />

              {errors.weight.length > 0 && (
                <p className="text-danger mt-1">{errors.weight}</p>
              )}
            </div>
          </div>
        </div>

        <div className="xl:flex items-center justify-between mb-4">
          <div className="xl:flex items-center xl:mb-4 mb-4">
            <div className="xl:mr-5 mb-1 w-[400px]">
              <p className="text-lg">Temperatura (°C)</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.temperature}
                name="temperature"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                className={clsx([
                  "h-[50px] xl:w-full w-full",
                  errors.temperature.length > 0 &&
                    "border-danger hover:border-danger",
                ])}
              />

              {errors.temperature.length > 0 && (
                <p className="text-danger mt-1">{errors.temperature}</p>
              )}
            </div>
          </div>

          <div className="xl:flex items-center xl:mb-4 mb-4">
            <div className="xl:mr-5 mb-1 xl:w-[335px] w-full xl:text-end">
              <p className="text-lg">Frecuencia respiratoria</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.respiratoryFrequency}
                name="respiratoryFrequency"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                className={clsx([
                  "h-[50px] xl:w-full w-full",
                  errors.respiratoryFrequency.length > 0 &&
                    "border-danger hover:border-danger",
                ])}
              />

              {errors.respiratoryFrequency.length > 0 && (
                <p className="text-danger mt-1">
                  {errors.respiratoryFrequency}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="xl:flex items-center justify-between mb-4">
          <div className="xl:flex items-center xl:mb-4 mb-4">
            <div className="xl:mr-5 mb-1 w-[400px]">
              <p className="text-lg">Oximetría</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.oximetry}
                name="oximetry"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                className={clsx([
                  "h-[50px] xl:w-full w-full",
                  errors.oximetry.length > 0 &&
                    "border-danger hover:border-danger",
                ])}
              />

              {errors.oximetry.length > 0 && (
                <p className="text-danger mt-1">{errors.oximetry}</p>
              )}
            </div>
          </div>

          <div className="xl:flex items-center xl:mb-4 mb-4">
            <div className="xl:mr-5 mb-1 xl:w-[335px] w-full xl:text-end">
              <p className="text-lg">Índice masa muscular</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.muscleMass}
                name="muscleMass"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                className={clsx([
                  "h-[50px] xl:w-full w-full",
                  errors.muscleMass.length > 0 &&
                    "border-danger hover:border-danger",
                ])}
              />

              {errors.muscleMass.length > 0 && (
                <p className="text-danger mt-1">{errors.muscleMass}</p>
              )}
            </div>
          </div>
        </div>

        <div className="xl:flex items-center justify-between mb-4">
          <div className="xl:flex items-center xl:mb-4 mb-4">
            <div className="xl:mr-5 mb-1 w-[400px]">
              <p className="text-lg">Glicemia</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.glicemy}
                name="glicemy"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                className={clsx([
                  "h-[50px] xl:w-full w-full",
                  errors.glicemy.length > 0 &&
                    "border-danger hover:border-danger",
                ])}
              />

              {errors.glicemy.length > 0 && (
                <p className="text-danger mt-1">{errors.glicemy}</p>
              )}
            </div>
          </div>

          <div className="xl:flex items-center xl:mb-4 mb-4 opacity-0 h-0">
            <div className="xl:mr-5 mb-1 xl:w-[335px] w-full xl:text-end">
              <p className="text-lg">Índice masa muscular</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.muscleMass}
                name="muscleMass"
                type="text"
                className={clsx(["h-[50px] xl:w-full w-full"])}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
