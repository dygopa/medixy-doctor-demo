import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import {
  IScheduleContext,
  ScheduleContext,
} from "../../context/ScheduleContext";
import RescheduleAppointment from "./RescheduleAppointment/RescheduleAppointment";
import SucessfulMessage from "./SucessfulMessage/SucessfulMessage";
import Summary from "./Summary/Summary";

interface RescheduleModalProps {
  appointment: any;
  showRescheduleModal: boolean;
  setShowRescheduleModal: Dispatch<SetStateAction<boolean>>;
}

export default function RescheduleModal({
  appointment,
  showRescheduleModal,
  setShowRescheduleModal,
}: RescheduleModalProps) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const { rescheduleAppointmentInitialState } = actions;
  const { successful } = state.rescheduleAppointment;

  console.log(successful);

  const [step, setStep] = useState(0);
  const [newAppointment, setNewAppointment] = useState<any>(null);

  useEffect(() => {
    rescheduleAppointmentInitialState()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComponentByStep = () => {
    switch (step) {
      case 0:
        return (
          <RescheduleAppointment
            appointment={appointment}
            setNewAppointment={setNewAppointment}
            setShowRescheduleModal={setShowRescheduleModal}
            setStep={setStep}
          />
        );
      case 1:
        return (
          <Summary
            patient={appointment}
            appointment={appointment}
            setStep={setStep}
            newAppointment={newAppointment}
          />
        );
      case 2:
        return (
          <SucessfulMessage setShowRescheduleModal={setShowRescheduleModal} />
        );

      default:
        break;
    }
  };

  return (
    <div
      className={twMerge([
        "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
        showRescheduleModal ? "visible" : "hidden",
      ])}
    >
      <div
        className={twMerge([
          "w-full md:w-[60%] xl:w-[45%] lg:w-[60%]  overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8",
          step === 0 ? "h-[900px]" : step === 1 ? "h-[650px]" : "h-[450px]",
        ])}
      >
        <div className="w-full px-4">
          <div className="mb-14">
            <p className="font-bold text-2xl text-slate-900">Reagendar cita</p>
          </div>

          <div className="mb-5 text-center">{getComponentByStep()}</div>
        </div>
      </div>
    </div>
  );
}
