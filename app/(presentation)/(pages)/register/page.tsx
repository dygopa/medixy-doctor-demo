import AuthLayout from "(presentation)/(layouts)/AuthLayout/AuthLayout";
import RegisterIndex from "(presentation)/components/Register/RegisterIndex";
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

export default async function RegisterPage() {
  const user = await getUserAuthenticated();

  return (
    <AuthLayout>
      <RegisterIndex user={user instanceof AuthFailure ? null : user} />
    </AuthLayout>
  );
}
