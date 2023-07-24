import AuthLayout from "(presentation)/(layouts)/AuthLayout/AuthLayout";
import RecoveryPasswordIndex from "(presentation)/components/RecoveryPassword/RecoveryPasswordIndex";

export default async function RecoveryPasswordPage() {
  return (
    <AuthLayout>
      <RecoveryPasswordIndex />
    </AuthLayout>
  );
}
