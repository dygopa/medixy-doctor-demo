import { twMerge } from "tailwind-merge";
import { useMemo, useState } from "react";
import Button from "../Button";
import Lucide from "../Lucide";

type Variant = "success" | "error" | "warning";

interface IAlertProps {
  tittle: string;
  variant?: Variant;
  show: boolean;
  description: string;
  textButtonPrincipal?: string;
  onClickButtonPrincipal?: Function;
}

const sessionExpiredComponent = ({
  tittle,
  show,
  description,
  textButtonPrincipal,
  onClickButtonPrincipal,
}: IAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useMemo(() => {
    setIsVisible(show);
  }, [show]);

  return (
    <div
      className={twMerge([
        "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
        isVisible ? "visible" : "hidden",
      ])}
    >
      <div className="w-[80%] md:w-[60%] lg:w-[60%] h-auto overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8">
        <div className="w-full px-4">
          <div className="mb-14 w-full flex justify-center items-center">
            <p className="font-bold text-2xl text-slate-900">{tittle}</p>
          </div>

          <div className="flex justify-center text-center mb-6">
            <Lucide icon="XCircle" color="#216AD9" size={60} />
          </div>

          <div className=" text-center mb-14">
            <p className="font-normal text-[18px] text-slate-900">
              {description}
            </p>
          </div>

          <div className="items-center text-center justify-center mb-4">
            {textButtonPrincipal && onClickButtonPrincipal && (
              <div className="lg:mb-0 mb-4">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => onClickButtonPrincipal()}
                >
                  {textButtonPrincipal}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default sessionExpiredComponent;
