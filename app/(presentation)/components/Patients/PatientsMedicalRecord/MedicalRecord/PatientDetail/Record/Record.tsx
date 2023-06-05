import clsx from "clsx";
import RecordList from "./RecordList/RecordList";

export default function Record() {
  return (
    <div
      className={clsx([
        "relative lg:h-[350px] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-5 box h-full overflow-y-hidden">
        <div>
          <div className="w-full flex justify-between items-center border-b pb-2">
            <p className="text-left font-normal text-md text-slate-500 w-full">Antecedentes</p>

            {/* <p className="font-normal text-[15px] text-slate-500 cursor-pointer">
              Ver más
    </p> */}
          </div>
        </div>

        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible z-0">
          <RecordList />
        </div>
      </div>
    </div>
  );
}
