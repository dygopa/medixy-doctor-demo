import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { PatientsMedicalRecordRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import MedicalRecordCreateSummaryIndex from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecordCreate/MedicalRecordCreateSummary/MedicalRecordCreateSummaryIndex";
import Providers from "./providers";

export default async function MedicalRecordCreateSummaryPage({
  params,
}: {
  params: { patientId: string };
}) {
  return (
    <AppLayout
      showStepsBySteps={false}
      title="Nueva consulta"
      pathname={PatientsMedicalRecordRoutesEnum.MedicalRecord}
    >
      <Providers>
        <MedicalRecordCreateSummaryIndex
          patientId={parseInt(params.patientId, 10)}
        />
      </Providers>
    </AppLayout>
  );
}
