import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "next/navigation";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

const SlotComponent = ({
  data,
  rescheduleClick,
}: {
  data: any;
  rescheduleClick: Function;
}) => {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    blockSlotInAttentionWindow,
    unlockSlotInAttentionWindow,
    deleteAppointment,
    getSlotsByAttentionWindow,
  } = actions;

  const [blocked, setBlocked] = useState(data["estado"] === 9);

  const searchParams = useSearchParams();

  let isFree = !data["sujetoId"];
  let status = data["estado"];

  function handleClickInSlot() {
    if (blocked) {
      unlockSlotInAttentionWindow(data["id"])(dispatch);
      setBlocked(false);
      return;
    }
    blockSlotInAttentionWindow(data["id"])(dispatch);
    setBlocked(true);
  }

  return (
    <div className="w-full border border-slate-200 bg-white relative flex flex-col p-3 rounded">
      <div className="w-full flex justify-between items-center">
        <div className="w-fit flex justify-start items-center gap-2">
          <span
            className={twMerge([
              "w-[10px] h-[10px] rounded-full block relative",
              isFree ? "bg-green-500" : "bg-red-500",
            ])}
          ></span>
          <p className="text-slate-900 text-base font-semibold">
            {isFree ? "Disponible" : `Ocupado`}
          </p>
        </div>

        {isFree ? (
          <div
            onClick={() => {
              handleClickInSlot();
            }}
            className={twMerge([
              "transition w-fit h-fit flex justify-center items-center gap-2 text-sm px-4 py-1 cursor-pointer",
              "rounded border text-slate-900 bg-white",
              "hover:bg-slate-200",
            ])}
          >
            <p>{blocked ? "Desbloquear" : "Bloquear"}</p>
            {blocked ? (
              <Lucide icon="lock-open-variant-outline" />
            ) : (
              <Lucide icon="lock-outline" />
            )}
          </div>
        ) : (
          <div className="w-fit flex gap-2 relative">
            <div
              onClick={() => {
                rescheduleClick();
              }}
              className={twMerge([
                "transition w-fit h-fit flex justify-center items-center gap-2 text-sm px-4 py-1 cursor-pointer",
                "rounded border text-slate-900 bg-white",
                "hover:bg-slate-200",
              ])}
            >
              <p>Reagendar</p>
              <Lucide icon="calendar-clock-outline" />
            </div>

            <div
              onClick={() => {
                deleteAppointment(data["id"])(dispatch);
              }}
              className={twMerge([
                "transition w-fit h-fit flex justify-center items-center gap-2 text-sm px-4 py-1 cursor-pointer",
                "rounded border text-slate-900 bg-white",
                "hover:bg-slate-200",
              ])}
            >
              <p>Cancelar</p>
              <Lucide icon="close-box-outline" />
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between items-start">
        <p>
          {moment(data["fechaReserva"]).utc().format("hh:mm a")} -{" "}
          {moment(data["fechaFinReserva"]).utc().format("hh:mm a")}
        </p>
      </div>
    </div>
  );
};

export default SlotComponent;
