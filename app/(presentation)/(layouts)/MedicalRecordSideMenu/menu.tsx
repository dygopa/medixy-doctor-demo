import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import SideMenuTooltip from "(presentation)/components/core/SideMenuTooltip";
import clsx from "clsx";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { FormattedMenu } from "./side-menu";

export default function Menu(props: {
  className?: string;
  isActive: boolean;
  menu: FormattedMenu;
  formattedMenuState: [
    (FormattedMenu | "divider")[],
    Dispatch<SetStateAction<(FormattedMenu | "divider")[]>>
  ];
  level: "first" | "second" | "third";
}) {
  const [formattedMenu, setFormattedMenu] = useState(props.formattedMenuState);

  return (
    <div
      className={clsx([
        "h-[50px] flex items-center pl-5 text-white mb-1 relative rounded-xl dark:text-slate-300",
        {
          "text-white/70 dark:text-slate-400":
            !props.isActive && props.level != "first",
          "bg-primary dark:bg-transparent":
            props.isActive && props.level == "first",
          "before:content-[''] before:block before:inset-0 before:bg-white/[0.08] before:rounded-xl before:absolute before:border-b-[3px] before:border-solid before:border-black/10 before:dark:border-black/10 before:dark:bg-darkmode-700":
            props.isActive && props.level == "first",
          "hover:bg-primary/60 hover:dark:bg-transparent hover:before:block hover:before:inset-0 hover:before:bg-white/[0.04] hover:before:rounded-xl hover:before:absolute hover:before:z-[-1] hover:before:dark:bg-darkmode-700":
            !props.isActive &&
            !props.menu.activeDropdown &&
            props.level == "first",
        },
        props.className,
      ])}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();
        setFormattedMenu([...formattedMenu]);
      }}
    >
      <Link className="flex w-full" href={props.menu.pathname}>
        <div
          className={clsx({
            "z-10 dark:text-slate-300 ":
              props.menu.active && props.level == "first",
            "dark:text-slate-400": !props.menu.active && props.level == "first",
          })}
        >
          <div className="ml-2">
            <Lucide icon={props.menu.icon} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export function Divider<C extends React.ElementType>(
  props: { as?: C } & React.ComponentPropsWithoutRef<C>
) {
  const { className, ...computedProps } = props;
  const Component = props.as || "div";

  return (
    <Component
      {...computedProps}
      className={clsx([
        props.className,
        "w-full h-px bg-white/[0.08] z-10 relative dark:bg-white/[0.07]",
      ])}
    ></Component>
  );
}
