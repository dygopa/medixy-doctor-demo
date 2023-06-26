"use client";

import DashboardProvider from "(presentation)/components/Admin/Dashboard/context/DashboardContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return <DashboardProvider>{children}</DashboardProvider>;
}
