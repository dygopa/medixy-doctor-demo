import clsx from "clsx";
import VitalSignsList from "./VitalSignsList/VitalSignsList";

export default function VitalSigns() {
  return (
    <div
      className={clsx([
        "relative zoom-in lg:h-[40vh] md:h-[25vh] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
        <p className="w-full text-left font-normal text-md text-slate-500 pb-2 border-b mb-2">
          Signos vítales
        </p>

        <VitalSignsList />
      </div>
    </div>
  );
}
