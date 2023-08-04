import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import AccountIndex from "(presentation)/components/Account/AccountIndex";
import LocalitiesListIndex from "(presentation)/components/Localities/LocalitiesListIndex";
import PatientsListIndex from "(presentation)/components/Patients/PatientsList/PatientsListIndes";

export default async function LocalitiesPage() {
  return (
    <AppLayout title="Mis Pacientes" pathname={PatientsRoutesEnum.PatientsList}>
      <PatientsListIndex/>
    </AppLayout>
  );
}
