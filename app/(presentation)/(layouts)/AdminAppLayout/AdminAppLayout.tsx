"use client";

import SideMenu from "../AdminSideMenu";
import AuthProvider from "./context/AuthContext";
import VersionHandler from "./VersionHandler/VersionHandler";

interface INavigation {
  title: string;
  pathname: string;
}

export default function AppLayout({
  children,
  title,
  pathname,
  showStepsBySteps = true,
}: {
  children: React.ReactNode;
  title: string;
  pathname: string;
  showStepsBySteps?: boolean;
}) {
  const navigation: INavigation[] = [{ title, pathname }];

  return (
    <VersionHandler>
      <AuthProvider>
        <SideMenu navigation={navigation}>
          {children}
        </SideMenu>
      </AuthProvider>
    </VersionHandler>
  );
}
