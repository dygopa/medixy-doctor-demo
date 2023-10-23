import { JiraInput } from "(presentation)/components/core/JiraInput/JiraInput";
import { Specialist } from "domain/core/entities/specialists/specialist";
import { Dispatch, SetStateAction } from "react";

interface INameFieldProps {
  handleOnClick: (value: string) => void;
  setUserObject: Dispatch<SetStateAction<any>>;
  loading: boolean;
  specialist: Specialist;
  userObject: any;
  step: number;
}

export default function NameField({
  handleOnClick,
  setUserObject,
  loading,
  specialist,
  userObject,
  step,
}: INameFieldProps) {
  return (
    <JiraInput
      onClick={() => {
        handleOnClick("names");
      }}
      customStyleText={"text-lg text-slate-900 font-semibold"}
      customType="text"
      loading={loading}
      disabled={step === 0}
      text={`${specialist?.names} ${specialist?.firstName}`}
      onChange={(e) => {
        setUserObject({ ...userObject, names: e.target.value });
      }}
    />
  );
}
