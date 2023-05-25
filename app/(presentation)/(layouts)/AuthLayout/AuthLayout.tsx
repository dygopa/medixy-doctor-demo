"use client";

import AuthHandler from "./AuthHandler/AuthHandler";
import AuthProvider from "./context/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthHandler>{children}</AuthHandler>
    </AuthProvider>
  );
}
