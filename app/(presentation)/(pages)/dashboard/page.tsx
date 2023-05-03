import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import DashboardIndex from "(presentation)/components/Dashboard/DashboardIndex";

export default async function DashboardPage() {
  return (
    <AppLayout title="Inicio" pathname={DashboardRoutesEnum.Dashboard}>
      <DashboardIndex/>
    </AppLayout>
  );
}
