"use client";

import { IUser } from "domain/core/entities/userEntity";
import MedicalRecordSideMenu from "../MedicalRecordSideMenu";

interface INavigation {
  title: string;
  pathname: string;
}

export default function MedicalRecordLayout({
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
      <MedicalRecordSideMenu
        user={user}
        navigation={navigation}
        showStepsBySteps={showStepsBySteps}
      >
        {children}
      </MedicalRecordSideMenu>
    </>
  );
}
