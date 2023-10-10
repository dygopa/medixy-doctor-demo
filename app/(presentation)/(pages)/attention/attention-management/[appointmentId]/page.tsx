import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import AttentionManagementIndex from "(presentation)/components/Attention/AttentionManagement/AttentionManagementIndex";
import AuthErrorHandlers from "(presentation)/components/core/Auth/AuthErrorsHandlers";
import { IUser } from "domain/core/entities/userEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";
import AuthUseCase from "domain/useCases/auth/authUseCase";
import { cookies } from "next/headers";
import Head from "./head";
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

export default async function AttentionManagementPage({
  params,
}: {
  params: { appointmentId: string };
}) {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorHandlers authFailure={user} />;
  }

  return (
    <AppLayout
      user={user}
      title="Atención del servicio"
      pathname={"/attention/attention-management"}
    >
      <Providers>
        <Head />
        <AttentionManagementIndex id={params.appointmentId} />
      </Providers>
    </AppLayout>
  );
}
