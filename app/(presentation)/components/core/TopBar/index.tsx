import { useState } from "react";
import _ from "lodash";
import clsx from "clsx";
import { Popover } from "@headlessui/react";
import Breadcrumb from "../BaseComponents/Breadcrumb";
import Lucide from "../BaseComponents/Lucide";
import fakerData from "(presentation)/(utils)/faker";
import Image from "next/image";
import { Menu } from "../BaseComponents/Headless";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountRoutesEnum } from "(presentation)/(routes)/accountRoutes";
import { IUser } from "domain/core/entities/userEntity";
import { FiUser } from "react-icons/fi";

interface INavigation {
  title: string;
  pathname: string;
}

function Main({
  navigation,
  user
}: {
  navigation: INavigation[];
  user: IUser;
}) {
  const pathname = usePathname();

  const [searchDropdown, setSearchDropdown] = useState(false);
  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  return (      
    <div className="h-[67px] z-[51] flex items-center border-b border-slate-200 sticky top-0 left-0 ">
      <Breadcrumb className="hidden mr-auto sm:flex">
        {navigation.map((nav) => (
          <Link key={nav.title} href={nav.pathname}>
            <Breadcrumb className="mr-5">
              <p
                className={
                  pathname === nav.pathname ? "text-primary" : "text-dark"
                }
              >
                {nav.title}
              </p>
            </Breadcrumb>
          </Link>
        ))}
      </Breadcrumb>
      <Link href="/account" className="w-[12rem] h-full flex justify-end items-center gap-3">
        <div className="w-[9rem] h-full flex flex-col justify-center items-end">
          <p className="font-semibold text-sm text-slate-900">{user?.names} {user?.firstName}</p>
          <p className="font-light text-sm text-slate-500">Médico</p>
        </div>
        <div className="w-[3rem] h-[3rem] flex flex-col justify-center items-center rounded-xl overflow-hidden bg-slate-300">
          <FiUser/>
        </div>
      </Link>
    </div>
  );
}

export default Main;
