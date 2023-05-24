import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { PatientsMedicalRecordRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import MedicalRecordIndex from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecord/MedicalRecordIndex";
import Providers from "./providers";

export default async function MedicalRecordPage({
  params,
}: {
  params: { patientId: string };
}) {
  return (
    <AppLayout
      showStepsBySteps={false}
      title="Expediente médico"
      pathname={PatientsMedicalRecordRoutesEnum.MedicalRecord}
    >
      <Providers>
        <MedicalRecordIndex patientId={parseInt(params.patientId, 10)} />
      </Providers>
    </AppLayout>
  );
}
