import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
} from "react";
import { IUserCardContext, UserCardContext } from "../context/UserCardContext";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Specialist } from "domain/core/entities/specialists/specialist";
import clsx from "clsx";
import TooltipIndicator from "(presentation)/components/core/TooltipIndacator/tooltipIndicator";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

interface IAvatarProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  specialist: Specialist;
  disabled: boolean;
}

const Avatar = ({ step, setStep, specialist, disabled }: IAvatarProps) => {
  const { state, actions, dispatch } =
    useContext<IUserCardContext>(UserCardContext);
  const { updateAvatar } = actions;
  const { data, loading, error, successful } = state.updateAvatar;

  let avatarRef = useRef<HTMLInputElement>(null);

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  async function handleChangeAvatar(e: ChangeEvent<HTMLInputElement>) {
    let file = e.target.files![0] as File;

    let base64 = await toBase64(file);
    let splittedType = file!.type.split("/");
    var base64result = base64?.toString().split(",")[1];

    let obj = {
      id: specialist.accountId,
      data: base64result,
      type: `${splittedType[1]}`,
    };

    updateAvatar(obj, specialist.accountId)(dispatch);
  }

  const handleClickRef = () => avatarRef.current && avatarRef.current.click();

  return (
    <>
      {step === 1 && (
        <>
          <div className="absolute z-[201] top-18 left-[300px] lg:block md:block hidden">
            <TooltipIndicator
              tittle="Sube una foto de perfil"
              description="Una foto de ti, ayudará a generar más confianza a tus pacientes o futuros pacientes. Haz click en el cuadro para subir una foto."
              disabledButton={
                specialist.avatar && specialist.avatar.length > 0 ? false : true
              }
              direcction="left"
              onClick={
                loading
                  ? () => {}
                  : () => {
                      setStep(step + 1);
                    }
              }
              tittleButton="Continuar"
            />
          </div>

          <div className="absolute z-[201] top-[350px] left-2 right-2 lg:hidden md:hidden block">
            <TooltipIndicator
              tittle="Sube una foto de perfil"
              description="Una foto de ti, ayudará a generar más confianza a tus pacientes o futuros pacientes. Haz click en el cuadro para subir una foto."
              disabledButton={
                specialist.avatar && specialist.avatar.length > 0 ? false : true
              }
              direcction="left"
              onClick={
                loading
                  ? () => {}
                  : () => {
                      setStep(step + 1);
                    }
              }
              tittleButton="Continuar"
            />
          </div>
        </>
      )}

      <div
        className={clsx([
          "col-span-1 relative flex flex-col justify-center items-center",
          step === 1 && "fixed z-[201]",
        ])}
      >
        {specialist?.avatar?.length > 0 || data ? (
          <>
            <span
              className={twMerge([
                "w-36 h-36 overflow-hidden rounded-md border block relative",
                !disabled && "cursor-pointer",
              ])}
            >
              {!disabled && (
                <input
                  accept="image/png, image/jpeg, application/pdf"
                  type="file"
                  ref={avatarRef}
                  className="opacity-0 top-0 left-0 w-full h-full z-50 absolute cursor-pointer"
                  onChange={(e) => {
                    !disabled && handleChangeAvatar(e);
                  }}
                />
              )}
              <Image
                className="object-contain w-full h-full"
                src={data ? data.toString() : specialist?.avatar}
                alt=""
                fill
              />
            </span>

            {!disabled && (
              <p className="text-[11px] text-slate-500 font-medium text-center mt-1">
                Recomendado <br /> (.png, .jpg, .jpeg)
              </p>
            )}
            {loading && (
              <p className="text-[13px] text-slate-800 font-bold">
                Guardando su foto de perfil...
              </p>
            )}
          </>
        ) : (
          <>
            {!disabled && (
              <input
                accept="image/png, image/jpeg, application/pdf"
                type="file"
                ref={avatarRef}
                className="hidden"
                onChange={(e) => {
                  !disabled && handleChangeAvatar(e);
                }}
              />
            )}
            <div
              onClick={handleClickRef}
              className={twMerge([
                "w-36 h-36 overflow-hidden rounded-md border flex flex-col justify-center items-center ",
                !disabled && "hover:bg-slate-200 cursor-pointer",
                step === 1 && "bg-slate-200",
              ])}
            >
              <Lucide icon="image" size={60} color="#216AD9" />
            </div>
            {!disabled && (
              <p
                className={clsx([
                  "text-[11px]  font-medium text-center mt-1",
                  step === 1 ? "text-white" : "text-slate-500",
                ])}
              >
                Recomendado <br /> (.png, .jpg, .jpeg)
              </p>
            )}
            {loading && (
              <p
                className={clsx([
                  "text-[13px] font-bold",
                  step === 1 ? "text-white" : "text-slate-800",
                ])}
              >
                Guardando su foto de perfil...
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Avatar;
