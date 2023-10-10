import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";
import { IUser } from "domain/core/entities/userEntity";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface INavigatorProps {
  user: IUser;
}

export default function Navigator({ user }: INavigatorProps) {
  const { state, dispatch, actions } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps } = actions;
  const { data: steps, loading } = state.getStepsMessages;
  const { successful } = state.createUserSteps;

  const [stepIsCompleted, setStepIsCompleted] = useState(false);

  const onStepCompleted = () =>
    createUserSteps(user.accountId, "SERVICE_UPDATED")(dispatch);

  const getStepIsCompleted = () => {
    const serviceEvent = steps.findIndex(
      (event: any) => event.evento === "SERVICE_UPDATED"
    );

    if (serviceEvent >= 0) setStepIsCompleted(true);
  };

  useEffect(() => {
    if (steps && steps.length > 0) getStepIsCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  useEffect(() => {
    if (successful) {
      setStepIsCompleted(true);
    }
  }, [successful]);

  if (loading || !user?.accountId) return <div />;

  return (
    <div className="w-full md:flex justify-between items-center">
      <h2 className="lg:mr-5 lg:mb-0 mb-4 text-2xl font-bold truncate">
        Mis Servicios
      </h2>
      {stepIsCompleted ? (
        <Link href={ServicesRoutesEnum.ServicesCreate}>
          <Button variant="primary" className="w-full md:w-auto">
            <Lucide icon="Plus" className="mr-2" />
            Nuevo servicio
          </Button>
        </Link>
      ) : (
        <Button
          variant="primary"
          className="w-full md:w-auto"
          onClick={() => onStepCompleted()}
        >
          <Lucide icon="Plus" className="mr-2" />
          Nuevo servicio
        </Button>
      )}
    </div>
  );
}
