import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import MedicalRecordCreateIndex from "(presentation)/components/MedicalRecord/MedicalRecordCreate/MedicalRecordCreateIndex";
import Providers from "./providers";

export default async function MedicalRecordCreatePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AppLayout
      showStepsBySteps={false}
      title="Nueva consulta"
      pathname={MedicalRecordRoutesEnum.MedicalRecord}
    >
      <Providers>
        <MedicalRecordCreateIndex subjectId={parseInt(params.id, 10)} />
      </Providers>
    </AppLayout>
  );
}
