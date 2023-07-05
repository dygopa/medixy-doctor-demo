import _ from "lodash";
import Breadcrumb from "../BaseComponents/Breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { IUser } from "domain/core/entities/userEntity";
import Image from "next/image";

interface INavigation {
  title: string;
  pathname: string;
}

function Main({
  navigation,
  user,
}: {
  navigation: INavigation[];
  user: IUser;
}) {
  const pathname = usePathname();

  return (
    <div className="h-[67px] z-[98] flex items-center border-b border-slate-200 sticky bg-slate-100 top-0 left-0 w-full">
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
      <Link
        href="/account"
        className="lg:w-fit w-full h-full flex justify-end items-center gap-3"
      >
        <div className="w-fit min-w-[9rem] h-full flex flex-col justify-center items-end">
          <p className="font-semibold text-sm text-slate-900">
            {user?.names} {user?.firstName}
          </p>
          <p className="font-light text-sm text-slate-500">Médico</p>
        </div>
        <div className="w-[3rem] h-[3rem] flex flex-col justify-center items-center rounded-xl overflow-hidden p-0 bg-slate-300">
          {user?.avatar?.length > 0 ? (
            <Image
              src={user?.avatar}
              alt=""
              width={200}
              height={200}
              className="w-[3rem] h-[3rem] rounded-md"
            />
          ) : (
            <FiUser />
          )}
        </div>
      </Link>
    </div>
  );
}

export default Main;
