import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { AccountRoutesEnum } from "(presentation)/(routes)/accountRoutes";
import AccountIndex from "(presentation)/components/Account/AccountIndex";
import { IUser } from "domain/core/entities/userEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";
import AuthUseCase from "domain/useCases/auth/authUseCase";
import { cookies } from "next/headers";

async function getUserAuthenticated(): Promise<IUser | AuthFailure> {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token");

    const user = await new AuthUseCase().getUserAuthenticatedWithToken({
      accessToken: accessToken?.value ?? "",
    });

    return user;
  } catch (error) {
    const exception: AuthFailure = error as AuthFailure;
    return exception;
  }
}

export default async function AccountPage() {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorHandlers authFailure={user} />;
  }

  return (
    <AppLayout 
      user={user}
      title="Mi Cuenta" 
      pathname={AccountRoutesEnum.Account}
      showStepsBySteps={false}
    >
      <AccountIndex user={user} />
    </AppLayout>
  );
}
