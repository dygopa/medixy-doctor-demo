import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormSelect } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext } from "react";
import { IScheduleContext, ScheduleContext } from "../../context/ScheduleContext";

export default function Navigator() {
     
  const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
  const { changeTypePopup, changeStatusPopup } = actions;
  const { data } = state.typePopupActive;

  return (
    <div className="w-full flex justify-between items-end gap-5">
      <div className="w-2/4 relative flex flex-col justify-between items-start gap-2">
        <h2 className="mr-5 text-2xl font-bold truncate">Configuración de la agenda</h2>
        <p>Mantén un seguimiento de tus citas médicos y asegúrate de estar preparado para cada consulta</p>
      </div>
      <div className="w-2/4 relative flex justify-end items-center gap-3">
        <Button onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(1)(dispatch) }} variant="primary" type="button" className="">
          <Lucide icon="Plus" className="w-5 h-5 mr-2" />Nueva venta de atención
        </Button>
      </div>
    </div>
  );
}
