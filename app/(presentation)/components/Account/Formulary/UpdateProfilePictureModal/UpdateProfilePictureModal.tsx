import Loading from "(presentation)/components/core/Loading/Loading";
import { Dispatch, SetStateAction, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface IUpdateProfilePictureModalProps {
  showUpdateProfilePictureModal: boolean;
  setShowUpdateProfilePictureModal: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export default function UpdateProfilePictureModal({
  showUpdateProfilePictureModal,
  setShowUpdateProfilePictureModal,
  loading,
}: IUpdateProfilePictureModalProps) {
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setShowUpdateProfilePictureModal(false);
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div
      className={twMerge([
        "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-hidden bg-gray-900/50 flex flex-col justify-center items-center",
        showUpdateProfilePictureModal ? "visible" : "hidden",
      ])}
    >
      <div
        className={twMerge([
          "w-full md:w-[60%] xl:w-[45%] lg:w-[60%] lg:h-[225px] md:h-[225px] h-[300px] flex overflow-y-hidden flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8",
        ])}
      >
        <div className="w-full px-4">
          <div className="mb-5 text-center">
            <div className="w-full px-4">
              <div className="mb-8">
                <p className="font-bold text-2xl text-slate-900">
                  Subiendo tu foto de perfil
                </p>
              </div>

              <div className="mb-5 text-center">
                <div className="flex justify-center text-center mb-6">
                  <Loading />
                </div>

                <p className="font-normal">
                  Estamos subiendo y actualizando tu foto de perfil, espere un
                  momento por favor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
