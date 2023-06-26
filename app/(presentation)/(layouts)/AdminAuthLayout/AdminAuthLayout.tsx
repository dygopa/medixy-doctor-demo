"use client";

import AuthHandler from "./AuthHandler/AuthHandler";
import AuthProvider from "./context/AuthContext";
import VersionHandler from "./VersionHandler/VersionHandler";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VersionHandler>
      <AuthProvider>
        <AuthHandler>{children}</AuthHandler>
      </AuthProvider>
    </VersionHandler>
  );
}
