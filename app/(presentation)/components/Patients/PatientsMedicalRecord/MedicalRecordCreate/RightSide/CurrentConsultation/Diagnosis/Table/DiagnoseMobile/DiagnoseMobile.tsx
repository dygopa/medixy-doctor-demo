import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { Dispatch, SetStateAction } from "react";

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
  diagnose: ICIE10[];
  observations: string;
};

interface IDiagnoseMobileProps {
  cie10: ICIE10;
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function DiagnoseMobile({
  cie10,
  values,
  setValues,
}: IDiagnoseMobileProps) {
  return (
    <div className="mt-2 overflow-auto intro-x bg-white border rounded-lg p-4 flex flex-col justify-between items-start gap-4">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="w-full flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/40 text-primary flex justify-center items-center rounded-md text-xl">
            <Lucide icon="Activity" color="#22345F" size={25} />
          </div>

          <div className="relative flex flex-col justify-center items-start">
            <p className="font-semibold text-xl text-gray-950">{cie10.code4}</p>
            <p className="font-light text-sm text-slate-500">
              {cie10.description4}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <div>
          <button
            type="button"
            onClick={() => {
              setValues({
                ...values,
                diagnose: values.diagnose.filter(
                  (valueDiagnoseFilter) => valueDiagnoseFilter.id !== cie10.id
                ),
              });
            }}
            className="text-center flex justify-center w-full"
          >
            <Lucide icon="Trash2" color="#e11d48" size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
