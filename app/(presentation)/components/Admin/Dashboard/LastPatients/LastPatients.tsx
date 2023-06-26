import clsx from "clsx";
import PatientsTable from "./Table/Table";

export default function LastPatients() {
  return (
    <div
      className={clsx([
        "relative zoom-in h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="px-4 py-2 box h-full overflow-y-hidden">
        <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
          <div>
            <p className="w-full text-left font-bold text-md text-slate-900">
              Ultimos pacientes
            </p>
          </div>
        </div>

        <div className="mt-4">
          <PatientsTable />
        </div>
      </div>
    </div>
  );
}
