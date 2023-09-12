import AdminAppLayout from "(presentation)/(layouts)/AdminAppLayout/AdminAppLayout";
import { AdminAccountRoutesEnum } from "(presentation)/(routes)/admin/accountRoutes";
import Index from "(presentation)/components/Admin/Index/Index";

export default async function DashboardPage() {
  return (
    <AdminAppLayout
      title="Prosit"
      pathname={AdminAccountRoutesEnum.SignIn}
    >
      <Index />
    </AdminAppLayout>
  );
}