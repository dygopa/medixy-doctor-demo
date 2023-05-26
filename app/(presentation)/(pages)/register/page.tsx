import AuthLayout from "(presentation)/(layouts)/AuthLayout/AuthLayout";
import RegisterIndex from "(presentation)/components/Register/RegisterIndex";

export default async function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterIndex />
    </AuthLayout>
  );
}
