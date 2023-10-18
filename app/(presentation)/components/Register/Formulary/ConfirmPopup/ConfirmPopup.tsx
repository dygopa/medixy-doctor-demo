import { twMerge } from "tailwind-merge";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { Dispatch, SetStateAction } from "react";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

interface IConfirmPopupProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  email: string;
  onRegisterUser: () => void;
}

const ConfirmPopup = ({
  isVisible,
  setIsVisible,
  email,
  onRegisterUser,
}: IConfirmPopupProps) => {
  return (
    <div
      className={twMerge([
        "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
        isVisible ? "visible" : "hidden",
      ])}
    >
      <div className="w-[80%] md:w-[60%] lg:w-[60%] h-auto overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8">
        <div className="w-full px-4">
          <div className="flex justify-center text-center mb-6">
            <Lucide icon="Info" color="#216AD9" size={60} />
          </div>

          <div className="text-center mb-3">
            <h6 className="text-lg leading-normal" style={{ color: "#000066" }}>
              Confirma tu información de registro
            </h6>
          </div>

          <div className="text-center my-5">
            <p className="text-[16px] text-gray-400">
              Tu cuenta será registrada en nuestra plataforma con el correo
            </p>

            <p className="text-[16px] font-bold text-primary  mt-4 mb-4">
              {email}
            </p>

            <p className="text-[16px] text-gray-400">
              ¿Estás seguro de registrar tu cuenta con este correo?
            </p>
          </div>

          <div className="lg:flex justify-center text-center mt-8">
            <div>
              <Button
                onClick={() => {
                  onRegisterUser();
                  setIsVisible(false);
                }}
                variant="primary"
                className="w-[250px]"
              >
                Crear cuenta
              </Button>
            </div>

            <div className="lg:ml-4 ml-0 lg:mt-0 mt-4">
              <Button
                onClick={() => setIsVisible(false)}
                variant="outline-primary"
                className="w-[250px]"
              >
                No estoy seguro
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
