import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import DashboardIndex from "(presentation)/components/Dashboard/DashboardIndex";
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

export default async function DashboardPage() {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorHandlers authFailure={user} />;
  }

  return (
    <AppLayout user={user} title="Mi tablero" pathname={DashboardRoutesEnum.Dashboard}>
      <DashboardIndex user={user} />
    </AppLayout>
  );
}
