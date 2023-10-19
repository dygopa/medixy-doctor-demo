import AdminAppLayout from "(presentation)/(layouts)/AdminAppLayout/AdminAppLayout";
import { AdminDoctorsRoutesEnum } from "(presentation)/(routes)/admin/doctorsRoutes";
import DoctorsListIndex from "(presentation)/components/Admin/Doctors/DoctorsList/DoctorsListIndex";
import AuthErrorsHandlers from "(presentation)/components/core/Auth/AuthErrorsHandlers";
import { IAdmin } from "domain/core/entities/adminEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";
import AuthUseCase from "domain/useCases/admin/auth/authUseCase";
import { cookies } from "next/headers";

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

export default async function DoctorsListPage() {
  const user = await getUserAuthenticated();

  if (user instanceof AuthFailure) {
    return <AuthErrorsHandlers isAdmin authFailure={user} />;
  }

  return (
    <AdminAppLayout
      user={user}
      title="Doctores"
      pathname={AdminDoctorsRoutesEnum.DoctorsView}
    >
      <DoctorsListIndex />
    </AdminAppLayout>
  );
}
