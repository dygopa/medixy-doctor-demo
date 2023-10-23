import { JiraInput } from "(presentation)/components/core/JiraInput/JiraInput";
import { Specialist } from "domain/core/entities/specialists/specialist";
import { Dispatch, SetStateAction } from "react";

interface IAboutMeFieldProps {
  handleOnClick: (value: string) => void;
  setUserObject: Dispatch<SetStateAction<any>>;
  loading: boolean;
  specialist: Specialist;
  userObject: any;
  step: number;
}

export default function AboutMeField({
  handleOnClick,
  setUserObject,
  loading,
  specialist,
  userObject,
  step,
}: IAboutMeFieldProps) {
  return (
    <div className="w-full relative h-fit flex flex-col justify-start items-start gap-6">
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <p className="text-lg text-slate-900 font-semibold">
          Información sobre mí
        </p>
        <div className="w-full bg-slate-300 h-px block relative"></div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <p className="text-base text-slate-500 font-light w-full">
          <JiraInput
            onClick={() => {
              handleOnClick("aboutMe");
            }}
            disabled={step === 0}
            customStyleText={"text-base text-slate-500 font-light"}
            customType="textarea"
            text={specialist?.aboutMe}
            loading={loading}
            onChange={(e) => {
              setUserObject({ ...userObject, aboutMe: e.target.value });
            }}
          />
        </p>
      </div>
    </div>
  );
}
