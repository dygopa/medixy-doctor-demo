/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import Breadcrumb from "../BaseComponents/Breadcrumb";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiChevronLeft,
  FiClipboard,
  FiGlobe,
  FiMail,
  FiSend,
  FiShare,
  FiUser,
} from "react-icons/fi";
import { IUser } from "domain/core/entities/userEntity";
import Image from "next/image";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { twMerge } from "tailwind-merge";
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import NotificationPopup from "../NotificationPopup";
import NotificationPopupProvider from "../NotificationPopup/context/NotificationPopupContext";
import nookies from "nookies";
import {
  IStepByStepContext,
  StepByStepContext,
} from "../StepByStepPopup/context/StepByStepContext";

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
  const { actions, dispatch } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { changeOpenPopup, changeOpenPopupText } = actions;

  const pathname = usePathname();
  const router = useRouter();

  const [activeShortcuts, setActiveShortcuts] = useState(false);

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActiveShortcuts(false);
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
    const [copied, setCopied] = useState(false);
    let token = nookies.get(undefined, "access_token");
    let userLink =
      process.env.NEXT_PUBLIC_MARKETPLACE_PROJECT_DOMAIN +
      `/discover/specialists/${user.userId}`;

    useMemo(() => {
      if (copied) {
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }
    }, [copied]);

    return (
      <div className="w-full grid grid-cols-3 gap-1 relative pt-3">
        <CopyToClipboard text={userLink} onCopy={() => setCopied(true)}>
          <div
            className={twMerge([
              "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
              copied
                ? "bg-green-600 text-white"
                : "bg-slate-100 hover:bg-slate-200",
            ])}
          >
            <span
              className={twMerge([
                "text-xl",
                copied ? "text-white" : "text-slate-900",
              ])}
            >
              <FiClipboard />
            </span>
            {copied ? (
              <p className="text-xs text-white text-center">Enlace copiado</p>
            ) : (
              <p className="text-xs text-slate-500 text-center">
                Copiar <br /> enlace
              </p>
            )}
          </div>
        </CopyToClipboard>
        <Link
          href={`${userLink}`}
          target="_blank"
          className={twMerge([
            "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
            "bg-slate-100 hover:bg-slate-200",
          ])}
        >
          <span className={twMerge(["text-xl", "text-slate-900"])}>
            <FiGlobe />
          </span>
          <p className="text-xs text-slate-500 text-center">
            Ir al <br /> enlace
          </p>
        </Link>
        <EmailShareButton url={userLink}>
          <div
            className={twMerge([
              "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
              "bg-slate-100 hover:bg-slate-200",
            ])}
          >
            <span className={twMerge(["text-xl", "text-slate-900"])}>
              <FiMail />
            </span>
            <p className="text-xs text-slate-500 text-center">Email</p>
          </div>
        </EmailShareButton>
        <WhatsappShareButton url={userLink}>
          <div
            className={twMerge([
              "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
              "bg-slate-100 hover:bg-slate-200",
            ])}
          >
            <WhatsappIcon color="#FFF" size={30} borderRadius={20} />
            <p className="text-xs text-slate-500 text-center">Whatsapp</p>
          </div>
        </WhatsappShareButton>
        <FacebookShareButton url={userLink}>
          <div
            className={twMerge([
              "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
              "bg-slate-100 hover:bg-slate-200",
            ])}
          >
            <FacebookIcon color="#FFF" size={30} borderRadius={20} />
            <p className="text-xs text-slate-500 text-center">Facebook</p>
          </div>
        </FacebookShareButton>
        <TwitterShareButton url={userLink}>
          <div
            className={twMerge([
              "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
              "bg-slate-100 hover:bg-slate-200",
            ])}
          >
            <TwitterIcon color="#FFF" size={30} borderRadius={20} />
            <p className="text-xs text-slate-500 text-center">Twitter</p>
          </div>
        </TwitterShareButton>
        <TelegramShareButton url={userLink}>
          <div
            className={twMerge([
              "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
              "bg-slate-100 hover:bg-slate-200",
            ])}
          >
            <TelegramIcon color="#FFF" size={30} borderRadius={20} />
            <p className="text-xs text-slate-500 text-center">Telegram</p>
          </div>
        </TelegramShareButton>
        <LineShareButton url={userLink}>
          <div
            className={twMerge([
              "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
              "bg-slate-100 hover:bg-slate-200",
            ])}
          >
            <LineIcon color="#FFF" size={30} borderRadius={20} />
            <p className="text-xs text-slate-500 text-center">Line</p>
          </div>
        </LineShareButton>
        <LinkedinShareButton url={userLink}>
          <div
            className={twMerge([
              "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
              "bg-slate-100 hover:bg-slate-200",
            ])}
          >
            <LinkedinIcon color="#FFF" size={30} borderRadius={20} />
            <p className="text-xs text-slate-500 text-center">Linkedin</p>
          </div>
        </LinkedinShareButton>
        <RedditShareButton url={userLink}>
          <div
            className={twMerge([
              "cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1",
              "bg-slate-100 hover:bg-slate-200",
            ])}
          >
            <RedditIcon color="#FFF" size={30} borderRadius={20} />
            <p className="text-xs text-slate-500 text-center">Reddit</p>
          </div>
        </RedditShareButton>
      </div>
    );
  };

  const PopupShortcuts = ({
    customRef,
  }: {
    customRef: React.LegacyRef<HTMLDivElement>;
  }) => {
    const [activeShortcut, setActiveShortcut] = useState(1);

    return (
      <div
        ref={customRef}
        className={twMerge([
          "border rounded-lg overflow-y-scroll bg-white absolute flex flex-col justify-start items-start p-3 shadow-md lg:right-[5%] left-[4%] w-[20rem]",
          "lg:h-[35vh] lg:top-[4rem]",
          "md:h-[35vh] md:top-[4rem]",
          "h-[40vh] top-[4rem]",
        ])}
      >
        <div className="w-full border-b pb-2 text-left flex justify-start items-center gap-2">
          {/* activeShortcut > 0 && (
            <span
              onClick={() => {
                setActiveShortcut(0);
              }}
              className="text-slate-900 cursor-pointer transition w-[1rem] h-[1rem] flex flex-col justify-center items-center rounded-xl text-base "
            >
              <FiChevronLeft />
            </span>
            ) */}
          <p className="font-medium text-base text-slate-900">
            {activeShortcut === 0 && "Acceso rápido"}
            {activeShortcut === 1 && "Compartir perfíl"}
          </p>
        </div>
        {activeShortcut === 0 ? (
          <div className="w-full grid grid-cols-3 gap-1 relative pt-3">
            <div
              onClick={() => {
                setActiveShortcut(1);
              }}
              className="cursor-pointer transition h-[5rem] rounded-md flex flex-col justify-center items-center gap-1 bg-slate-100 hover:bg-slate-200"
            >
              <span className="text-xl text-slate-900">
                <FiShare />
              </span>
              <p className="text-xs text-slate-500 text-center">
                Compartir <br /> perfíl
              </p>
            </div>
          </div>
        ) : (
          <>{activeShortcut === 1 && <ShareLinkComponent />}</>
        )}
      </div>
    );
  };

  return (
    <div className="h-[67px] z-[70] flex items-center justify-between border-b border-slate-200 sticky bg-slate-100 top-0 left-0 w-full">
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
      <div className="lg:w-fit md:w-fit w-full h-full flex justify-end items-center gap-2 relative">
        <div className="flex items-center">
          <div className="mr-3">
            <NotificationPopupProvider>
              <NotificationPopup user={user} />
            </NotificationPopupProvider>
          </div>
          {user?.userId && (
            <button
              onClick={() => {
                if (user.completedProfile) {
                  setActiveShortcuts(!activeShortcuts);
                } else {
                  changeOpenPopup(true)(dispatch);
                  changeOpenPopupText(
                    "Para compartir el link de tu perfil en el directorio, es necesario que completes el primer paso."
                  )(dispatch);
                }
              }}
              className="cursor-pointer transition flex flex-col justify-center items-center rounded-lg lg:px-4 lg:py-2 p-3 text-lg overflow-hidden text-slate-700 bg-slate-100 hover:bg-slate-300 mr-6"
              style={{ backgroundColor: "#FFC127" }}
            >
              <div className="flex items-center">
                <div className="mr-2 lg:block hidden">
                  <p className="text-sm">Compartir link</p>
                </div>
                <FiSend />
              </div>
            </button>
          )}
          {activeShortcuts && <PopupShortcuts customRef={wrapperRef} />}
        </div>
        <button
          onClick={() => {
            if (user.completedProfile) {
              router.push("/account");
            } else {
              changeOpenPopup(true)(dispatch);
            }
          }}
          className="w-fit h-full flex justify-end items-center gap-3"
        >
          <div className=" text-left h-full flex flex-col justify-center items-end">
            {user?.sex === 1 ? (
              <p className="font-semibold text-sm text-slate-900">
                Dra. {user?.names} <br className="md:hidden" />{" "}
                {user?.firstName}
              </p>
            ) : (
              <p className="font-semibold text-sm text-slate-900">
                Dr. {user?.names} <br className="md:hidden" /> {user?.firstName}
              </p>
            )}
            <p className="font-light text-sm text-slate-500">Médico</p>
          </div>
          <div className="w-[3rem] h-[3rem] flex flex-col justify-center items-center rounded-xl overflow-hidden p-0 bg-slate-300">
            {user?.avatar?.length > 0 ? (
              <Image
                src={user?.avatar}
                alt=""
                width={200}
                height={200}
                className="w-[3rem] h-[3rem] rounded-md object-contain"
              />
            ) : (
              <FiUser />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

export default Main;
