import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import AuthErrorHandlers from "(presentation)/components/core/Auth/AuthErrorsHandlers";
import ServiceViewIndex from "(presentation)/components/Services/ServicesView/ServiceViewIndex";
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

export default async function ServicesViewPage() {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorHandlers authFailure={user} />;
  }

  return (
    <AppLayout
      user={user}
      showStepsBySteps={false}
      title="Mi Servicio"
      pathname={ServicesRoutesEnum.Services}
    >
      <ServiceViewIndex user={user} />
    </AppLayout>
  );
}
