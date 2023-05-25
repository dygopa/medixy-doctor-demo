import AuthLayout from "(presentation)/(layouts)/AuthLayout/AuthLayout";
import SignInIndex from "(presentation)/components/SignIn/SignInIndex";

export default async function SignInPage() {
  return (
    <AuthLayout>
      <SignInIndex />
    </AuthLayout>
  );
}
