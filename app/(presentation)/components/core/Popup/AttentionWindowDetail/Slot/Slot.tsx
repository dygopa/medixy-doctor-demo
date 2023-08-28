import { IScheduleContext, ScheduleContext } from "(presentation)/components/Schedule/context/ScheduleContext";
import moment from "moment";
import { useContext, useState } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const SlotComponent = ({ data }: { data: any }) => {

    const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
    const {
        blockSlotInAttentionWindow,
        unlockSlotInAttentionWindow
    } = actions;

    const [blocked, setBlocked] = useState(data["estado"] === 9)

    let isFree = !data["Sujetos"]
    let status = data["estado"]

    function handleClickInSlot(){
      if(blocked){
        unlockSlotInAttentionWindow(data["id"])(dispatch)
        setBlocked(false)
        return;
      }
      blockSlotInAttentionWindow(data["id"])(dispatch)
      setBlocked(true)
    }

    return (
      <div className="w-full border border-slate-200 bg-white relative flex flex-col p-3 rounded">
        <div className="w-full flex justify-between items-center">
          <p className="text-slate-900 text-base font-semibold">{isFree ? "Disponible" : `${data["Sujetos"]["nombre"]}`}</p>
          <div
            onClick={() => { handleClickInSlot() }}
            className={twMerge([
              "transition w-fit h-fit flex justify-center items-center gap-2 text-sm px-5 py-1 cursor-pointer",
              "rounded border text-slate-900 bg-white",
              "hover:bg-slate-200"
            ])}>
            <p>{blocked ? "Desbloquear" : "Bloquear"}</p>
            {blocked ? <FiUnlock/> : <FiLock />}
          </div>
        </div>
        <div className="w-full flex justify-between items-start">
          <p>{moment(data["fechaReserva"]).utc().format("hh:mm a")} - {moment(data["fechaFinReserva"]).utc().format("hh:mm a")}</p>
        </div>
      </div>
    )
}

export default SlotComponent