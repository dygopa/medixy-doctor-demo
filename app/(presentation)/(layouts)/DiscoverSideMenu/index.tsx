/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { IUser } from "domain/core/entities/userEntity";
import StepByStepPopup from "(presentation)/components/core/StepByStepPopup/StepByStepPopup";
import VersionHandler from "../AppLayout/VersionHandler/VersionHandler";
import StepByStepProvider from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";
import TopBarDiscover from "(presentation)/components/core/TopBarDiscover/TopBarDiscover";

interface INavigation {
  title: string;
  pathname: string;
}

function DiscoverSideMenu({
  children,
  user,
}: {
  children: React.ReactNode;
  user: IUser;
}) {
  return (
    <VersionHandler>
      <StepByStepProvider>
        <TopBarDiscover />

        <div>{children}</div>

        <StepByStepPopup user={user} disabled />
      </StepByStepProvider>
    </VersionHandler>
  );
}

export default DiscoverSideMenu;
