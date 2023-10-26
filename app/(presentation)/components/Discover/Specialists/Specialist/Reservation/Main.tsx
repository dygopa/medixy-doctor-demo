import TooltipIndicator from "(presentation)/components/core/TooltipIndacator/tooltipIndicator";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { DataSelection } from "./DataSelection";

interface IReservationCardProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setFinishedStep: Dispatch<SetStateAction<boolean>>;
}

const ReservationCard = ({
  step,
  setStep,
  setFinishedStep,
}: IReservationCardProps) => {
  return (
    <>
      {step === 4 && (
        <>
          <div className="absolute z-[201] top-28 xl:left-[325px] lg:left-[125px] md:left-[7px] lg:block md:block hidden">
            <TooltipIndicator
              tittle="Agendar cita"
              description="Acá podrán tus pacientes o futuros pacientes que te encuentren en la plataforma, agendar citas en tus diferentes consultorios digitales"
              onClick={() => {
                setStep(5);
                setFinishedStep(true);
              }}
              tittleButton="De acuerdo"
              direcction="rigth"
            />
          </div>

          <div className="absolute z-[201] top-[300px] xl:left-[850px] lg:left-[550px] md:left-[470px] left-2 right-2 lg:hidden md:hidden block">
            <TooltipIndicator
              tittle="Agendar cita"
              description="Acá podrán tus pacientes o futuros pacientes que te encuentren en la plataforma, agendar citas en tus diferentes consultorios digitales"
              onClick={() => {
                setStep(5);
                setFinishedStep(true);
              }}
              tittleButton="De acuerdo"
              direcction="bootom"
            />
          </div>
        </>
      )}

      <div
        className={twMerge([
          "bg-white rounded-lg p-6 shadow-sm border xl:w-[500px] lg:w-[450px] md:w-[450px] w-[370px] lg:mt-0 md:mt-0 mt-4 mb-4",
          step === 4 && "absolute z-[200]",
        ])}
      >
        <div className="w-full h-fit pb-3 mb-3 border-b border-slate-300">
          <p className="text-lg text-slate-900 font-semibold">Agendar cita</p>
        </div>
        <DataSelection />
      </div>
    </>
  );
};

export default ReservationCard;
