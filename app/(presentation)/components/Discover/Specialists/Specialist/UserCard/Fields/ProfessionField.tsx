import { JiraInput } from "(presentation)/components/core/JiraInput/JiraInput";
import TooltipIndicator from "(presentation)/components/core/TooltipIndacator/tooltipIndicator";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface IProfessionFieldProps {
  handleOnClick: (value: string) => void;
  setUserObject: Dispatch<SetStateAction<any>>;
  loading: boolean;
  userObject: any;
  listProfesions: any;
  profesion: any;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ProfessionField({
  handleOnClick,
  setUserObject,
  loading,
  userObject,
  listProfesions,
  profesion,
  step,
  setStep,
}: IProfessionFieldProps) {
  return (
    <>
      {step === 2 && (
        <>
          <div className="absolute z-[201] lg:top-[105px] md:top-[105px] lg:left-[600px] md:left-[420px] lg:block md:block hidden">
            <TooltipIndicator
              tittle="Selecciona una especialidad"
              description="Escoge la especialidad a la que te dedicas y tus pacientes puedan saberlo."
              onClick={
                loading || !userObject?.pwaProfessionId
                  ? () => {}
                  : () => {
                      handleOnClick("pwaProfessionId");
                    }
              }
              tittleButton={loading ? "Guardando" : "Guardar"}
              direcction={"left"}
              secondaryTittleButton="Volver"
              secondaryDisabledButton={false}
              onClickSecondary={
                loading
                  ? () => {}
                  : () => {
                      setStep(step - 1);
                    }
              }
            />
          </div>

          <div className="absolute z-[201] top-[230px] left-2 right-2 lg:hidden md:hidden block">
            <TooltipIndicator
              tittle="Selecciona una especialidad"
              description="Escoge la especialidad a la que te dedicas y tus pacientes puedan saberlo."
              onClick={
                loading || !userObject?.pwaProfessionId
                  ? () => {}
                  : () => {
                      handleOnClick("pwaProfessionId");
                    }
              }
              tittleButton={loading ? "Guardando" : "Guardar"}
              direcction={"top"}
              secondaryTittleButton="Volver"
              secondaryDisabledButton={false}
              onClickSecondary={
                loading
                  ? () => {}
                  : () => {
                      setStep(step - 1);
                    }
              }
            />
          </div>
        </>
      )}

      <div
        className={clsx([
          "w-[225px]",
          step === 2 && "fixed z-[201] bg-slate-200",
        ])}
      >
        <JiraInput
          onClick={() => {}}
          disabled={step === 0}
          customStyleText={"text-base text-slate-500 font-light"}
          placeholder={"Selecciona tu especialidad"}
          customType="select"
          text={userObject?.pwaProfessionName ?? "Selecciona tu especialidad"}
          loading={loading}
          disabledButton
          customList={listProfesions.map((value: any) => ({
            id: value.id,
            value: value.name,
          }))}
          onChange={(e) => {
            const profession = listProfesions.find(
              (professionFind: any) =>
                professionFind.id === parseInt(e.target.value, 10)
            );

            setUserObject({
              ...userObject,
              pwaProfessionId: e.target.value,
              pwaProfessionName: profession?.name ?? "",
            });
          }}
        />
      </div>
    </>
  );
}
