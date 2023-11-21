import clsx from "clsx";

interface IStepProps {
  index: number;
  text: string;
  isActive?: boolean;
  isCompleted?: boolean;
  finalStep?: boolean;
}

export default function Step({
  index,
  text,
  isActive = false,
  isCompleted = false,
  finalStep = false,
}: IStepProps) {
  return (
    <div className="w-full">
      <div className="flex w-full text-center justify-center">
        <div>
          <div
            className={clsx([
              "w-[25px] h-[25px] rounded-full",
              isCompleted
                ? "bg-success"
                : isActive
                ? "bg-primary"
                : "bg-gray-400",
            ])}
          >
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white font-bold">
                {isCompleted ? (
                  <i className="fa-solid fa-check text-white" />
                ) : (
                  index
                )}
              </p>
            </div>
          </div>
        </div>

        {!finalStep && (
          <div className="ml-2 mr-2 mt-[7px]">
            <div
              className={clsx([
                "lg:w-[100px] md:w-[100px] w-[25px] h-[5px]",
                isCompleted
                  ? "bg-success"
                  : isActive
                  ? "bg-primary"
                  : "bg-slate-400",
              ])}
            />
          </div>
        )}
      </div>

      <div className="lg:block md:block hidden mt-2">
        <p>{text}</p>
      </div>
    </div>
  );
}
