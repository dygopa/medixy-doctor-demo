import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import { PatientsMedicalRecordRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import AccountIndex from "(presentation)/components/Account/AccountIndex";
import LocalitiesListIndex from "(presentation)/components/Localities/LocalitiesListIndex";
import MedicalRecordIndex from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecord/MedicalRecordIndex";

export default async function LocalitiesPage() {
  return (
    <AppLayout title="Expediente médico" pathname={PatientsMedicalRecordRoutesEnum.MedicalRecord}>
      <MedicalRecordIndex/>
    </AppLayout>
  );
}
