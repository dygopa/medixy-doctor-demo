import {
  PatientsMedicalRecordRoutesEnum,
  PatientsRoutesEnum,
} from "(presentation)/(routes)/patientsRoutes";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface IHeaderProps {
  patientId: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ patientId, setIsOpen }: IHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between bg-primary p-4">
      <div>
        <h3 className="text-white text-lg font-bold">Detalle de la consulta</h3>
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            router.push(
              PatientsRoutesEnum.PatientsView +
                patientId +
                PatientsMedicalRecordRoutesEnum.MedicalRecord
            );
          }}
        >
          <Lucide icon="X" color="#fff" size={30} />
        </button>
      </div>
    </div>
  );
}
