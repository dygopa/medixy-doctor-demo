import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import QrCodeModal from "./QrCodeModal/QrCodeModal";

interface ITitleProps {
  medicalConsulty: IMedicalConsulty;
  setMedicalConsulty: Dispatch<SetStateAction<IMedicalConsulty | null>>;
  appointmentId: string | null;
}

export default function Title({
  medicalConsulty,
  setMedicalConsulty,
  appointmentId,
}: ITitleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const medicalRecordId = searchParams.get("medical_record_id");

  const [showQrCodeModal, setShowQrCodeModal] = useState(false);

  const getRedirectMedicalRecord = () => {
    if (appointmentId) {
      return (
        MedicalRecordRoutesEnum.MedicalRecord +
        appointmentId +
        "?type=appointment"
      );
    }

    return MedicalRecordRoutesEnum.MedicalRecord + medicalConsulty.subjectId;
  };

  const onCloseMedicalConsulty = () => {
    if (!medicalRecordId) {
      setMedicalConsulty(null);
      return;
    }

    router.push(getRedirectMedicalRecord());
  };

  return (
    <>
      <div className="lg:flex md:flex items-center justify-between py-3">
        <div className="flex items-center">
          <div className="mr-4">
            <button
              type="button"
              className="hover:bg-dark hover:bg-opacity-10 w-[35px] h-[35px] rounded-full"
              onClick={() => onCloseMedicalConsulty()}
            >
              <i className="fa-solid fa-arrow-left text-xl" />
            </button>
          </div>

          <div className="lg:text-left md:text-left text-center">
            <div>
              <h1 className="text-slate-900 text-2xl font-bold">
                Resumen de la consulta
              </h1>
            </div>

            {medicalConsulty.consultationDate && (
              <div className="lg:text-left md:text-left text-center">
                <h1 className="text-slate-400 text-lg">
                  {new Date(medicalConsulty.consultationDate).getDate()}/
                  {new Date(medicalConsulty.consultationDate).getMonth()}/
                  {new Date(medicalConsulty.consultationDate).getFullYear()}
                </h1>
              </div>
            )}
          </div>
        </div>

        <div>
          <Button
            variant="primary"
            className="w-[60px] px-0"
            onClick={() => setShowQrCodeModal(true)}
          >
            <Lucide icon="QrCode" color="#fff" size={25} />
          </Button>
        </div>
      </div>

      <div
        className={twMerge([
          "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
          showQrCodeModal ? "visible" : "hidden",
        ])}
      >
        <div className="w-full md:w-[60%] lg:w-[40%] h-[450px] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8">
          <QrCodeModal
            medicalConsulty={medicalConsulty}
            setShowQrCodeModal={setShowQrCodeModal}
          />
        </div>
      </div>
    </>
  );
}
