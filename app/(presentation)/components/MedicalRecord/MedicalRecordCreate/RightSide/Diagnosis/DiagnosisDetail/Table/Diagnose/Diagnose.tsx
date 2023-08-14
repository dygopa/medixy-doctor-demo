import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

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
    <div className="flex items-center justify-between bg-gray-400 p-3 rounded-md bg-opacity-10">
      <div className="w-full">
        <p className="text-md text-slate-900 font-normal">
          {cie10.description4}
        </p>
      </div>

      <div className="text-center flex items-center justify-center">
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
