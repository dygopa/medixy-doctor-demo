import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import AuthErrorHandlers from "(presentation)/components/core/Auth/AuthErrorsHandlers";
import LocalityCreateIndex from "(presentation)/components/Localities/LocalitiesCreate/LocalityCreateIndex";
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

export default async function LocalitiesCreatePage() {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorHandlers authFailure={user} />;
  }

  return (
    <AppLayout
      user={user}
      showStepsBySteps={true}
      title="Nuevo Consultorio"
      pathname={LocalitiesRoutesEnum.LocalitiesCreate}
    >
      <LocalityCreateIndex user={user} />
    </AppLayout>
  );
}
