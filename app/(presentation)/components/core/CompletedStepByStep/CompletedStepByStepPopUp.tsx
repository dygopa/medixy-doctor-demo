import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";
import { IUser } from "domain/core/entities/userEntity";
import Lucide from "../BaseComponents/Lucide";
import Button from "../BaseComponents/Button";
import { useRouter } from "next/navigation";

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
          <div className="mb-14 w-full flex justify-between items-center">
            <p className="font-bold text-2xl text-slate-900">
              ¡Enhorabuena {user?.sex === 1 ? "Dra." : "Dr."} {user?.names}{" "}
              {user?.firstName} {user?.lastName}!
            </p>
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

          <div className="flex justify-center text-center mb-6">
            <Lucide icon="CheckCircle" color="#00bb2b" size={60} />
          </div>

          <div className=" text-center mb-14">
            <p className="font-normal text-[18px] text-slate-900">
              Has creado tu consultorio digital con éxito.
            </p>
          </div>

          <div
            className={twMerge([
              "items-center text-center justify-center mb-4",
              "w-full",
            ])}
          >
            <div className="lg:mb-0 mb-4">
              <Button
                variant="primary"
                className="w-auto"
                onClick={() => {
                  setIsVisible(false);

                  if (redirectUrl && redirectUrl.length > 0) {
                    router.push(redirectUrl);
                  }
                }}
              >
                Entendido, gracias
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedStepByStepPopup;
