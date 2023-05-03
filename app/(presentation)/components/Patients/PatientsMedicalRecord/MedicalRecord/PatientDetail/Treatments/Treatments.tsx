import clsx from "clsx";
import TreatmentsTable from "./Table/Table";

export default function Treatments() {
  return (
    <div
      className={clsx([
        "relative",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
      style={{ height: "27vh" }}
    >
      <div className="p-5 box" style={{ height: "27vh" }}>
        <div>
          <p className="w-full text-left font-semibold text-lg text-slate-900 pb-2">
            Tratamientos
          </p>
        </div>

        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible z-0">
          <TreatmentsTable />
        </div>
      </div>
    </div>
  );
}
