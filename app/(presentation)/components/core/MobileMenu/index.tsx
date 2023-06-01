import { Transition } from "react-transition-group";
import { useState, createRef, Dispatch, SetStateAction } from "react";
import { linkTo, enter, leave } from "./mobile-menu";
import clsx from "clsx";
import { FormattedMenu } from "(presentation)/(layouts)/SideMenu/side-menu";
import Lucide from "../BaseComponents/Lucide";
import { toRaw } from "(presentation)/(utils)/helper";
import Button from "../BaseComponents/Button";
import {
  endNavigationOptions,
  navigationOptions,
} from "(presentation)/(layouts)/SideMenu/side-options";
import Link from "next/link";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import Image from "next/image";

function Main() {
  const [formattedMenu, setFormattedMenu] =
    useState<Array<FormattedMenu | "divider">>(navigationOptions);

  const [endFormattedMenu, setEndFormattedMenu] =
    useState<Array<FormattedMenu | "divider">>(endNavigationOptions);

  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const scrollableRef = createRef<HTMLDivElement>();

  return (
    <>
      {/* BEGIN: Mobile Menu */}
      <div
        className={clsx([
          "w-full fixed border-b border-white/[0.08] -mt-5 -mx-3 sm:-mx-8 mb-6 dark:bg-darkmode-700 md:hidden",
          "before:content-[''] before:absolute before:inset-0 before:z-[-1] before:w-full before:h-full before:bg-black/[0.15]",
          "after:content-[''] after:w-full after:h-screen after:z-10 after:fixed after:inset-0 after:bg-black/90 after:transition-opacity after:duration-200 after:ease-in-out",
          !activeMobileMenu && "after:invisible after:opacity-0",
          activeMobileMenu && "after:visible after:opacity-100 z-[99]",
        ])}
      >
        <div className="flex">
          <Link
            href={{
              pathname: DashboardRoutesEnum.Dashboard,
            }}
            className="h-[70px] px-3 sm:px-8 flex items-center"
          >
            <Image
              src="/logo-white.png"
              width={250}
              height={250}
              alt="App logo"
            />
          </Link>

          <div className="h-[70px] px-3 sm:px-8 flex items-center w-full justify-end">
            <Button
              variant="outline-primary"
              className="px-4 border-white"
              onClick={() => {
                setActiveMobileMenu(!activeMobileMenu);
              }}
            >
              <Lucide
                icon="BarChart2"
                className="w-8 h-8 text-white transform -rotate-90"
              />
            </Button>
          </div>
        </div>
        <div
          ref={scrollableRef}
          className={clsx([
            "h-screen z-[99] top-0 left-0 w-[270px]  bg-primary transition-all duration-300 ease-in-out dark:bg-darkmode-800",
            "[&[data-simplebar]]:fixed [&_.simplebar-scrollbar]:before:bg-black/50",
            activeMobileMenu && "ml-0 fixed",
            !activeMobileMenu && "-ml-[100%]",
          ])}
        >
          <div style={{ height: "83vh" }}>
            <Button
              variant="outline-primary"
              onClick={() => {
                setActiveMobileMenu(!activeMobileMenu);
              }}
              className={clsx([
                "fixed top-0 right-0 mt-4 mr-4 transition-opacity duration-200 ease-in-out border-white px-2",
                !activeMobileMenu && "invisible opacity-0",
                activeMobileMenu && "visible opacity-100",
              ])}
            >
              <Lucide
                icon="XCircle"
                className="w-8 h-8 text-white transform -rotate-90"
              />
            </Button>
            <ul className="py-2">
              <Link
                href={DashboardRoutesEnum.Dashboard}
                className="sidebar-logo flex justify-center pt-3 pb-3"
                title="Página de inicio de Prosit"
              >
                <Image
                  src="/logo-white.png"
                  width={110}
                  height={110}
                  alt="App logo white"
                  priority
                />
              </Link>
              <Divider type="div" className="my-6"></Divider>
              {/* BEGIN: First Child */}
              {formattedMenu.map((menu, menuKey) =>
                menu == "divider" ? (
                  <Divider as="li" className="my-6" key={menuKey}></Divider>
                ) : (
                  !menu.ignore && (
                    <li key={menuKey}>
                      <Menu
                        menu={menu}
                        formattedMenuState={[formattedMenu, setFormattedMenu]}
                        level="first"
                        setActiveMobileMenu={setActiveMobileMenu}
                      ></Menu>
                      {/* BEGIN: Second Child */}
                      {menu.subMenu && (
                        <Transition
                          in={menu.activeDropdown}
                          onEnter={enter}
                          onExit={leave}
                          timeout={300}
                        >
                          <ul
                            className={clsx([
                              "bg-black/10 rounded-lg mx-4 my-1 dark:bg-darkmode-700",
                              !menu.activeDropdown && "hidden",
                              menu.activeDropdown && "block",
                            ])}
                          >
                            {menu.subMenu.map((subMenu, subMenuKey) => (
                              <li
                                className="max-w-[1280px] w-full mx-auto"
                                key={subMenuKey}
                              >
                                <Menu
                                  menu={subMenu}
                                  formattedMenuState={[
                                    formattedMenu,
                                    setFormattedMenu,
                                  ]}
                                  level="second"
                                  setActiveMobileMenu={setActiveMobileMenu}
                                ></Menu>
                              </li>
                            ))}
                          </ul>
                        </Transition>
                      )}
                      {/* END: Second Child */}
                    </li>
                  )
                )
              )}
              {/* END: First Child */}
            </ul>
          </div>
          <div className="w-full">
            <ul>
              {endFormattedMenu.map((menu, menuKey) =>
                menu == "divider" ? (
                  <Divider
                    type="li"
                    className={clsx([
                      "my-6",

                      // Animation
                      `opacity-0 animate-[0.4s_ease-in-out_0.1s_intro-divider] animate-fill-mode-forwards animate-delay`,
                    ])}
                    key={menuKey}
                  ></Divider>
                ) : (
                  !menu.ignore && (
                    <Menu
                      key={menuKey}
                      menu={menu}
                      formattedMenuState={[formattedMenu, setFormattedMenu]}
                      level="second"
                      setActiveMobileMenu={setActiveMobileMenu}
                    ></Menu>
                  )
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* END: Mobile Menu */}
    </>
  );
}

function Menu(props: {
  menu: FormattedMenu;
  formattedMenuState: [
    (FormattedMenu | "divider")[],
    Dispatch<SetStateAction<(FormattedMenu | "divider")[]>>
  ];
  level: "first" | "second" | "third";
  setActiveMobileMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const [formattedMenu, setFormattedMenu] = props.formattedMenuState;

  return (
    <Link
      href={props.menu.subMenu ? "#" : props.menu.pathname}
      className={clsx([
        "h-[50px] flex items-center text-white",
        props.level == "first" && "px-6",
        props.level != "first" && "px-4",
      ])}
      onClick={() => {
        setFormattedMenu(toRaw(formattedMenu));
      }}
    >
      <div>
        <Lucide icon={props.menu.icon} />
      </div>
      <div className="flex items-center w-full ml-3">
        {props.menu.title}
        {props.menu.subMenu && (
          <div
            className={clsx([
              "transition ease-in duration-100 ml-auto",
              props.menu.activeDropdown && "transform rotate-180",
            ])}
          >
            <Lucide icon="ChevronDown" className="w-5 h-5" />
          </div>
        )}
      </div>
    </Link>
  );
}

function Divider<C extends React.ElementType>(
  props: { as?: C } & React.ComponentPropsWithoutRef<C>
) {
  const { className, ...computedProps } = props;
  const Component = props.as || "div";

  return (
    <Component
      {...computedProps}
      className={clsx([
        props.className,
        "w-full h-px bg-white/[0.08] relative",
      ])}
    ></Component>
  );
}

export default Main;
