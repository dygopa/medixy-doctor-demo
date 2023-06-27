import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import MedicalRecordCreateSummaryIndex from "(presentation)/components/MedicalRecord/MedicalRecordCreate/MedicalRecordCreateSummary/MedicalRecordCreateSummaryIndex";
import Providers from "./providers";

export default async function MedicalRecordCreateSummaryPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AppLayout
      showStepsBySteps={false}
      title="Nueva consulta"
      pathname={
        MedicalRecordRoutesEnum.MedicalRecord +
        params.id +
        MedicalRecordRoutesEnum.MedicalRecordCreate +
        MedicalRecordRoutesEnum.MedicalRecordCreateSummary +
        "?type=appointment"
      }
    >
      <Providers>
        <MedicalRecordCreateSummaryIndex id={params.id} />
      </Providers>
    </AppLayout>
  );
}
