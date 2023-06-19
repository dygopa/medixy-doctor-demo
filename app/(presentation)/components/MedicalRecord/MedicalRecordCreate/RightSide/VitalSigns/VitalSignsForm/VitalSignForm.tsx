import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

type valuesTypes = {
  size: string;
  weight: string;
  temperature: string;
  respiratoryFrequency: string;
  oximetry: string;
  muscleMass: string;
  glicemy: string;
};

type errorsTypes = {
  size: string;
  weight: string;
  temperature: string;
  respiratoryFrequency: string;
  oximetry: string;
  muscleMass: string;
  glicemy: string;
};

interface IVitalSignsFormProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
  errors: errorsTypes;
  setErrors: Dispatch<SetStateAction<errorsTypes>>;
}

export default function VitalSignsForm({
  values,
  setValues,
  errors,
  setErrors,
}: IVitalSignsFormProps) {
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
    }

    if (weight === "true") {
      handleWeightErrors(values.weight);
    }

    if (temperature === "true") {
      handleTemperatureErrors(values.temperature);
    }

    if (respiratoryFrequency === "true") {
      handleRespiratoryFrequencyErrors(values.respiratoryFrequency);
    }

    if (oximetry === "true") {
      handleOximetryErrors(values.oximetry);
    }

    if (muscleMass === "true") {
      handleMuscleMassErrors(values.muscleMass);
    }

    if (glicemy === "true") {
      handleGlicemyErrors(values.glicemy);
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
      <div className="xl:flex items-center justify-between mb-4">
        <div className="xl:flex items-center xl:mb-4 mb-4">
          <div className="xl:mr-5 mb-1 w-[200px]">
            <p className="text-md">Talla (mts)</p>
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
          <div className="xl:mr-5 mb-1 xl:w-[200px] w-full xl:text-star">
            <p className="text-md">Peso (Kg)</p>
          </div>

          <div className="w-full">
            <FormInput
              value={values.weight}
              name="weight"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
              className={clsx([
                "h-[50px] xl:w-full w-full",
                errors.weight.length > 0 && "border-danger hover:border-danger",
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
          <div className="xl:mr-5 mb-1 w-[200px]">
            <p className="text-md">Temperatura (°C)</p>
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
          <div className="xl:mr-5 mb-1 xl:w-[200px] w-full xl:text-star">
            <p className="text-md">Frecuencia respiratoria</p>
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
              <p className="text-danger mt-1">{errors.respiratoryFrequency}</p>
            )}
          </div>
        </div>
      </div>

      <div className="xl:flex items-center justify-between mb-4">
        <div className="xl:flex items-center xl:mb-4 mb-4">
          <div className="xl:mr-5 mb-1 w-[200px]">
            <p className="text-md">Oximetría</p>
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
          <div className="xl:mr-5 mb-1 xl:w-[200px] w-full xl:text-star">
            <p className="text-md">Índice masa muscular</p>
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
          <div className="xl:mr-5 mb-1 w-[200px]">
            <p className="text-md">Glicemia</p>
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
          <div className="xl:mr-5 mb-1 xl:w-[200px] w-full xl:text-end">
            <p className="text-md">Índice masa muscular</p>
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
  );
}
