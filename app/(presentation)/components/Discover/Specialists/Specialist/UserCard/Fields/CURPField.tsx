import { JiraInput } from "(presentation)/components/core/JiraInput/JiraInput";
import { Specialist } from "domain/core/entities/specialists/specialist";
import { Dispatch, SetStateAction } from "react";

interface ICURPFieldProps {
  handleOnClick: (value: string) => void;
  setUserObject: Dispatch<SetStateAction<any>>;
  loading: boolean;
  specialist: Specialist;
  userObject: any;
  step: number;
}

export default function CURPField({
  handleOnClick,
  setUserObject,
  loading,
  specialist,
  userObject,
  step,
}: ICURPFieldProps) {
  return (
    <div className="flex w-full justify-start items-center px-1">
      <span className="block w-[30%] text-base text-slate-500 font-light">
        N° de CURP:
      </span>
      <div className="w-[70%] flex justify-start items-center">
        <JiraInput
          onClick={() => {
            handleOnClick("curp");
          }}
          disabled={step === 0}
          customStyleText={"text-base text-slate-500 font-light"}
          customType="text"
          loading={loading}
          text={specialist.curp}
          onChange={(e) => {
            setUserObject({ ...userObject, curp: e.target.value });
          }}
        />
      </div>
    </div>
  );
}
