import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import DoctorsListIndex from "(presentation)/components/Admin/Doctors/DoctorsList/DoctorsListIndex";

export default async function DashboardPage() {
  return (
    <AppLayout title="Doctores" pathname={DashboardRoutesEnum.Dashboard}>
      <DoctorsListIndex />
    </AppLayout>
  );
}
