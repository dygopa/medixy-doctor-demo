import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import MedicalRecordIndex from "(presentation)/components/MedicalRecord/MedicalRecord/MedicalRecordIndex";
import Providers from "./providers";

export default async function MedicalRecordPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AppLayout
      showStepsBySteps={false}
      title="Expediente médico"
      pathname={MedicalRecordRoutesEnum.MedicalRecord}
    >
      <Providers>
        <MedicalRecordIndex subjectId={parseInt(params.id, 10)} />
      </Providers>
    </AppLayout>
  );
}
