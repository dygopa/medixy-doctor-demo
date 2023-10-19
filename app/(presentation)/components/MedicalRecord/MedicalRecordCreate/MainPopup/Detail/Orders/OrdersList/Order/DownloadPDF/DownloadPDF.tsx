import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "(presentation)/components/MedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import { IUser } from "domain/core/entities/userEntity";
import { useContext } from "react";

interface IDownloadPDFProps {
  user: IUser;
  medicalRecord: IMedicalRecord;
}

export default function DownloadPDF({
  user,
  medicalRecord,
}: IDownloadPDFProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { getMedicalRecordPDF } = actions;
  const { loading, error } = state.getMedicalRecordPDF;

  return (
    <>
      <AlertComponent
        variant="error"
        show={error !== null}
        description="Algo ha salido mal. Vuelve a intentarlo"
      />

      <div>
        <Button
          variant="outline-primary"
          size="sm"
          disabled={loading}
          onClick={() =>
            getMedicalRecordPDF({
              doctor: user,
              medicalRecord: medicalRecord,
            })(dispatch)
          }
        >
          <div className="flex items-center">
            <div className="mr-2">
              <Lucide icon="FilePlus" color="#216AD9" size={20} />
            </div>

            <div>Generar PDF de la orden</div>
          </div>
        </Button>
      </div>
    </>
  );
}
