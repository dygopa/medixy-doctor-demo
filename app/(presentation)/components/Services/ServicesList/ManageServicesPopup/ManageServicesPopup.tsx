import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import Button from "(presentation)/components/core/BaseComponents/Button";
import CompletedStepByStepPopup from "(presentation)/components/core/CompletedStepByStep/CompletedStepByStepPopUp";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";
import { useContext, useEffect, useState } from "react";

export default function ManageServicesPopup() {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: user } = authState.getUserAuthenticated;

  const { state, dispatch, actions } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps } = actions;
  const { data: steps, loading } = state.getStepsMessages;
  const { successful } = state.createUserSteps;

  const [stepIsCompleted, setStepIsCompleted] = useState(false);
  const [showCompletedStepModal, setShowCompletedModal] = useState(false);

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
    if (successful && steps?.length === 2) setShowCompletedModal(true);
  }, [successful, steps]);

  if (loading || !user?.accountId) return <div />;

  if (stepIsCompleted || successful) {
    return (
      <CompletedStepByStepPopup
        user={user}
        isVisible={showCompletedStepModal}
        setIsVisible={setShowCompletedModal}
      />
    );
  }

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <div className="lg:w-[450px] md:w-[450px] sm:w-[450px] w-[325px] h-[200px] bg-white rounded-md shadow-md p-4">
          <div>
            <h2 className="text-slate-900 font-bold text-lg">
              Gestión de servicios
            </h2>
          </div>

          <div className="mt-3">
            <p className="text-gray-400 text-md">
              Acá podrás gestionar todos tus servicios creando, editando y
              eliminando los que sean necesarios para tus consultorios
              digitales.
            </p>
          </div>

          <div className="mt-4">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => onStepCompleted()}
            >
              Entendido
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
