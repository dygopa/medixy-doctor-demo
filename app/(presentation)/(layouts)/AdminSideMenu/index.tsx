"use client";

import clsx from "clsx";
import MobileMenu from "(presentation)/components/core/MobileMenu";
import TopBar from "(presentation)/components/core/TopBar";
import Navigation from "./nav";
import PopupProvider from "(presentation)/components/core/BaseComponents/Popup/context/PopupContext";
import TopbarAdmin from "(presentation)/components/core/TopBarAdmin";

interface INavigation {
  title: string;
  pathname: string;
}

function SideMenu({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: INavigation[];
}) {
  return (
    <div className="py-5 md:py-0 -mx-3 px-3 sm:-mx-8 sm:px-8 bg-primary dark:bg-transparent">
      <PopupProvider>
        <MobileMenu />
        <div className="flex mt-[4.7rem] md:mt-0 overflow-hidden ">
          {/* BEGIN: Side Menu */}
          <nav className="hidden md:block md:w-[105px] xl:w-[250px] pl-5 pr-6 py-5 overflow-hidden z-10  h-[101vh] fixed">
            <Navigation />
          </nav>
          {/* END: Side Menu */}
          {/* BEGIN: Content */}
          <div
            className={clsx([
              "md:ml-[105px] xl:ml-[250px] overflow-y-auto rounded-[30px] md:rounded-[35px/50px_0px_0px_0px] min-w-0 min-h-screen max-h-screen max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative",
              "before:content-[''] before:w-full before:h-px before:block",
              "dark:bg-darkmode-700",
              "after:content-[''] after:z-[-1] after:rounded-[40px_0px_0px_0px] after:w-full after:inset-y-0 after:absolute after:left-0 after:bg-white/10 after:mt-8 after:-ml-4 after:dark:bg-darkmode-400/50",
            ])}
          >
            <TopbarAdmin navigation={navigation} />
            {children}
          </div>
          {/* END: Content */}
        </div>
      </PopupProvider>
    </div>
  );
}

export default SideMenu;
