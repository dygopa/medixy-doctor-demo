import clsx from "clsx";
import HistoryTable from "./Table/Table";

export default function History() {
  return (
    <div
      className={clsx([
        "relative lg:h-[40vh] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
        <div>
          <div className="w-full flex justify-between items-center border-b pb-2">
            <p className="font-bold text-lg text-slate-900">
              Historial de consultas
            </p>

            {/* <p className="font-normal text-[15px] text-slate-500 cursor-pointer">
              Ver más
    </p> */}
          </div>
        </div>

        <div className="h-[90%] flex-grow-0 overflow-y-auto px-3">
          <HistoryTable />
        </div>
      </div>
    </div>
  );
}
