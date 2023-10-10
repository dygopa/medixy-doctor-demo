import {
  AuthFailure,
  authFailuresEnum,
} from "domain/core/failures/auth/authFailure";
import Image from "next/image";
import AuthErrorMessage from "./Messages/AuthErrorMessage";
import AuthErrorSessionExpired from "./Messages/AuthErrorSessionExpired";
import { redirect } from "next/navigation";

interface IAuthErrorHandlersProps {
  authFailure: AuthFailure;
}

export default function AuthErrorHandlers({
  authFailure,
}: IAuthErrorHandlersProps) {
  const getErrorComponent = () => {
    switch (authFailure.code) {
      case authFailuresEnum.tokenExpired:
        return <AuthErrorSessionExpired />;
      case authFailuresEnum.serverError:
        return <AuthErrorMessage />;
      case authFailuresEnum.notAuthenticated:
        redirect("/login");

      default:
        return <AuthErrorMessage />;
    }
  };

  return (
    <div>
      <div className="p-6">
        <Image src="/images/logo.png" width={250} height={250} alt="App logo" />
      </div>

      <div>{getErrorComponent()}</div>
    </div>
  );
}
