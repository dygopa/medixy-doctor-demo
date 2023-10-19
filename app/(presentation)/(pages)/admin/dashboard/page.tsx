import AdminAppLayout from "(presentation)/(layouts)/AdminAppLayout/AdminAppLayout";
import { AdminDashboardRoutesEnum } from "(presentation)/(routes)/admin/dashboardRoutes";
import DashboardIndex from "(presentation)/components/Admin/Dashboard/DashboardIndex";
import AuthErrorHandlers from "(presentation)/components/core/Auth/AuthErrorsHandlers";
import { IAdmin } from "domain/core/entities/adminEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";
import AuthUseCase from "domain/useCases/admin/auth/authUseCase";
import { cookies } from "next/headers";
import Providers from "./providers";

async function getUserAuthenticated(): Promise<IAdmin | AuthFailure> {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("admin.access_token");

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
    return <AuthErrorHandlers isAdmin authFailure={user} />;
  }

  return (
    <AdminAppLayout
      user={user}
      title="Tablero"
      pathname={AdminDashboardRoutesEnum.Dashboard}
    >
      <Providers>
        <DashboardIndex />
      </Providers>
    </AdminAppLayout>
  );
}
