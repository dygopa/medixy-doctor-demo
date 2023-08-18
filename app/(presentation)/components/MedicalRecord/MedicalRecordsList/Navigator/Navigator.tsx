import { IScheduleContext, ScheduleContext } from "(presentation)/components/Schedule/context/ScheduleContext";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext } from "react";

export default function Navigator() {

  const { state, actions, dispatch } =
  useContext<IScheduleContext>(ScheduleContext);
  const {
    changeTypePopup,
    changeStatusPopup,
    predifinedReservationData
  } = actions

  return (
    <div className="w-full md:flex justify-between items-center">
      <h2 className="mr-5 text-2xl font-bold">Mis Consultas</h2>
      <Button
        onClick={() => {
          predifinedReservationData({})(dispatch);
          changeStatusPopup(true)(dispatch);
          changeTypePopup(0)(dispatch);
        }}
        variant="primary"
        type="button"
        className="w-full mt-2 md:mt-0 md:w-fit"
      >
        <Lucide icon="Plus" className="w-5 h-5 mr-2" />
        Nueva consulta
      </Button>
    </div>
  );
}
