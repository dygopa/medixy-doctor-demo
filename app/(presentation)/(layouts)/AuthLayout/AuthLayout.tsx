"use client";

import VersionHandler from "./VersionHandler/VersionHandler";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VersionHandler>{children}</VersionHandler>;
}
