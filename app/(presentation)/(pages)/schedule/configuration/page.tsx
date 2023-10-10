import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { ScheduleRoutesEnum } from "(presentation)/(routes)/scheduleRoutes";
import AuthErrorHandlers from "(presentation)/components/core/Auth/AuthErrorsHandlers";
import ConfigurationIndex from "(presentation)/components/Schedule/Configuration/ConfigurationIndex";
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

export default async function ConfigurationPage() {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorHandlers authFailure={user} />;
  }

  return (
    <AppLayout
      user={user}
      showStepsBySteps={false}
      title="Configuración de la agenda"
      pathname={ScheduleRoutesEnum.Configuration}
    >
      <ConfigurationIndex user={user} />
    </AppLayout>
  );
}
