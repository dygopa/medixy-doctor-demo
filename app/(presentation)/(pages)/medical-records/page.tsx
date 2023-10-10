import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import AuthErrorHandlers from "(presentation)/components/core/Auth/AuthErrorsHandlers";
import MedicalRecordsListIndex from "(presentation)/components/MedicalRecord/MedicalRecordsList/MedicalRecordsListIndex";
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

export default async function MedicalRecordsListPage() {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorHandlers authFailure={user} />;
  }

  return (
    <AppLayout
      user={user}
      showStepsBySteps
      title="Mis Consultas"
      pathname={MedicalRecordRoutesEnum.MedicalRecordList}
    >
      <MedicalRecordsListIndex user={user} />
    </AppLayout>
  );
}
