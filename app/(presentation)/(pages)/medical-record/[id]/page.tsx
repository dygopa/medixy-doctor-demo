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
      title="Expediente Médico"
      pathname={
        MedicalRecordRoutesEnum.MedicalRecord + params.id + "?type=appointment"
      }
    >
      <Providers>
        <MedicalRecordIndex id={params.id} />
      </Providers>
    </AppLayout>
  );
}
