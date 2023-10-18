import AuthLayout from "(presentation)/(layouts)/AuthLayout/AuthLayout";
import RegisterIndex from "(presentation)/components/Register/RegisterIndex";
import { IUser } from "domain/core/entities/userEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";
import AuthUseCase from "domain/useCases/auth/authUseCase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

export default async function RegisterPage() {
  const user = await getUserAuthenticated();

  if (!user || user instanceof AuthFailure) {
    return (
      <AuthLayout>
        <Providers>
          <RegisterIndex />
        </Providers>
      </AuthLayout>
    );
  }

  return redirect("/dashboard");
}
