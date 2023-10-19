"use client";

import VersionHandler from "./VersionHandler/VersionHandler";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VersionHandler>{children}</VersionHandler>;
}
