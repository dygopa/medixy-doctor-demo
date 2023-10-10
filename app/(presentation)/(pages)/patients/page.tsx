import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import AuthErrorHandlers from "(presentation)/components/core/Auth/AuthErrorsHandlers";
import PatientsListIndex from "(presentation)/components/Patients/PatientsList/PatientsListIndes";
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

export default async function LocalitiesPage() {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorHandlers authFailure={user} />;
  }

  return (
    <AppLayout
      user={user}
      title="Mis Pacientes"
      pathname={PatientsRoutesEnum.PatientsList}
    >
      <PatientsListIndex user={user} />
    </AppLayout>
  );
}
