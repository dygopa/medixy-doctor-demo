import clsx from "clsx";
import { IUser } from "domain/core/entities/userEntity";
import { useContext, useEffect, useState } from "react";
import StepByStepMessage from "../StepByStepMessage/StepByStepMessage";
import {
  IStepByStepContext,
  StepByStepContext,
} from "../StepByStepPopup/context/StepByStepContext";
import NotificationMessage from "./NotificationMessage/NotificationMessage";

interface ISmartBarProps {
  user: IUser;
}

export default function SmartBar({ user }: ISmartBarProps) {
  const { state } = useContext<IStepByStepContext>(StepByStepContext);
  const { data: steps, successful } = state.getStepsMessages;

  const [componentTypeShow, setComponentTypeShow] = useState("");
  const [renderComponent, setRenderComponent] = useState(false);

  const getComponentShow = () => {
    setRenderComponent(false);

    if (steps && steps?.length < 3) {
      setComponentTypeShow("STEP_BY_STEP");
      return;
    }

    setComponentTypeShow("NOTIFICATIONS_PERMISSIONS");
  };

  const getComponentByType = () => {
    switch (componentTypeShow) {
      case "STEP_BY_STEP":
        return <StepByStepMessage user={user} />;
      case "NOTIFICATIONS_PERMISSIONS":
        return <NotificationMessage setRenderComponent={setRenderComponent} />;

      default:
        return <div />;
    }
  };

  useEffect(() => {
    getComponentShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  useEffect(() => {
    if (steps.length === 0 && !successful) {
      setRenderComponent(false);
      return;
    }

    if (
      steps &&
      steps.length < 3 &&
      componentTypeShow === "STEP_BY_STEP" &&
      successful
    ) {
      setTimeout(() => {
        setRenderComponent(true);
      }, 1000);
    } else {
      setRenderComponent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps, componentTypeShow]);

  return (
    <div
      className={clsx([
        "opacity-0 transition duration-300",
        renderComponent && "lg:h-[50px] md:h-[50px] h-[80px] opacity-100",
      ])}
    >
      <div className="fixed top-0 z-[99] w-full">
        <div
          className={clsx([
            "opacity-0 h-0 w-full transition duration-300 bg-primary",
            renderComponent &&
              "lg:h-[50px] md:h-[50px] h-[80px] mb-3 md:mb-0 lg:py-0 py-2 opacity-100",
          ])}
        >
          {getComponentByType()}
        </div>
      </div>
    </div>
  );
}
