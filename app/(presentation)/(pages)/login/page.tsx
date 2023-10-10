import AuthLayout from "(presentation)/(layouts)/AuthLayout/AuthLayout";
import SignInIndex from "(presentation)/components/SignIn/SignInIndex";
import { IUser } from "domain/core/entities/userEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";
import AuthUseCase from "domain/useCases/auth/authUseCase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export default async function SignInPage() {
  const user = await getUserAuthenticated();

  if (!user || user instanceof AuthFailure) {
    return (
      <AuthLayout>
        <SignInIndex />
      </AuthLayout>
    );
  }

  return redirect("/dashboard");
}
