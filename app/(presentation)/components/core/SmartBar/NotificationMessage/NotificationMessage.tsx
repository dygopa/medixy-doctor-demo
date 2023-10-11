import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NotificationDeniedMessage from "../../NotificationPopup/NotificationDeniedModal/NotificationDeniedModal";
import NotificationGrantedMessage from "../../NotificationPopup/NotificationGrantedMessage/NotificationGrantedMessage";

interface INotificationMessageProps {
  setRenderComponent?: Dispatch<SetStateAction<boolean>> | null;
}

export default function NotificationMessage({
  setRenderComponent,
}: INotificationMessageProps) {
  const [hasPermission, setHasPermission] = useState(false);
  const [showNotificationGrantedModal, setShowNotificationGrantedModal] =
    useState(false);
  const [showNotificationDeniedModal, setShowNotificationDeniedModal] =
    useState(false);

  const onHandleNotificationPermissions = () => {
    if (!("Notification" in window)) return;

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setShowNotificationGrantedModal(true);
        return;
      }

      setShowNotificationDeniedModal(true);
    });
  };

  useEffect(() => {
    setHasPermission(Notification.permission === "granted");

    if (setRenderComponent) {
      setTimeout(() => {
        setRenderComponent(Notification.permission !== "granted");
      }, 1000);
    }
  }, [setRenderComponent]);

  if (hasPermission) return <div />;

  return (
    <>
      <div className="w-full h-full lg:text-center md:text-center">
        <button
          onClick={onHandleNotificationPermissions}
          className="w-full h-full lg:flex md:flex lg:justify-center md:justify-center items-center text-white hover:text-gray-300"
        >
          <p className="text-md font-medium">
            Mantente informado de lo que sucede en tus consultorios digitales y
            mejora tu experiencia activando las notificaciones
          </p>
        </button>
      </div>

      <NotificationGrantedMessage
        showNotificationGrantedModal={showNotificationGrantedModal}
      />

      <NotificationDeniedMessage
        showNotificationDeniedModal={showNotificationDeniedModal}
        setShowNotificationDeniedModal={setShowNotificationDeniedModal}
      />
    </>
  );
}
