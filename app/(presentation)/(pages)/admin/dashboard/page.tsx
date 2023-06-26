import AdminAppLayout from "(presentation)/(layouts)/AdminAppLayout/AdminAppLayout";
import { AdminDashboardRoutesEnum } from "(presentation)/(routes)/admin/dashboardRoutes";
import DashboardIndex from "(presentation)/components/Admin/Dashboard/DashboardIndex";
import Providers from "./providers";

export default async function DashboardPage() {
  return (
    <AdminAppLayout
      title="Tablero"
      pathname={AdminDashboardRoutesEnum.Dashboard}
    >
      <Providers>
        <DashboardIndex />
      </Providers>
    </AdminAppLayout>
  );
}
