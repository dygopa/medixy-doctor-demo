import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import AccountIndex from "(presentation)/components/Account/AccountIndex";
import LocalitiesListIndex from "(presentation)/components/Localities/LocalitiesListIndex";
import PatientsViewIndex from "(presentation)/components/Patients/PatientsView/PatientsViewIndex";
import { IUser } from "domain/core/entities/userEntity";

export default async function LocalitiesPage() {
  return (
    <AppLayout
      user={{} as IUser}
      title="Paciente"
      pathname={PatientsRoutesEnum.PatientsView}
    >
      <PatientsViewIndex />
    </AppLayout>
  );
}
