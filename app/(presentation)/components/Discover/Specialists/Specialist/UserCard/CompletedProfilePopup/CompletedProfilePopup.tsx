import { twMerge } from "tailwind-merge";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";

interface ICompletedProfilePopupProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const CompletedProfilePopup = ({
  isVisible,
  setIsVisible,
}: ICompletedProfilePopupProps) => {
  const {
    actions: actionsStep,
    state: stateSteps,
    dispatch: dispatchStep,
  } = useContext<IStepByStepContext>(StepByStepContext);
  const { changeOpenPopup } = actionsStep;

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
            <AiOutlineCheckCircle size={70} color="#216AD9" />
          </div>

          <div className="text-center mb-3">
            <h6 className="text-lg leading-normal" style={{ color: "#000066" }}>
              ¡Enhorabuena, has completado tu perfil!
            </h6>
          </div>

          <div className="text-center mb-6">
            <h3
              className="text-[30px] font-bold leading-normal"
              style={{ color: "#000066" }}
            >
              Has completado los datos básicos de tu perfil
            </h3>
          </div>

          <div className="text-center my-5">
            <p className="text-[16px] text-gray-400">
              Los datos proporcionados serán visibles en tu directorio, esta
              información es importante ya que brinda una rápida visualización a
              tus pacientes o futuros pacientes que te busquen o encuentren en
              tu directorio
            </p>
          </div>

          <div className=" flex justify-center text-center mt-8">
            <Button
              onClick={() => {
                changeOpenPopup(true)(dispatchStep);
                setIsVisible(false);
              }}
              variant="primary"
            >
              Continuar con mis pasos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedProfilePopup;
