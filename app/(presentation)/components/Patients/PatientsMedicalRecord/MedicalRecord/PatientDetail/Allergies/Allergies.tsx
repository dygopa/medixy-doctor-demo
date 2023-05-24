import clsx from "clsx";

export default function Allergies() {
  return (
    <div
      className={clsx([
        "relative zoom-in lg:h-[27vh] md:h-[30vh] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
        <div className="flex flex-col items-start w-full h-full">
          <p className="w-full text-left font-normal text-md text-slate-500 pb-2 border-b mb-2">
            Alergias
          </p>
          <div className="flex justify-between items-center w-full mb-1">
            <p className="font-medium text-lg text-secondary">Maní</p>
          </div>
          <div className="flex justify-between items-center w-full mb-1">
            <p className="font-medium text-lg text-secondary">Penícilina</p>
          </div>
        </div>
      </div>
    </div>
  );
}
