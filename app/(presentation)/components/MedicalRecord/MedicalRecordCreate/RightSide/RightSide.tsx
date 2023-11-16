import { medicalConsultyInitialValues } from "(presentation)/(helper)/medicalRecords/medicalRecordsValues";
import { IUser } from "domain/core/entities/userEntity";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../context/MedicalRecordCreateContext";
import CurrentConsultation from "./CurrentConsultation/CurrentConsultation";
import Diagnosis from "./Diagnosis/Diagnosis";
import Exploration from "./Exploration/Exploration";
import Images from "./Images/Images";
import Orders from "./Orders/Orders";
import Recipe from "./Recipe/Recipe";
import RecoveryStorageModal from "./RecoveryStorageModal/RecoveryStorageModal";

interface IRightSideProps {
  user: IUser;
  width: number;
}

export default function RightSide({ user, width }: IRightSideProps) {
  const { state } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { data: appointment } = state.appointment;

  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const from = searchParams.get("from");

  const [isLoading, setIsLoading] = useState(true);
  const [showRecoveryStorageModal, setShowRecoveryStorageModal] =
    useState(false);
  const [step, setStep] = useState(0);

  const setValuesLocalStorage = () => {
    const valuesFormulary = medicalConsultyInitialValues;

    valuesFormulary.appointmentId = appointment.data.id;

    localStorage.setItem(
      "prosit.storage.medical-record-create",
      JSON.stringify(valuesFormulary)
    );
  };

  const onCheckAppointmentStorage = () => {
    setIsLoading(true);

    let values: any = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    const valuesJSON: any = values ? JSON.parse(values) : null;
    const valuesFormulary = medicalConsultyInitialValues;

    valuesFormulary.appointmentId = appointment.data?.id;

    if (
      valuesJSON &&
      valuesJSON?.appointmentId === appointment.data?.id &&
      JSON.stringify(valuesJSON) !== JSON.stringify(valuesFormulary) &&
      from !== "medical-record-summary"
    )
      setShowRecoveryStorageModal(true);

    if (!valuesJSON || valuesJSON?.appointmentId !== appointment.data?.id) {
      setValuesLocalStorage();
    }

    setIsLoading(false);
  };

  const setInitialStep = () => {
    switch (view) {
      case "current-consultation":
        setStep(0);
        break;
      case "exploration":
        setStep(1);
        break;
      case "diagnosis":
        setStep(2);
        break;
      case "orders":
        setStep(3);
        break;
      case "recipe":
        setStep(4);
        break;
      case "images":
        setStep(5);
        break;

      default:
        setStep(0);
        break;
    }
  };

  useEffect(() => {
    if (view) setInitialStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const getComponentByStep = () => {
    switch (step) {
      case 0:
        return <CurrentConsultation width={width} />;
      case 1:
        return <Exploration />;
      case 2:
        return <Diagnosis />;
      case 3:
        return <Orders user={user} />;
      case 4:
        return <Recipe />;
      case 5:
        return <Images user={user} />;

      default:
        return <div />;
    }
  };

  useEffect(() => {
    onCheckAppointmentStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showRecoveryStorageModal) {
    return (
      <div
        className={twMerge([
          "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
          showRecoveryStorageModal ? "visible" : "hidden",
        ])}
      >
        <div className="w-full md:w-[60%] xl:w-[45%] lg:w-[60%] h-[450px] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8">
          <RecoveryStorageModal
            setShowRecoveryStorageModal={setShowRecoveryStorageModal}
            setValuesLocalStorage={setValuesLocalStorage}
          />
        </div>
      </div>
    );
  }

  if (isLoading) return <div />;

  return (
    <div className="w-full">
      <div className="w-full mb-14">{getComponentByStep()}</div>
    </div>
  );
}
