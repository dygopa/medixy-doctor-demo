import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "(presentation)/components/MedicalRecord/MedicalRecord/context/MedicalRecordContext";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import { useContext } from "react";

interface IDownloadPDFProps {
  medicalRecord: IMedicalRecord;
}

export default function DownloadPDF({ medicalRecord }: IDownloadPDFProps) {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: user } = authState.getUserAuthenticated;

  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getMedicalRecordPDF } = actions;
  const { loading, error } = state.getMedicalRecordPDF;

  return (
    <>
      <AlertComponent
        variant="error"
        show={error !== null}
        description="Algo ha salido mal. Vuelve a intentarlo"
      />

      <div className="mt-3">
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
              <Lucide icon="FileText" color="#216AD9" size={20} />
            </div>

            <div>Generar PDF de la orden</div>
          </div>
        </Button>
      </div>
    </>
  );
}