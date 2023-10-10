import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import AuthErrorHandlers from "(presentation)/components/core/Auth/AuthErrorsHandlers";
import MedicalRecordCreateIndex from "(presentation)/components/MedicalRecord/MedicalRecordCreate/MedicalRecordCreateIndex";
import { IUser } from "domain/core/entities/userEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";
import AuthUseCase from "domain/useCases/auth/authUseCase";
import { cookies } from "next/headers";
import Providers from "./providers";

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

export default async function MedicalRecordCreatePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorHandlers authFailure={user} />;
  }

  return (
    <AppLayout
      user={user}
      showStepsBySteps={false}
      title="Nueva Consulta"
      pathname={
        MedicalRecordRoutesEnum.MedicalRecord +
        params.id +
        MedicalRecordRoutesEnum.MedicalRecordCreate +
        "?type=appointment"
      }
    >
      <Providers>
        <MedicalRecordCreateIndex user={user} id={params.id} />
      </Providers>
    </AppLayout>
  );
}
