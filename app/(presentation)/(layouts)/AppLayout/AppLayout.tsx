"use client";

import { IUser } from "domain/core/entities/userEntity";
import SideMenu from "../SideMenu";
import ScriptGoogle from "./Script";

interface INavigation {
  title: string;
  pathname: string;
}

export default function AppLayout({
  children,
  title,
  pathname,
  showStepsBySteps = true,
  user,
}: {
  children: React.ReactNode;
  title: string;
  pathname: string;
  showStepsBySteps?: boolean;
  user: IUser;
}) {
  const navigation: INavigation[] = [{ title, pathname }];

  return (
    <>
      <SideMenu
        user={user}
        navigation={navigation}
        showStepsBySteps={showStepsBySteps}
      >
        {children}
      </SideMenu>
      <ScriptGoogle />
    </>
  );
}
