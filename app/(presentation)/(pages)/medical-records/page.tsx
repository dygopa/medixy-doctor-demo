import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import MedicalRecordsListIndex from "(presentation)/components/MedicalRecord/MedicalRecordsList/MedicalRecordsListIndex";

export default async function MedicalRecordsListPage() {
  return (
    <AppLayout
      showStepsBySteps
      title="Mis consultas"
      pathname={MedicalRecordRoutesEnum.MedicalRecordList}
    >
      <MedicalRecordsListIndex />
    </AppLayout>
  );
}
