import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { PatientsMedicalRecordRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import MedicalRecordCreateSummaryIndex from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecordCreate/MedicalRecordCreateSummary/MedicalRecordCreateSummaryIndex";
import Providers from "./providers";

export default async function MedicalRecordCreateSummaryPage({
  params,
}: {
  params: { subjectId: string };
}) {
  return (
    <AppLayout
      showStepsBySteps={false}
      title="Nueva consulta"
      pathname={PatientsMedicalRecordRoutesEnum.MedicalRecord}
    >
      <Providers>
        <MedicalRecordCreateSummaryIndex
          subjectId={parseInt(params.subjectId, 10)}
        />
      </Providers>
    </AppLayout>
  );
}
