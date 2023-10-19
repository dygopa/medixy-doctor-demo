"use client";

import SessionExpiredComponent from "(presentation)/components/core/BaseComponents/SessionExpired";

interface IAuthErrorSessionExpiredProps {
  isAdmin?: boolean;
}

export default function AuthErrorSessionExpired({
  isAdmin,
}: IAuthErrorSessionExpiredProps) {
  return (
    <SessionExpiredComponent
      tittle="Tu sesión ha expirado"
      description="Tu sesión ha expirado o no has iniciado sesión."
      show={true}
      textButtonPrincipal="Volver a iniciar sesión"
      onClickButtonPrincipal={() => {
        window.location.href = isAdmin ? "/admin/login" : "/login";
      }}
    />
  );
}
