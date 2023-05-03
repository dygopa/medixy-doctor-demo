import { SettingsRoutesEnum } from "(presentation)/(routes)/settingsRoutes";
import { IUser } from "domain/core/entities/userEntity";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface IDefaultNavbarProps {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  user: IUser;
}

export default function DefaultNavbar({
  setShowSidebar,
  user,
}: IDefaultNavbarProps) {
  return (
    <div className="flex justify-between pr-8 pl-14 py-4">
      <div className="navbar-menu-left flex items-center">
        <div className="lg:hidden md:block sm:block xs:block">
          <button
            onClick={() => setShowSidebar(true)}
            className="btn btn-rounded"
          >
            <svg
              className="icon icon-dark"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        </div>

        <button className="btn-transaprent link-box pl-0 pr-0 pt-0 pb-0">
          <svg
            className="icon icon-gray"
            height="50px"
            viewBox="0 0 24 24"
            width="50px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        </button>

        <button className="navbar-menu-user lg:block md:block sm:block xs:hidden link-box pl-0 pr-0 pt-0 pb-0">
          <div>
            <span className="font-lighter mb-0">
              {user.firstName} {user.lastName}
            </span>
          </div>
        </button>
      </div>

      <div className="navbar-menu-right flex justify-end items-center">
        <div className="navbar-menu-settings">
          <Link
            href="/"
            className="btn btn-light-primary w-full flex items-center"
            title="Mensajes"
            style={{ boxShadow: "none", padding: "10px 10px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
            </svg>
          </Link>
        </div>

        <div className="navbar-menu-settings ml-4">
          <Link
            href={SettingsRoutesEnum.Settings}
            className="btn btn-light-primary w-full flex items-center"
            title="Configuración"
            style={{ boxShadow: "none", padding: "10px 10px" }}
          >
            <svg height="24px" viewBox="0 0 24 24" width="24px">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
