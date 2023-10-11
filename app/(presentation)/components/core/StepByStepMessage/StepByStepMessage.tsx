import { IUser } from "domain/core/entities/userEntity";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Lucide from "../BaseComponents/Lucide";
import {
  IStepByStepContext,
  StepByStepContext,
} from "../StepByStepPopup/context/StepByStepContext";

interface IStepByStepMessageProps {
  user: IUser;
}

export default function StepByStepMessage({ user }: IStepByStepMessageProps) {
  const { state, actions, dispatch } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { getStepsMessage, changeOpenPopup } = actions;
  const { data: steps, loading, error, successful } = state.getStepsMessages;
  const { successful: createUserStepsSucessful } = state.createUserSteps;

  const [stepsCompleted, setStepsCompleted] = useState(0);

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

  if (!error)
    return (
      <div className="w-full h-full lg:text-center md:text-center">
        <button
          onClick={
            steps?.length < 3 ? () => changeOpenPopup(true)(dispatch) : () => {}
          }
          className="w-full h-full lg:flex md:flex lg:justify-center md:justify-center items-center text-white hover:text-gray-300"
        >
          <p className="text-md font-medium">
            Todavía te faltan pasos a completar para finalizar tus primeros
            pasos en la plataforma{" "}
          </p>

          <p className="font-bold lg:ml-3 md:ml-3 sm:ml-0 lg:mt-0 mt-1 text-lg sm:text-center">
            {stepsCompleted}/3
          </p>

          {stepsCompleted === 3 && (
            <p className="ml-2">
              <Lucide icon="CheckCircle" size={25} color="#fff" />
            </p>
          )}
        </button>
      </div>
    );

  return <div />;
}
