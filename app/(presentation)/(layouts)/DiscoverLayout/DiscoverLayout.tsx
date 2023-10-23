"use client";

import { IUser } from "domain/core/entities/userEntity";
import DiscoverSideMenu from "../DiscoverSideMenu";

export default function DiscoverLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: IUser;
}) {
  return <DiscoverSideMenu user={user}>{children}</DiscoverSideMenu>;
}
