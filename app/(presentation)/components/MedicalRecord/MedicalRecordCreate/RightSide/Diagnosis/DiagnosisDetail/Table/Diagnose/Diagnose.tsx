import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { Dispatch, SetStateAction } from "react";

type valuesTypes = {
  diagnose: ICIE10[];
  observations: string;
};

interface IDiagnoseProps {
  cie10: ICIE10;
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function Diagnose({ cie10, values, setValues }: IDiagnoseProps) {
  return (
    <div className="flex items-center justify-between bg-gray-400 p-3 rounded-md bg-opacity-10">
      <div className="w-full">
        <p className="text-md text-slate-900 font-normal">
          {cie10.description4}
        </p>
      </div>

      <div className="text-center flex items-center justify-center">
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
