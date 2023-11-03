import { JiraInput } from "(presentation)/components/core/JiraInput/JiraInput";
import TooltipIndicator from "(presentation)/components/core/TooltipIndacator/tooltipIndicator";
import clsx from "clsx";
import { Specialist } from "domain/core/entities/specialists/specialist";
import { Dispatch, SetStateAction } from "react";

interface IShortDescriptionFieldProps {
  handleOnClick: (value: string) => void;
  setUserObject: Dispatch<SetStateAction<any>>;
  loading: boolean;
  specialist: Specialist;
  userObject: any;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ShortDescriptionField({
  handleOnClick,
  setUserObject,
  loading,
  specialist,
  userObject,
  step,
  setStep,
}: IShortDescriptionFieldProps) {
  return (
    <>
      {step === 3 && (
        <>
          <div className="absolute z-[201] lg:top-[145px] md:top-[145px] lg:left-[600px] md:left-[420px] lg:block md:block hidden">
            <TooltipIndicator
              tittle="Escribe una descripción corta"
              description="Da un resumen corto de ti y tus servicios como profesional para ser visualizados por tus pacientes"
              onClick={
                loading || userObject?.shortDescription?.length === 0
                  ? () => {}
                  : () => {
                      handleOnClick("shortDescription");
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
              tittle="Escribe una descripción corta"
              description="Da un resumen corto de ti y tus servicios como profesional para ser visualizados por tus pacientes"
              onClick={
                loading || userObject?.shortDescription?.length === 0
                  ? () => {}
                  : () => {
                      handleOnClick("shortDescription");
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
          step === 3 && "fixed z-[201] bg-slate-200",
        ])}
      >
        <JiraInput
          onClick={() => {}}
          customStyleText={"text-base text-slate-500 font-light"}
          customType="textarea"
          loading={loading}
          disabledButton
          disabled={step === 0}
          text={
            specialist.shortDescription !== ""
              ? specialist.shortDescription
              : "Descripción corta de tí"
          }
          placeholder="Descripción corta de tí"
          onChange={(e) => {
            setUserObject({
              ...userObject,
              shortDescription: e.target.value,
            });
          }}
        />
      </div>
    </>
  );
}
