import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

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

  const getRedirectMedicalRecordCreate = () => {
    if (appointmentId) {
      return (
        MedicalRecordRoutesEnum.MedicalRecord +
        appointmentId +
        MedicalRecordRoutesEnum.MedicalRecordCreate +
        "?type=appointment"
      );
    }

    return (
      MedicalRecordRoutesEnum.MedicalRecord +
      medicalConsulty.subjectId +
      MedicalRecordRoutesEnum.MedicalRecordCreate
    );
  };

  const onCloseMedicalConsulty = () => {
    if (!medicalRecordId) {
      setMedicalConsulty(null);
      return;
    }

    router.push(getRedirectMedicalRecordCreate());
  };

  return (
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
          <h1 className="text-slate-900 text-2xl font-bold">
            Resumen de la consulta
          </h1>
        </div>
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
  );
}
