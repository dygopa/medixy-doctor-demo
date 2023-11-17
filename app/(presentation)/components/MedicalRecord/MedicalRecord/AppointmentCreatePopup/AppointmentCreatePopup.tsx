import { Dispatch, SetStateAction } from "react";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { twMerge } from "tailwind-merge";

interface IAppointmentCreatePopupProps {
  showAppointmentCreatePopup: boolean;
  setShowAppointmentCreatePopup: Dispatch<SetStateAction<boolean>>;
}

export default function AppointmentCreatePopup({
  showAppointmentCreatePopup,
  setShowAppointmentCreatePopup,
}: IAppointmentCreatePopupProps) {
  return (
    <div
      className={twMerge([
        "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-hidden bg-gray-900/50 flex flex-col justify-center items-center",
        showAppointmentCreatePopup ? "visible" : "hidden",
      ])}
    >
      <div
        className={twMerge([
          "w-full md:w-[60%] xl:w-[45%] lg:w-[60%] flex overflow-y-hidden flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8",
          "h-[375px] ",
        ])}
      >
        <div className="w-full px-4">
          <div className="mb-5 text-center">
            <div className="w-full px-4">
              <div className="mb-8">
                <p className="font-bold text-2xl text-slate-900">
                  Cita creada con éxito
                </p>
              </div>

              <div className="mb-5 text-center">
                <div className="flex justify-center text-center mb-6">
                  <Lucide icon="CheckCircle" color="#216AD9" size={70} />
                </div>

                <p className="font-normal">
                  ¡Se ha creado tu cita con éxito! Hemos actualizado tu agenda y
                  expediente del paciente con la nueva cita creada.
                </p>
              </div>

              <div className="lg:flex items-center text-center justify-center mt-8">
                <div className="lg:mr-6 lg:mb-0 mb-4">
                  <Button
                    variant="primary"
                    className="w-[275px]"
                    onClick={() => setShowAppointmentCreatePopup(false)}
                  >
                    De acuerdo, gracias
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
