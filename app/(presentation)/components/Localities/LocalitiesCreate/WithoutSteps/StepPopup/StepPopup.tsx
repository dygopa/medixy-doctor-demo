import { twMerge } from "tailwind-merge";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useRouter } from "next/navigation";

interface IStepPopupProps {
  isVisible: boolean;
  userId: string;
}

const StepPopup = ({ isVisible, userId }: IStepPopupProps) => {
  const router = useRouter();

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
              ¡Vamos paso por paso!
            </h6>
          </div>

          <div className="text-center my-5">
            <p className="text-[16px] text-gray-400">
              Para crear un consultorio digital, es primordial completar datos
              primordiales de tu perfil antes, una vez completado el paso,
              podrás crear tu primer consultorio digital.
            </p>
          </div>

          <div className="lg:flex justify-center text-center mt-8">
            <div>
              <Button
                onClick={() => {
                  router.push(`/discover/specialist/${userId}`);
                }}
                variant="primary"
                className="w-[250px]"
              >
                Completar perfil
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPopup;