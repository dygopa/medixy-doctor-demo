import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface IHeaderProps {
  subjectId: number;
  appointmentId: string | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({
  subjectId,
  appointmentId,
  setIsOpen,
}: IHeaderProps) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const view = searchParams.get("view");

  const getRedirectMedicalRecordCreate = () => {
    if (appointmentId) {
      return (
        MedicalRecordRoutesEnum.MedicalRecord +
        appointmentId +
        MedicalRecordRoutesEnum.MedicalRecordCreate +
        `?view=${view ?? "current-consultation"}&type=appointment`
      );
    }

    return (
      MedicalRecordRoutesEnum.MedicalRecord +
      subjectId +
      MedicalRecordRoutesEnum.MedicalRecordCreate
    );
  };

  return (
    <div className="flex items-center justify-between bg-primary p-4">
      <div>
        <h3 className="text-white text-lg font-bold">Información Detallada</h3>
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            router.push(getRedirectMedicalRecordCreate());
          }}
        >
          <Lucide icon="close" color="#fff" size={30} />
        </button>
      </div>
    </div>
  );
}
