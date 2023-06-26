import _ from "lodash";
import Breadcrumb from "../BaseComponents/Breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUser } from "react-icons/fi";

interface INavigation {
  title: string;
  pathname: string;
}

function Main({ navigation }: { navigation: INavigation[] }) {
  const pathname = usePathname();

  return (
    <div className="h-[67px] z-[51] flex items-center border-b border-slate-200 sticky bg-slate-100 top-0 left-0 w-full">
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
      <div className="lg:w-fit w-full h-full flex justify-end items-center gap-3">
        <div className="w-fit min-w-[9rem] h-full flex flex-col justify-center items-end">
          <p className="font-semibold text-sm text-slate-900">Prosit</p>
          <p className="font-light text-sm text-slate-500">Administrador</p>
        </div>
        <div className="w-[3rem] h-[3rem] flex flex-col justify-center items-center rounded-xl overflow-hidden p-0 bg-slate-300">
          <FiUser />
        </div>
      </div>
    </div>
  );
}

export default Main;
