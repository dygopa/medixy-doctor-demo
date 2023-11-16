/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import clsx from "clsx";
import MobileMenu from "(presentation)/components/core/MobileMenu";
import TopBar from "(presentation)/components/core/TopBar";
import { IUser } from "domain/core/entities/userEntity";
import StepByStepPopup from "(presentation)/components/core/StepByStepPopup/StepByStepPopup";
import PopupProvider from "(presentation)/components/core/BaseComponents/Popup/context/PopupContext";
import VersionHandler from "../AppLayout/VersionHandler/VersionHandler";
import StepByStepProvider from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";
import SmartBar from "(presentation)/components/core/SmartBar/SmartBar";
import Navigation from "./nav";

interface INavigation {
  title: string;
  pathname: string;
}

function MedicalRecordSideMenu({
  children,
  navigation,
  showStepsBySteps = true,
  user,
}: {
  children: React.ReactNode;
  navigation: INavigation[];
  showStepsBySteps?: boolean;
  user: IUser;
}) {
  return (
    <VersionHandler>
      <StepByStepProvider>
        <div className="pb-5 pt-5 lg:pt-0 md:pt-0 xl:pt-0 md:py-0 -mx-3 px-3 sm:-mx-8 sm:px-8 bg-primary dark:bg-transparent h-[100vh] lg:overflow-hidden md:overflow-hidden overflow-auto">
          <SmartBar user={user} />
          <PopupProvider>
            <MobileMenu />
            <div className="flex xl:mt-0 lg:mt-0 mt-0 md:mt-0 overflow-hidden h-[101vh]">
              {/* BEGIN: Side Menu */}
              <nav className="hidden md:hidden lg:block lg:w-[125px] pl-5 pr-6 py-5 overflow-hidden bg-primary z-10 h-[100vh] fixed">
                <Navigation />
              </nav>
              {/* END: Side Menu */}
              {/* BEGIN: Content */}
              <div
                className={clsx([
                  "xl:mt-0 lg:mt-0 md:mt-0 mt-[4rem] lg:ml-[125px] overflow-y-auto h-auto rounded-[30px] md:rounded-[35px/50px_0px_0px_0px] w-0 max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative",
                  "before:content-[''] before:w-full before:h-px before:block",
                  "dark:bg-darkmode-700",
                  "after:content-[''] after:z-[-1] after:rounded-[40px_0px_0px_0px] after:w-full after:inset-y-0 after:absolute after:left-0 after:bg-white/10 after:mt-8 after:-ml-4 after:dark:bg-darkmode-400/50",
                ])}
              >
                <TopBar navigation={navigation} user={user} />
                {children}
                <StepByStepPopup user={user} />
              </div>
              {/* END: Content */}
            </div>
          </PopupProvider>
        </div>
      </StepByStepProvider>
    </VersionHandler>
  );
}

export default MedicalRecordSideMenu;
