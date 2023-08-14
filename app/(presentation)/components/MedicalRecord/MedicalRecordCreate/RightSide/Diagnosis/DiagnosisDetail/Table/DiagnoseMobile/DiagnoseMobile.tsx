import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { Dispatch, SetStateAction } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type valuesTypes = {
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
  const onSetPrincipalDiagnose = (cie10Item: ICIE10) => {
    const newState = values.diagnose.map((obj) => {
      if (obj.id === cie10Item.id) {
        return { ...obj, isPrincipal: true };
      }

      return { ...obj, isPrincipal: false };
    });

    setValues({ ...values, diagnose: newState });
  };

  const onDeleteDiagnose = (cie10Item: ICIE10) => {
    let newState = values.diagnose.filter(
      (valueDiagnoseFilter) => valueDiagnoseFilter.id !== cie10Item.id
    );

    if (cie10Item.isPrincipal && newState.length > 0)
      newState[0].isPrincipal = true;

    setValues({ ...values, diagnose: newState });
  };

  return (
    <div className="mt-2 overflow-auto intro-x bg-white border rounded-lg p-4 flex flex-col justify-between items-start gap-4">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="w-full flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/40 text-primary flex justify-center items-center rounded-md text-xl">
            <Lucide icon="Activity" color="#22345F" size={25} />
          </div>

          <div className="relative flex flex-col justify-center items-start">
            <p className="font-light text-sm text-slate-500">
              {cie10.description4}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <div className="mr-3">
          <button
            type="button"
            onClick={() => onSetPrincipalDiagnose(cie10)}
            disabled={cie10.isPrincipal}
            className="text-center flex justify-center w-full"
          >
            {!cie10.isPrincipal ? (
              <AiOutlineStar
                className="text-2xl cursor-pointer text-yellow-500"
                title="Principal"
              />
            ) : (
              <AiFillStar
                className="text-2xl cursor-pointer text-yellow-500"
                title="Principal"
              />
            )}
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => onDeleteDiagnose(cie10)}
            className="text-center flex justify-center w-full"
          >
            <Lucide icon="Trash2" color="#e11d48" size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
