import { twMerge } from "tailwind-merge";
import { DataSelection } from "./DataSelection";

const ReservationCard = () => {
  return (
    <div
      className={twMerge([
        "bg-white rounded-lg p-6 shadow-sm border items-start flex-col",
        "lg:col-span-3 lg:sticky lg:top-[12%] lg:h-fit lg:justify-start lg:overflow-y-auto",
        "col-span-6 fixed top-[7%] left-0 h-[93%] justify-between overflow-y-scroll",
      ])}
    >
      <div className="w-full h-fit pb-3 mb-3 border-b border-slate-300">
        <p className="text-lg text-slate-900 font-semibold">Agendar cita</p>
      </div>
      <DataSelection />
    </div>
  );
};

export default ReservationCard;
