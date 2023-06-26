import AdminAuthLayout from "(presentation)/(layouts)/AdminAuthLayout/AdminAuthLayout";
import AdminSigninIndex from "(presentation)/components/Admin/Signin/AdminSignInIndex";

export default async function SignInPage() {
  return (
    <AdminAuthLayout>
      <AdminSigninIndex />
    </AdminAuthLayout>
  );
}
