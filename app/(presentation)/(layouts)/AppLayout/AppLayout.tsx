"use client";

import SideMenu from "../SideMenu";
import AuthProvider from "./context/AuthContext";

interface INavigation {
  title: string;
  pathname: string;
}

export default function AppLayout({
  children,
  title,
  pathname
}: {
  children: React.ReactNode;
  title: string;
  pathname: string;
}) {

  const navigation: INavigation[] = [{ title, pathname }];

  return(
    <AuthProvider>
      <SideMenu navigation={navigation}>
        {children}
      </SideMenu>
    </AuthProvider>
  )

}
