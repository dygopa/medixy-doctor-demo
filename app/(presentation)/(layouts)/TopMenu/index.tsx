import { useState } from "react";
import _ from "lodash";
import { FormattedMenu } from "./top-menu";
import { Popover } from "@headlessui/react";
import clsx from "clsx";
import MobileMenu from "(presentation)/components/core/MobileMenu";
import Link from "next/link";
import Breadcrumb from "(presentation)/components/core/BaseComponents/Breadcrumb";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import fakerData from "(presentation)/(utils)/faker";
import Image from "next/image";
import { Menu } from "(presentation)/components/core/BaseComponents/Headless";

interface INavigation {
  title: string;
  pathname: string;
}

function TopMenu({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: INavigation[];
}) {
  const [formattedMenu, setFormattedMenu] = useState<Array<FormattedMenu>>([]);
  const topMenu = () => {};

  return (
    <div className="py-5 md:py-0 -mx-3 px-3 sm:-mx-8 sm:px-8 bg-black/[0.15] dark:bg-transparent">
      <MobileMenu />
      {/* BEGIN: Top Bar */}
      <div className="h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:mx-0 px-4 sm:px-8 md:px-6 mb-10 md:mb-8">
        <div className="flex items-center h-full">
          {/* BEGIN: Logo */}
          <Link
            href="/top-menu/dashboard-overview-1"
            className="hidden -intro-x md:flex"
          >
            <span className="ml-3 text-lg text-white"> Tinker </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <Breadcrumb
            light
            className="h-full md:ml-10 md:pl-10 md:border-l border-white/[0.08] mr-auto -intro-x"
          >
            {navigation.map((nav) => (
              <Link key={nav.title} href={nav.pathname}>
                <Breadcrumb>
                  <p>{nav.title}</p>
                </Breadcrumb>
              </Link>
            ))}
          </Breadcrumb>
          {/* END: Breadcrumb */}

          {/* BEGIN: Notifications */}
          <Popover className="mr-4 intro-x sm:mr-6">
            <Popover.Button
              className="
              relative text-white/70 outline-none block
              before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger
            "
            >
              <Lucide icon="Bell" className="w-5 h-5 dark:text-slate-500" />
            </Popover.Button>
            <Popover.Panel className="w-[280px] sm:w-[350px] p-5 mt-2">
              <div className="mb-5 font-bold">Notifications</div>
              {_.take(fakerData, 5).map((faker, fakerKey) => (
                <div
                  key={fakerKey}
                  className={clsx([
                    "cursor-pointer relative flex items-center",
                    { "mt-5": fakerKey },
                  ])}
                >
                  <div className="relative flex-none w-12 h-12 mr-1 image-fit">
                    <Image
                      alt="Midone Tailwind HTML Admin Template"
                      className="rounded-full"
                      src={faker.photos[0]}
                      width={40}
                      height={40}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href="" className="mr-5 font-bold truncate">
                        {faker.users[0].name}
                      </a>
                      <div className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                        {faker.times[0]}
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      {faker.news[0].shortContent}
                    </div>
                  </div>
                </div>
              ))}
            </Popover.Panel>
          </Popover>
          {/* END: Notifications */}
          {/* BEGIN: Account Menu */}
          <Menu>
            <Menu.Button className="block w-8 h-8 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x">
              <Image
                alt="Midone Tailwind HTML Admin Template"
                src={fakerData[9].photos[0]}
                width={40}
                height={40}
              />
            </Menu.Button>
            <Menu.Items className="w-56 mt-px relative bg-primary/70 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
              <Menu.Header className="font-normal">
                <div className="font-bold">{fakerData[0].users[0].name}</div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                  {fakerData[0].jobs[0]}
                </div>
              </Menu.Header>
              <Menu.Divider className="bg-white/[0.08]" />
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Cerrar
                sesión
              </Menu.Item>
            </Menu.Items>
          </Menu>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
      {/* BEGIN: Top Menu */}
      <nav
        className={clsx([
          "z-50 relative -mt-[3px] hidden md:block",

          // Animation
          "translate-y-[50px] opacity-0 animate-[0.4s_ease-in-out_0.2s_intro-top-menu] animate-fill-mode-forwards",
        ])}
      >
        <ul className="flex flex-wrap h-[58px] px-6 xl:px-[50px]">
          {formattedMenu.map((menu, menuKey) => (
            <li
              className={clsx([
                "relative [&:hover>ul]:block [&:hover>a>div:nth-child(2)>svg]:rotate-180",
                !menu.active &&
                  "[&:hover>a]:bg-primary/60 [&:hover>a]:dark:bg-transparent",
                !menu.active &&
                  "[&:hover>a]:before:content-[''] [&:hover>a]:before:block [&:hover>a]:before:inset-0 [&:hover>a]:before:bg-white/[0.04] [&:hover>a]:before:rounded-full [&:hover>a]:xl:before:rounded-xl [&:hover>a]:before:absolute [&:hover>a]:before:z-[-1] [&:hover>a]:before:dark:bg-darkmode-700",
              ])}
              key={menuKey}
            >
              <MenuLink
                className={clsx({
                  // Animation
                  [`opacity-0 translate-y-[50px] animate-[0.4s_ease-in-out_0.3s_intro-menu] animate-fill-mode-forwards animate-delay-${
                    (menuKey + 1) * 10
                  }`]: !menu.active,
                })}
                menu={menu}
                level="first"
              ></MenuLink>
              {/* BEGIN: Second Child */}
              {menu.subMenu && (
                <ul
                  className={clsx([
                    "shadow-[0px_3px_20px_#0000000b] dark:shadow-[0px_3px_7px_#0000001c] bg-primary dark:bg-darkmode-600 hidden w-56 absolute rounded-md z-20 px-0 mt-1",
                    "before:content-[''] before:block before:absolute before:w-full before:h-full before:bg-white/[0.04] before:inset-0 before:rounded-md before:z-[-1] dark:before:bg-black/10",
                    "after:content-[''] after:w-full after:h-1 after:absolute after:top-0 after:left-0 after:-mt-1 after:cursor-pointer",
                  ])}
                >
                  {menu.subMenu.map((subMenu, subMenuKey) => (
                    <li
                      className="px-5 relative [&:hover>ul]:block [&:hover>a>div:nth-child(2)>svg]:-rotate-90"
                      key={subMenuKey}
                    >
                      <MenuLink menu={subMenu} level="second"></MenuLink>
                      {/* BEGIN: Third Child */}
                      {subMenu.subMenu && (
                        <ul
                          className={clsx([
                            "shadow-[0px_3px_20px_#0000000b] dark:shadow-[0px_3px_7px_#0000001c] left-[100%] bg-primary dark:bg-darkmode-600 hidden w-56 absolute rounded-md mt-0 ml-0 top-0 z-20 px-0",
                            "before:content-[''] before:block before:absolute before:w-full before:h-full before:bg-white/[0.04] before:inset-0 before:rounded-md before:z-[-1] dark:before:bg-black/10",
                            "after:content-[''] after:w-full after:h-1 after:absolute after:top-0 after:left-0 after:-mt-1 after:cursor-pointer",
                          ])}
                        >
                          {subMenu.subMenu.map(
                            (lastSubMenu, lastSubMenuKey) => (
                              <li
                                className="px-5 relative [&:hover>ul]:block [&:hover>a>div:nth-child(2)>svg]:-rotate-90"
                                key={lastSubMenuKey}
                              >
                                <MenuLink
                                  menu={lastSubMenu}
                                  level="third"
                                ></MenuLink>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                      {/* END: Third Child */}
                    </li>
                  ))}
                </ul>
              )}
              {/* END: Second Child */}
            </li>
          ))}
        </ul>
      </nav>
      {/* END: Top Menu */}
      {/* BEGIN: Content */}
      <div
        className={clsx([
          "rounded-[30px] md:rounded-[35px_35px_0px_0px] min-w-0 min-h-screen max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative mt-8 dark:bg-darkmode-700",
          "before:content-[''] before:w-full before:h-px before:block",
          "after:content-[''] after:z-[-1] after:rounded-[40px_40px_0px_0px] after:w-[97%] after:inset-y-0 after:absolute after:left-0 after:right-0 after:bg-white/10 after:-mt-4 after:mx-auto after:dark:bg-darkmode-400/50",
        ])}
      >
        {children}
      </div>
      {/* END: Content */}
    </div>
  );
}

function MenuLink(props: {
  className?: string;
  menu: FormattedMenu;
  level: "first" | "second" | "third";
}) {
  return (
    <a
      href={props.menu.subMenu ? "#" : props.menu.pathname}
      className={clsx([
        "h-[55px] flex items-center px-5 mr-1 text-white relative rounded-full xl:rounded-xl",
        props.level == "first" && "mt-[3px]",
        props.level == "first" &&
          props.menu.active &&
          "bg-slate-100 xl:bg-primary dark:bg-darkmode-700",
        props.level == "first" &&
          props.menu.active &&
          "before:content-[''] before:hidden xl:before:block before:inset-0 before:bg-white/[0.08] before:rounded-xl before:absolute before:border-b-[3px] before:border-solid before:border-black/10 before:dark:border-black/10 before:dark:bg-darkmode-700",
        props.level != "first" && "px-0 mr-0",
        props.className,
      ])}
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      <div
        className={clsx([
          "z-10 dark:text-slate-400",
          props.level == "first" && "-mt-[3px]",
          props.level == "first" &&
            props.menu.active &&
            "dark:text-white text-primary xl:text-white",
        ])}
      >
        <Lucide icon={props.menu.icon} />
      </div>
      <div
        className={clsx([
          "ml-3 flex items-center whitespace-nowrap z-10 dark:text-slate-400",
          props.level == "first" && "-mt-[3px]",
          props.level == "first" &&
            props.menu.active &&
            "font-bold dark:text-white text-slate-800 xl:text-white",
          props.level != "first" && "w-full",
        ])}
      >
        {props.menu.title}
        {props.menu.subMenu && (
          <Lucide
            icon="ChevronDown"
            className={clsx([
              "hidden transition ease-in duration-100 w-4 h-4 xl:block",
              props.level == "first" && "ml-2",
              props.level != "first" && "ml-auto",
            ])}
          />
        )}
      </div>
    </a>
  );
}

export default TopMenu;
