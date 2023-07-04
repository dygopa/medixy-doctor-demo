import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import MedicalRecordSummaryIndex from "(presentation)/components/MedicalRecord/MedicalRecordSummary/MedicalRecordSummaryIndex";
import Providers from "./providers";

export default async function MedicalRecordCreateSummaryPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AppLayout
      showStepsBySteps={false}
      title="Resumen de la consulta"
      pathname={
        MedicalRecordRoutesEnum.MedicalRecord +
        params.id +
        MedicalRecordRoutesEnum.MedicalRecordSummary
      }
    >
      <Providers>
        <MedicalRecordSummaryIndex id={parseInt(params.id, 10)} />
      </Providers>
    </AppLayout>
  );
}
