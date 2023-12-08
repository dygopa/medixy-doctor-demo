import { twMerge } from "tailwind-merge";
import Button from "../BaseComponents/Button";

interface ITooltipProps {
  tittle: string;
  description: string;
  onClick: Function;
  onClickSecondary?: Function;
  tittleButton: string;
  direcction: "bootom" | "top" | "rigth" | "left";
  disabledButton?: boolean;
  secondaryDisabledButton?: boolean;
  secondaryTittleButton?: string;
  errorMessage?: string | null;
}

export default function TooltipIndicator({
  tittle,
  description,
  onClick,
  tittleButton,
  direcction,
  disabledButton = false,
  secondaryDisabledButton = true,
  onClickSecondary = () => {},
  secondaryTittleButton = "",
  errorMessage,
}: ITooltipProps) {
  return (
    <div
      className={twMerge([
        "w-fit flex",
        direcction === "top" && "flex-col items-center",
        direcction === "bootom" && "flex-col items-center",
        direcction === "rigth" && "items-center",
        direcction === "left" && "items-center",
      ])}
    >
      <div
        className={`triangle-top z-[101] border-white text-white ${
          direcction !== "top" && "hidden"
        }`}
      />
      <div
        className={`triangle-left z-[101] border-white text-white ${
          direcction !== "left" && "hidden"
        }`}
      />
      <div className="max-w-[400px] z-[100] w-fit h-fit py-3 bg-white rounded-md px-5 shadow-md">
        <p className="font-bold text-base text-slate-900">{tittle}</p>
        <p className="font-light text-sm text-slate-500 py-4">{description}</p>
        {errorMessage && (
          <p className="font-light text-sm text-danger mb-4">{errorMessage}</p>
        )}
        <div
          className={`w-full flex justify-start ${disabledButton && "hidden"}`}
        >
          <Button
            variant="primary"
            disabled={disabledButton}
            onClick={() => onClick()}
            className="mb-2 text-left"
          >
            {tittleButton}
          </Button>

          {!secondaryDisabledButton && (
            <Button
              variant="outline-primary"
              onClick={() => onClickSecondary()}
              className="mb-2 text-left ml-2"
            >
              {secondaryTittleButton}
            </Button>
          )}
        </div>
      </div>
      <div
        className={`triangle-right z-[101] border-white text-white ${
          direcction !== "rigth" && "hidden"
        }`}
      />
      <div
        className={`triangle-bottom z-[101] border-white text-white ${
          direcction !== "bootom" && "hidden"
        }`}
      />
    </div>
  );
}
