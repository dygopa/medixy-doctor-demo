"use client";

import clsx from "clsx";
import MobileMenu from "(presentation)/components/core/MobileMenu";
import TopBar from "(presentation)/components/core/TopBar";
import { IUser } from "domain/core/entities/userEntity";
import Navigation from "./nav";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext, IAuthContext } from "../AppLayout/context/AuthContext";
import { redirect, usePathname } from "next/navigation";
import StepByStepPopup from "(presentation)/components/core/StepByStepPopup/StepByStepPopup";
import PopupProvider from "(presentation)/components/core/BaseComponents/Popup/context/PopupContext";
import Popup from "(presentation)/components/core/BaseComponents/Popup/PopupIndex";
import Splash from "(presentation)/components/core/Splash/Splash";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import SessionExpiredComponent from "(presentation)/components/core/BaseComponents/SessionExpired";
import StepByStepMessage from "(presentation)/components/core/StepByStepMessage/StepByStepMessage";

interface INavigation {
  title: string;
  pathname: string;
}

function SideMenu({
  children,
  navigation,
  showStepsBySteps = true,
}: {
  children: React.ReactNode;
  navigation: INavigation[];
  showStepsBySteps?: boolean;
}) {
  const { state, actions, dispatch } = useContext<IAuthContext>(AuthContext);
  const { getUserAuthenticated } = actions;
  const { data, loading, error, successful } = state.getUserAuthenticated;

  const pathname = usePathname();
  const [sessionExpired, setSessionExpired] = useState(false);

  const loadUser = () => {
    getUserAuthenticated()(dispatch);
  };

  const onHandleAuth = () => {
    if (pathname === "/" && data.userId) {
      redirect("/dashboard");
    }

    if (pathname === "/" && !data?.userId) {
      redirect("/login");
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successful) onHandleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useMemo(() => {
    if (error) {
      if (pathname === "/") {
        redirect("/login");
      } else {
        setSessionExpired(true);
      }
    }
  }, [error]);

  if ((loading || !data?.userId) && pathname === "/") return <Splash />;

  return (
    <>
      <div className="pb-5 pt-5 lg:pt-0 md:pt-0 xl:pt-0 md:py-0 -mx-3 px-3 sm:-mx-8 sm:px-8 bg-primary dark:bg-transparent">
        <StepByStepMessage />
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
                "xl:mt-0 lg:mt-0 md:mt-0 mt-[4rem] md:ml-[105px] xl:ml-[250px] overflow-y-auto rounded-[30px] md:rounded-[35px/50px_0px_0px_0px] min-w-0 min-h-screen max-h-screen max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative",
                "before:content-[''] before:w-full before:h-px before:block",
                "dark:bg-darkmode-700",
                "after:content-[''] after:z-[-1] after:rounded-[40px_0px_0px_0px] after:w-full after:inset-y-0 after:absolute after:left-0 after:bg-white/10 after:mt-8 after:-ml-4 after:dark:bg-darkmode-400/50",
              ])}
            >
              <TopBar navigation={navigation} user={data} />
              {children}
              <SessionExpiredComponent
                tittle="Tu sesión ha expirado"
                description="Tu sesión ha expirado o no has iniciado sesión."
                show={sessionExpired}
                textButtonPrincipal="Volver a iniciar sesión"
                onClickButtonPrincipal={() => {
                  window.location.href = "/login";
                }}
              />
              <StepByStepPopup user={data} />
            </div>
            {/* END: Content */}
          </div>
        </PopupProvider>
      </div>
    </>
  );
}

export default SideMenu;
