import { medicalConsultyInitialValues } from "(presentation)/(helper)/medicalRecords/medicalRecordsValues";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../context/MedicalRecordCreateContext";
import CurrentConsultation from "./CurrentConsultation/CurrentConsultation";
import Diagnosis from "./Diagnosis/Diagnosis";
import Orders from "./Orders/Orders";
import Recipe from "./Recipe/Recipe";
import Records from "./Records/Records";
import RecoveryStorageModal from "./RecoveryStorageModal/RecoveryStorageModal";
import VitalSigns from "./VitalSigns/VitalSigns";

interface IRightSideProps {
  width: number;
}

export default function RightSide({ width }: IRightSideProps) {
  const { state } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { data: appointment } = state.appointment;

  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const [isLoading, setIsLoading] = useState(true);
  const [showRecoveryStorageModal, setShowRecoveryStorageModal] =
    useState(false);

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
      <div className="w-full mb-14">
        <VitalSigns />
      </div>

      <div className="w-full mb-14">
        <Records />
      </div>

      <div className="w-full mb-14">
        <CurrentConsultation width={width} />
      </div>

      <div className="w-full mb-14">
        <Diagnosis />
      </div>

      <div className="w-full mb-14">
        <Orders />
      </div>

      <div className="w-full mb-14">
        <Recipe />
      </div>
    </div>
  );
}
