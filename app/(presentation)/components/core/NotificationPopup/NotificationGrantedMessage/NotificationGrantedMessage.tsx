import { twMerge } from "tailwind-merge";
import Button from "../../BaseComponents/Button";
import Lucide from "../../BaseComponents/Lucide";

interface INotificationGrantedMessageProps {
  showNotificationGrantedModal: boolean;
}

export default function NotificationGrantedMessage({
  showNotificationGrantedModal,
}: INotificationGrantedMessageProps) {
  return (
    <div
      className={twMerge([
        "z-[100] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
        showNotificationGrantedModal ? "visible" : "hidden",
      ])}
    >
      <div
        className={twMerge([
          "w-full md:w-[60%] xl:w-[45%] lg:w-[60%]  overflow-y-auto flex h-[450px] flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8",
        ])}
      >
        <div className="w-full px-4">
          <div className="mb-14">
            <p className="font-bold text-2xl text-slate-900">
              Notificaciones activadas
            </p>
          </div>

          <div className="mb-5 text-center">
            <div className="w-full px-4">
              <div className="mb-8">
                <p className="font-bold text-2xl text-slate-900">
                  ¡Notificaciones activadas!
                </p>
              </div>

              <div className="mb-5 text-center">
                <div className="flex justify-center text-center mb-6">
                  <Lucide icon="CheckCircle" color="#216AD9" size={70} />
                </div>

                <p className="font-normal">
                  Has dado permiso para recibir notificaciones de la plataforma.
                  Te mantendrémos informado de las ultimas actividades de tus
                  consultorios digitales.
                </p>
              </div>

              <div className="lg:flex items-center text-center justify-center mt-14">
                <div className="lg:mr-6 lg:mb-0 mb-4">
                  <Button
                    variant="primary"
                    className="w-[275px]"
                    onClick={() => window.location.reload()}
                  >
                    De acuerdo, gracias
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
