import AdminAppLayout from "(presentation)/(layouts)/AdminAppLayout/AdminAppLayout";
import { AdminAccountRoutesEnum } from "(presentation)/(routes)/admin/accountRoutes";
import LogoutIndex from "(presentation)/components/Admin/Logout/LogoutIndex";

export default async function AdminLogoutPage() {
  return (
    <AdminAppLayout
      title="Prosit"
      pathname={AdminAccountRoutesEnum.SignIn}
    >
      <LogoutIndex />
    </AdminAppLayout>
  );
}
