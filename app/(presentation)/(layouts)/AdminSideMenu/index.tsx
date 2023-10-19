"use client";

import clsx from "clsx";
import MobileMenu from "(presentation)/components/core/MobileMenuAdmin";
import TopBar from "(presentation)/components/core/TopBarAdmin";
import Navigation from "./nav";
import { IAdmin } from "domain/core/entities/adminEntity";
import VersionHandler from "../AdminAppLayout/VersionHandler/VersionHandler";

interface INavigation {
  title: string;
  pathname: string;
}

function SideMenu({
  user,
  children,
  navigation,
}: {
  user: IAdmin;
  children: React.ReactNode;
  navigation: INavigation[];
}) {
  return (
    <VersionHandler>
      <div className="pb-5 pt-5 lg:pt-0 md:pt-0 xl:pt-0 md:py-0 -mx-3 px-3 sm:-mx-8 sm:px-8 bg-primary dark:bg-transparent">
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
              "xl:mt-0 lg:mt-0 md:mt-0 mt-[4rem] md:ml-[105px] xl:ml-[250px] overflow-y-auto rounded-[30px] md:rounded-[35px/50px_0px_0px_0px] min-w-0 min-h-screen max-h-screen max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative",
              "before:content-[''] before:w-full before:h-px before:block",
              "dark:bg-darkmode-700",
              "after:content-[''] after:z-[-1] after:rounded-[40px_0px_0px_0px] after:w-full after:inset-y-0 after:absolute after:left-0 after:bg-white/10 after:mt-8 after:-ml-4 after:dark:bg-darkmode-400/50",
            ])}
          >
            <TopBar navigation={navigation} user={user} />
            {children}
          </div>
          {/* END: Content */}
        </div>
      </div>
    </VersionHandler>
  );
}

export default SideMenu;
