import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import RescheduleAppointment from "./RescheduleAppointment/RescheduleAppointment";
import SucessfulMessage from "./SucessfulMessage/SucessfulMessage";
import Summary from "./Summary/Summary";
import { FiChevronLeft } from "react-icons/fi";

interface RescheduleModalProps {
  appointment: any;
  showRescheduleModal: boolean;
  setShowRescheduleModal: Dispatch<SetStateAction<boolean>>;
}

export default function Reschedule({
  appointment,
  showRescheduleModal,
  setShowRescheduleModal,
}: RescheduleModalProps) {
  const [step, setStep] = useState(0);
  const [newAppointment, setNewAppointment] = useState<any>(null);

  return (
    <>
      <div className="w-full flex flex-col justify-start items-start">
        <div className="w-full flex justify-start items-center gap-2">
          <span
            onClick={() => { setShowRescheduleModal(false) }}
            className="cursor-pointer text-lg text-slate-900">
            <FiChevronLeft />
          </span>
          <p className="font-bold text-2xl text-slate-900">Reagendar cita {step}</p>
        </div>
        <p className="font-light text-sm text-slate-500">Selecciona la fecha nueva y hora para la cita actual.</p>
      </div>
      <div className="w-full mb-5 text-center">
        { step === 0 && 
          <RescheduleAppointment
            appointment={appointment}
            setNewAppointment={setNewAppointment}
            setShowRescheduleModal={setShowRescheduleModal}
            setStep={setStep}
          /> 
        }
        { step === 1 && 
          <Summary
            patient={appointment}
            appointment={appointment}
            setStep={setStep}
            newAppointment={newAppointment}
          />
        }
        { step === 2 && 
          <SucessfulMessage setShowRescheduleModal={setShowRescheduleModal} />
        }
      </div>
    </>
  );
}
