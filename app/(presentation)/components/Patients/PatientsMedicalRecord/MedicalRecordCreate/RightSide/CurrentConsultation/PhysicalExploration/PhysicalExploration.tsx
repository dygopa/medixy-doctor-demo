import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

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

interface IPhysicalExplorationProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
  width: number;
}

export default function PhysicalExploration({
  values,
  setValues,
  width,
}: IPhysicalExplorationProps) {
  const [showBody, setShowBody] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowBody(!showBody)}
        className="w-full flex justify-between items-center border-b mb-5 pb-2"
      >
        <div>
          <p className="font-bold text-lg text-slate-900">Exploración física</p>
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
        <div className="flex items-center justify-between mb-4 w-full">
          <div className="xl:flex items-center w-full">
            <div className="mr-5 w-[300px]">
              <p className="text-lg">Inspección general</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.generalInspection}
                name="generalInspection"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>

        <div className="xl:flex items-center justify-between mb-4">
          <div className="xl:flex items-center xl:mb-3 mb-3">
            <div className="xl:mr-5 mb-1 xl:w-[400px] w-full">
              <p className="text-lg">Aparato respiratorio</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.respiratorySystem}
                name="respiratorySystem"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] xl:w-full w-full"
              />
            </div>
          </div>

          <div className="xl:flex items-center xl:mb-3 mb-3">
            <div className="xl:mr-5 mb-1 xl:w-[335px] w-full xl:text-end">
              <p className="text-lg">Aparato digestivo</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.digestiveSystem}
                name="digestiveSystem"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] xl:w-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="xl:flex items-center justify-between mb-4">
          <div className="xl:flex items-center xl:mb-3 mb-3">
            <div className="xl:mr-5 mb-1 xl:w-[400px] w-full">
              <p className="text-lg">Aparato cardiovascular</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.cardiovascularSystem}
                name="cardiovascularSystem"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] xl:w-full w-full"
              />
            </div>
          </div>

          <div className="xl:flex items-center xl:mb-3 mb-3">
            <div className="xl:mr-5 mb-1 xl:w-[335px] w-full xl:text-end">
              <p className="text-lg">Aparato reproductor</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.reproductiveSystem}
                name="reproductiveSystem"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] xl:w-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="xl:flex items-center justify-between mb-4">
          <div className="xl:flex items-center xl:mb-3 mb-3">
            <div className="xl:mr-5 mb-1 xl:w-[400px] w-full">
              <p className="text-lg">Aparato urinario</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.urinarySystem}
                name="urinarySystem"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] xl:w-full w-full"
              />
            </div>
          </div>

          <div className="xl:flex items-center xl:mb-3 mb-3">
            <div className="xl:mr-5 mb-1 xl:w-[335px] w-full xl:text-end">
              <p className="text-lg">Inspección oftalmológica</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.ophthalmologicalSystem}
                name="ophthalmologicalSystem"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] xl:w-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="xl:flex items-center justify-between mb-4">
          <div className="xl:flex items-center xl:mb-3 mb-3">
            <div className="xl:mr-5 mb-1 xl:w-[400px] w-full">
              <p className="text-lg">Aparato locomotor</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.locomotorSystem}
                name="locomotorSystem"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] xl:w-full w-full"
              />
            </div>
          </div>

          <div className="xl:flex items-center xl:mb-3 mb-3">
            <div className="xl:mr-5 mb-1 xl:w-[335px] w-full xl:text-end">
              <p className="text-lg">Inspección oídos</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.earInspection}
                name="earInspection"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] xl:w-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="xl:flex items-center justify-between mb-4">
          <div className="xl:flex items-center xl:mb-3 mb-3">
            <div className="xl:mr-5 mb-1 xl:w-[400px] w-full">
              <p className="text-lg">Aparato neurológica</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.neurologicalInspection}
                name="neurologicalInspection"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] xl:w-full w-full"
              />
            </div>
          </div>

          <div className="xl:flex items-center xl:mb-3 mb-3">
            <div className="xl:mr-5 mb-1 xl:w-[335px] w-full xl:text-end">
              <p className="text-lg">Inspección piel</p>
            </div>

            <div className="w-full">
              <FormInput
                value={values.skinInspection}
                name="skinInspection"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] xl:w-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
