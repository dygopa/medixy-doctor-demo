import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../BaseComponents/Button";
import Lucide from "../../BaseComponents/Lucide";

interface INotificationDeniedMessageProps {
  showNotificationDeniedModal: boolean;
  setShowNotificationDeniedModal: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationDeniedMessage({
  showNotificationDeniedModal,
  setShowNotificationDeniedModal,
}: INotificationDeniedMessageProps) {
  return (
    <div
      className={twMerge([
        "z-[100] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
        showNotificationDeniedModal ? "visible" : "hidden",
      ])}
    >
      <div
        className={twMerge([
          "w-full md:w-[60%] xl:w-[45%] lg:w-[60%]  overflow-y-auto flex h-[550px] flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8",
        ])}
      >
        <div className="w-full px-4">
          <div className="mb-14">
            <p className="font-bold text-2xl text-slate-900">
              Notificaciones denegada
            </p>
          </div>

          <div className="mb-5 text-center">
            <div className="w-full px-4">
              <div className="mb-8">
                <p className="font-bold text-2xl text-slate-900">
                  Notificaciones denegadas
                </p>
              </div>

              <div className="mb-5 text-center">
                <div className="flex justify-center text-center mb-6">
                  <Lucide icon="AlertCircle" color="#216AD9" size={70} />
                </div>

                <p className="font-normal mb-6">
                  No has permitido a la plataforma enviarte notificaciones. Te
                  recomendamos activar las notificaciones desde el navegador que
                  estás utilizando para poder mantenerte informado de lo que
                  sucede en tus consultorios digitales.
                </p>

                <div className="text-center flex justify-center">
                  <Image
                    src="https://hqdiyiqhqbknumobtkox.supabase.co/storage/v1/object/public/utils/notifications-active.png"
                    width={327}
                    height={45}
                    alt="Notifications active media"
                  />
                </div>
              </div>

              <div className="lg:flex items-center text-center justify-center mt-14">
                <div className="lg:mr-6 lg:mb-0 mb-4">
                  <Button
                    variant="primary"
                    className="w-[275px]"
                    onClick={() => setShowNotificationDeniedModal(false)}
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
