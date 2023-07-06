import _ from "lodash";
import Breadcrumb from "../BaseComponents/Breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronLeft, FiClipboard, FiGlobe, FiGrid, FiShare, FiUser } from "react-icons/fi";
import { IUser } from "domain/core/entities/userEntity";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { twMerge } from "tailwind-merge";

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

  const [activeShortcuts, setActiveShortcuts] = useState(false)
  
  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref:React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event:MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActiveShortcuts(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]); 
  }

  useOutsideAlerter(wrapperRef);

  const ShareLinkComponent = () => {
    
    const [copied, setCopied] = useState(false)
    let userLink = process.env.NEXT_PUBLIC_MARKETPLACE_PROJECT_DOMAIN + `/discover/specialists/${user.userId}`;

    useMemo(()=>{
      if(copied){
        setTimeout(() => {
          setCopied(false)
        }, 1000);
      }
    },[copied])

    return(
      <div className="w-full grid grid-cols-3 gap-1 relative pt-3">
        <CopyToClipboard
          text={userLink}
          onCopy={() => setCopied(true)}>
          <div
          className={twMerge([
            "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
            copied ? "bg-green-600 text-white" : "bg-slate-100 hover:bg-slate-200"
          ])}>
            <span 
            className={twMerge([
              "text-xl",
              copied ? "text-white" : "text-slate-900"
            ])}>
              <FiClipboard/>
            </span>
            {
              copied ? 
              <p className="text-xs text-white text-center">
                Enlace copiado
              </p>
              : 
              <p className="text-xs text-slate-500 text-center">
                Copiar <br/> enlace
              </p>
            }
          </div>
        </CopyToClipboard>
        <Link
        href={userLink}
        target="_blank"
        className={twMerge([
          "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
          "bg-slate-100 hover:bg-slate-200"
        ])}>
          <span 
          className={twMerge([
            "text-xl",
            "text-slate-900"
          ])}>
            <FiGlobe/>
          </span>
          <p className="text-xs text-slate-500 text-center">
            Ir al <br/> enlace
          </p>
        </Link>
      </div> 
    )
  }

  const PopupShortcuts = ({customRef}:{
    customRef: React.LegacyRef<HTMLDivElement>;
  }) => {

    const [activeShortcut, setActiveShortcut] = useState(0)

    return(
      <div ref={customRef} className={twMerge([
        "border rounded-lg overflow-hidden bg-white fixed flex flex-col justify-start items-start p-3 shadow-md right-[5%] w-[20rem]",
        "lg:h-[35vh] lg:top-[4rem]",
        "md:h-[35vh] md:top-[4rem]",
        "h-[40vh] top-[9rem]",
      ])}>
        <div className="w-full border-b pb-2 text-left flex justify-start items-center gap-2">
          {activeShortcut > 0 && 
            <span 
            onClick={()=>{ setActiveShortcut(0) }}
            className="text-slate-900 cursor-pointer transition w-[1rem] h-[1rem] flex flex-col justify-center items-center rounded-xl text-base ">
              <FiChevronLeft/>
            </span>
          }
          <p className="font-medium text-base text-slate-900">
            {activeShortcut === 0 && "Acceso rápido"}
            {activeShortcut === 1 && "Compartir perfíl"}
          </p>
        </div>
        {activeShortcut === 0 ? 
          <div className="w-full grid grid-cols-3 gap-1 relative pt-3">
            <div 
            onClick={()=>{ setActiveShortcut(1) }}
            className="cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1 bg-slate-100 hover:bg-slate-200">
              <span className="text-xl text-slate-900">
                <FiShare/>
              </span>
              <p className="text-xs text-slate-500 text-center">Compartir <br/> perfíl</p>
            </div>

          </div> 
        : 
          <>
            {activeShortcut === 1 && <ShareLinkComponent/>}
          </>
        }
      </div>
    )
  }

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
      <div className="lg:w-fit md:w-fit w-full h-full flex justify-end items-center gap-1 relative">
        <div onClick={()=>{ setActiveShortcuts(!activeShortcuts) }} className="cursor-pointer transition w-[2.5rem] h-[2.5rem] flex flex-col justify-center items-center rounded-xl text-lg overflow-hidden text-slate-700 bg-slate-100 hover:bg-slate-300">  
          <FiGrid />
        </div>
        {activeShortcuts && <PopupShortcuts customRef={wrapperRef} />}
        <Link
          href="/account"
          className="w-fit h-full flex justify-end items-center gap-3"
        >
          <div className="w-fit min-w-[8rem] h-full flex flex-col justify-center items-end">
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
    </div>
  );
}

export default Main;
