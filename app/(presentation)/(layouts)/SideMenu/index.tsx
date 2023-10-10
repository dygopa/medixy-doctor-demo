/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import clsx from "clsx";
import MobileMenu from "(presentation)/components/core/MobileMenu";
import TopBar from "(presentation)/components/core/TopBar";
import { IUser } from "domain/core/entities/userEntity";
import Navigation from "./nav";
import StepByStepPopup from "(presentation)/components/core/StepByStepPopup/StepByStepPopup";
import PopupProvider from "(presentation)/components/core/BaseComponents/Popup/context/PopupContext";
import StepByStepMessage from "(presentation)/components/core/StepByStepMessage/StepByStepMessage";
import VersionHandler from "../AppLayout/VersionHandler/VersionHandler";
import StepByStepProvider from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";

interface INavigation {
  title: string;
  pathname: string;
}

function SideMenu({
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
        <div className="pb-5 pt-5 lg:pt-0 md:pt-0 xl:pt-0 md:py-0 -mx-3 px-3 sm:-mx-8 sm:px-8 bg-primary dark:bg-transparent min-h-[100vh]">
          <StepByStepMessage user={user} />
          <PopupProvider>
            <MobileMenu />
            <div className="flex xl:mt-0 lg:mt-0 mt-0 md:mt-0 overflow-hidden">
              {/* BEGIN: Side Menu */}
              <nav className="hidden md:block md:w-[105px] xl:w-[250px] pl-5 pr-6 py-5 overflow-hidden z-10 h-[101vh] fixed">
                <Navigation />
              </nav>
              {/* END: Side Menu */}
              {/* BEGIN: Content */}
              <div
                className={clsx([
                  "xl:mt-0 lg:mt-0 md:mt-0 mt-[4rem] md:ml-[105px] xl:ml-[250px] lg:overflow-y-hidden md:overflow-y-hidden overflow-y-scroll min-h-[100vh] rounded-[30px] md:rounded-[35px/50px_0px_0px_0px] min-w-0 max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative",
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

export default SideMenu;
