"use client";

import StepByStepProvider from "(presentation)/components/core/StepByStep/context/StepByStepContext";
import SideMenu from "../SideMenu";
import AuthProvider from "./context/AuthContext";

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
    <AuthProvider>
      <StepByStepProvider>
        <SideMenu navigation={navigation} showStepsBySteps={showStepsBySteps}>
          {children}
        </SideMenu>
      </StepByStepProvider>
    </AuthProvider>
  );
}
