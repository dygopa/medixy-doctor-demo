import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";
import { IUser } from "domain/core/entities/userEntity";
import Lucide from "../BaseComponents/Lucide";
import Button from "../BaseComponents/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ConfigEnviroment } from "infrastructure/config/env/env";

interface IAlertProps {
  user: IUser;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  redirectUrl?: string | null;
}

const CompletedStepByStepPopup = ({
  user,
  isVisible,
  setIsVisible,
  redirectUrl,
}: IAlertProps) => {
  const router = useRouter();

  return (
    <div
      className={twMerge([
        "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
        isVisible ? "visible" : "hidden",
      ])}
    >
      <div className="w-[80%] md:w-[60%] lg:w-[60%] h-auto overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8">
        <div className="w-full px-4">
          <div className="w-full flex justify-end items-center">
            <Lucide
              icon="X"
              size={25}
              onClick={(e) => {
                setIsVisible(false);

                if (redirectUrl && redirectUrl.length > 0) {
                  router.push(redirectUrl);
                }
              }}
              className="cursor-pointer"
            />
          </div>

          <div className="text-center mb-3">
            <h6 className="text-lg leading-normal" style={{ color: "#000066" }}>
              ¡Enhorabuena, {user?.sex === 1 ? "Doctora" : "Doctor"}!
            </h6>
          </div>

          <div className="text-center mb-6">
            <h3
              className="text-[30px] font-bold leading-normal"
              style={{ color: "#000066" }}
            >
              Has creado tu Consultorio Digital
            </h3>
          </div>

          <div className="text-center my-5">
            <p className="text-[16px] text-gray-400">
              Estamos muy contentos de que hayas elegido nuestra plataforma{" "}
              <br />
              para ayudarte a brindar la mejor atención médica a tus pacientes.
            </p>
          </div>

          <div className="flex justify-center text-center my-10">
            <img
              className="object-cover"
              src="./images/CompletedOnboarding.png"
              alt=""
            />
          </div>

          <div className=" text-center mb-14">
            <Link
              target="_blank"
              href={
                new ConfigEnviroment().nextPublicMarketPlaceDomain +
                `/discover/specialists/${user.userId}`
              }
              className="font-normal text-lg text-primary underline"
            >
              Has creado tu consultorio digital con éxito.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedStepByStepPopup;
