"use client";

import { IAdmin } from "domain/core/entities/adminEntity";
import SideMenu from "../AdminSideMenu";

interface INavigation {
  title: string;
  pathname: string;
}

export default function AdminAppLayout({
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
  user: IAdmin;
}) {
  const navigation: INavigation[] = [{ title, pathname }];

  return (
    <SideMenu user={user} navigation={navigation}>
      {children}
    </SideMenu>
  );
}
