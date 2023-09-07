import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Lucide from "../BaseComponents/Lucide";
import {
  IStepByStepContext,
  StepByStepContext,
} from "../StepByStepPopup/context/StepByStepContext";

export default function StepByStepMessage() {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: user } = authState.getUserAuthenticated;

  const { state, actions, dispatch } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { getStepsMessage } = actions;
  const { data: steps, loading, error, successful } = state.getStepsMessages;
  const { successful: createUserStepsSucessful } = state.createUserSteps;

  const [stepsCompleted, setStepsCompleted] = useState(0);

  const getNextLinkSteps = () => {
    if (stepsCompleted === 0) return "/localities/create";

    if (stepsCompleted === 1) return "/schedule/configuration?openPopup=true";

    return "/services";
  };

  useEffect(() => {
    if (user?.accountId) getStepsMessage(user.accountId)(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (successful) setStepsCompleted(steps.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useEffect(() => {
    if (createUserStepsSucessful)
      setStepsCompleted((previousState) => previousState + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createUserStepsSucessful]);

  if (!user?.userId || loading || error || steps?.length === 3) return <div />;

  return (
    <div className="w-full h-[70px] mb-3 md:mb-0 md:h-[50px] bg-primary">
      <div className="w-full h-full text-center ">
        <Link
          href={getNextLinkSteps()}
          className="w-full h-full flex justify-center items-center text-white hover:text-gray-300"
        >
          <p className="text-md font-medium">
            Todavía te faltan pasos a completar para finalizar tus primeros
            pasos en la plataforma{" "}
          </p>

          <p className="font-bold ml-3 text-lg">{stepsCompleted}/3</p>

          {stepsCompleted === 3 && (
            <p className="ml-2">
              <Lucide icon="CheckCircle" size={25} color="#fff" />
            </p>
          )}
        </Link>
      </div>
    </div>
  );
}
