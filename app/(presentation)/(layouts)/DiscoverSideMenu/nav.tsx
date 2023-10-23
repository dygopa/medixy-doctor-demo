import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Menu, { Divider } from "./menu";
import { FormattedMenu } from "./side-menu";
import { endNavigationOptions, navigationOptions } from "./side-options";

export default function Navigation() {
  const pathname = usePathname();

  const [formattedMenu, setFormattedMenu] =
    useState<Array<FormattedMenu | "divider">>(navigationOptions);

  const [endFormattedMenu, setEndFormattedMenu] =
    useState<Array<FormattedMenu | "divider">>(endNavigationOptions);

  return (
    <div className="flex flex-col justify-between h-[93vh]">
      <div>
        <Link
          href={DashboardRoutesEnum.Dashboard}
          className="sidebar-logo flex justify-center"
          title="Página de inicio de Noodus"
        >
          <Image
            src="/logo-white-noodus.png"
            width={130}
            height={130}
            alt="App logo white"
            priority
          />
        </Link>
        <Divider type="div" className="my-4"></Divider>
        <ul>
          {/* BEGIN: First Child */}
          {formattedMenu.map((menu, menuKey) =>
            menu == "divider" ? (
              <Divider
                type="li"
                className={clsx([
                  "my-6",

                  // Animation
                  `opacity-0 animate-fill-mode-forwards animate-delay-`,
                ])}
                key={menuKey}
              ></Divider>
            ) : (
              <li key={menuKey}>
                <Menu
                  className={clsx({
                    // Animation
                    [`animate-fill-mode-forwards animate-delay ${
                      menu.ignore && "hidden"
                    }`]: menu.pathname !== pathname,
                  })}
                  menu={menu}
                  isActive={menu.pathname === pathname}
                  formattedMenuState={[formattedMenu, setFormattedMenu]}
                  level="first"
                />
                {/* BEGIN: Second Child */}
                {menu.subMenu && (
                  <ul
                    className={clsx([
                      "bg-white/[0.04] rounded-xl relative dark:bg-transparent",
                      "before:content-[''] before:block before:inset-0 before:bg-primary/60 before:rounded-xl before:absolute before:z-[-1] before:dark:bg-darkmode-900/30",
                      { block: menu.activeDropdown },
                      { hidden: !menu.activeDropdown },
                    ])}
                  >
                    {menu.subMenu.map((subMenu, subMenuKey) => (
                      <li key={subMenuKey}>
                        <Menu
                          className={clsx({
                            // Animation
                            [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                              (subMenuKey + 1) * 10
                            }`]: !subMenu.active,
                          })}
                          menu={subMenu}
                          isActive={subMenu.pathname === pathname}
                          formattedMenuState={[formattedMenu, setFormattedMenu]}
                          level="second"
                        />
                      </li>
                    ))}
                  </ul>
                )}
                {/* END: Second Child */}
              </li>
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
                  `animate-fill-mode-forwards animate-delay`,
                ])}
                key={menuKey}
              ></Divider>
            ) : (
              <Menu
                key={menuKey}
                className={clsx({
                  // Animation
                  [`animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay ${
                    menu.ignore && "hidden"
                  }`]: menu.pathname !== pathname,
                })}
                menu={menu}
                isActive={menu.pathname === pathname}
                formattedMenuState={[formattedMenu, setFormattedMenu]}
                level="first"
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
}
