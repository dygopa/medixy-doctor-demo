import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { PatientsMedicalRecordRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import MedicalRecordCreateIndex from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecordCreate/MedicalRecordCreateIndex";
import Providers from "./providers";

export default async function MedicalRecordCreatePage({
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
        <MedicalRecordCreateIndex patientId={parseInt(params.patientId, 10)} />
      </Providers>
    </AppLayout>
  );
}
