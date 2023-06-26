"use client";

import SideMenu from "../AdminSideMenu";
import VersionHandler from "./VersionHandler/VersionHandler";

interface INavigation {
  title: string;
  pathname: string;
}

export default function AdminAppLayout({
  children,
  title,
  pathname,
}: {
  children: React.ReactNode;
  title: string;
  pathname: string;
}) {
  const navigation: INavigation[] = [{ title, pathname }];

  return (
    <VersionHandler>
      <SideMenu navigation={navigation}>{children}</SideMenu>
    </VersionHandler>
  );
}
