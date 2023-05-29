import clsx from "clsx";
import TreatmentsTable from "./Table/Table";

export default function Treatments() {
  return (
    <div
      className={clsx([
        "relative lg:h-[37vh] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-5 box h-auto">
        <div>
          <div className="w-full flex justify-between items-center border-b pb-2">
            <p className="font-bold text-lg text-slate-900">Tratamientos</p>

            <p className="font-normal text-[15px] text-slate-500 cursor-pointer">
              Ver más
            </p>
          </div>
        </div>

        <div className="col-span-12 overflow-x-auto intro-y lg:overflow-visible z-0">
          <TreatmentsTable />
        </div>
      </div>
    </div>
  );
}
