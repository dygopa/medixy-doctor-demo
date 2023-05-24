import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

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

interface IPhysicalExplorationProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function PhysicalExploration({
  values,
  setValues,
}: IPhysicalExplorationProps) {
  return (
    <div>
      <div className="w-full flex justify-between items-center border-b mb-5 pb-2">
        <p className="font-bold text-lg text-slate-900">Exploración física</p>
      </div>

      <div className="flex items-center justify-between mb-4 w-full">
        <div className="xl:flex items-center w-full">
          <div className="mr-5 w-[250px]">
            <p className="text-slate-900 font-lighter text-lg">
              Inspección general
            </p>
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
        <div className="xl:flex items-center xl:mb-0 mb-3">
          <div className="xl:mr-5 mb-1 xl:w-[200px] w-full">
            <p className="text-slate-900 font-lighter text-lg">
              Aparato respiratorio
            </p>
          </div>

          <div>
            <FormInput
              value={values.respiratorySystem}
              name="respiratorySystem"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] xl:w-[350px] w-full"
            />
          </div>
        </div>

        <div className="xl:flex items-center xl:mb-0 mb-3">
          <div className="xl:mr-5 mb-1 xl:w-[185px] w-full">
            <p className="text-slate-900 font-lighter text-lg">
              Aparato digestivo
            </p>
          </div>

          <div>
            <FormInput
              value={values.digestiveSystem}
              name="digestiveSystem"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] xl:w-[350px] w-full"
            />
          </div>
        </div>
      </div>

      <div className="xl:flex items-center justify-between mb-4">
        <div className="xl:flex items-center xl:mb-0 mb-3">
          <div className="xl:mr-5 mb-1 xl:w-[200px] w-full">
            <p className="text-slate-900 font-lighter text-lg">
              Aparato cardiovascular
            </p>
          </div>

          <div>
            <FormInput
              value={values.cardiovascularSystem}
              name="cardiovascularSystem"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] xl:w-[350px] w-full"
            />
          </div>
        </div>

        <div className="xl:flex items-center xl:mb-0 mb-3">
          <div className="xl:mr-5 mb-1 xl:w-[185px] w-full">
            <p className="text-slate-900 font-lighter text-lg">
              Aparato reproductor
            </p>
          </div>

          <div>
            <FormInput
              value={values.reproductiveSystem}
              name="reproductiveSystem"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] xl:w-[350px] w-full"
            />
          </div>
        </div>
      </div>

      <div className="xl:flex items-center justify-between mb-4">
        <div className="xl:flex items-center xl:mb-0 mb-3">
          <div className="xl:mr-5 mb-1 xl:w-[200px] w-full">
            <p className="text-slate-900 font-lighter text-lg">
              Aparato urinario
            </p>
          </div>

          <div>
            <FormInput
              value={values.urinarySystem}
              name="urinarySystem"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] xl:w-[350px] w-full"
            />
          </div>
        </div>

        <div className="xl:flex items-center xl:mb-0 mb-3">
          <div className="xl:mr-5 mb-1 xl:w-[185px] w-full">
            <p className="text-slate-900 font-lighter text-lg">
              Inspección oftalmológica
            </p>
          </div>

          <div>
            <FormInput
              value={values.ophthalmologicalSystem}
              name="ophthalmologicalSystem"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] xl:w-[350px] w-full"
            />
          </div>
        </div>
      </div>

      <div className="xl:flex items-center justify-between mb-4">
        <div className="xl:flex items-center xl:mb-0 mb-3">
          <div className="xl:mr-5 mb-1 xl:w-[200px] w-full">
            <p className="text-slate-900 font-lighter text-lg">
              Aparato locomotor
            </p>
          </div>

          <div>
            <FormInput
              value={values.locomotorSystem}
              name="locomotorSystem"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] xl:w-[350px] w-full"
            />
          </div>
        </div>

        <div className="xl:flex items-center xl:mb-0 mb-3">
          <div className="xl:mr-5 mb-1 xl:w-[185px] w-full">
            <p className="text-slate-900 font-lighter text-lg">
              Inspección oídos
            </p>
          </div>

          <div>
            <FormInput
              value={values.earInspection}
              name="earInspection"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] xl:w-[350px] w-full"
            />
          </div>
        </div>
      </div>

      <div className="xl:flex items-center justify-between mb-4">
        <div className="xl:flex items-center xl:mb-0 mb-3">
          <div className="xl:mr-5 mb-1 xl:w-[200px] w-full">
            <p className="text-slate-900 font-lighter text-lg">
              Aparato neurológica
            </p>
          </div>

          <div>
            <FormInput
              value={values.neurologicalInspection}
              name="neurologicalInspection"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] xl:w-[350px] w-full"
            />
          </div>
        </div>

        <div className="xl:flex items-center xl:mb-0 mb-3">
          <div className="xl:mr-5 mb-1 xl:w-[185px] w-full">
            <p className="text-slate-900 font-lighter text-lg">
              Inspección piel
            </p>
          </div>

          <div>
            <FormInput
              value={values.skinInspection}
              name="skinInspection"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] xl:w-[350px] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
