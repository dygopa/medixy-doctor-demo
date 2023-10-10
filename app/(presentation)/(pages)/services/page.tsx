import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import AuthErrorHandlers from "(presentation)/components/core/Auth/AuthErrorsHandlers";
import ServicesListIndex from "(presentation)/components/Services/ServicesList/ServicesListIndex";
import { IUser } from "domain/core/entities/userEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";
import AuthUseCase from "domain/useCases/auth/authUseCase";
import { cookies } from "next/headers";
import Head from "./head";

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

export default async function ServicesPage() {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorHandlers authFailure={user} />;
  }

  return (
    <AppLayout
      user={user}
      title="Mis Servicios"
      pathname={ServicesRoutesEnum.Services}
    >
      <Head />

      <ServicesListIndex user={user} />
    </AppLayout>
  );
}
