import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import { IUser } from "domain/core/entities/userEntity";
import moment from "moment";
import { useContext } from "react";

interface ISucessfulMessageProps {
  user: IUser;
  setShowRescheduleModal: Function;
}

export default function SucessfulMessage({
  user,
  setShowRescheduleModal,
}: ISucessfulMessageProps) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const { getCalendarEvents, getAppointments, changeStatusPopup } = actions;
  const { data: locality } = state.activeLocality;
  const { data: activeDay } = state.activeDay;
  const { data: actualDay } = state.actualDay;

  const getCalendarEventsDispatch = () => {
    getCalendarEvents(
      user.userId,
      locality.id,
      moment(activeDay["start"]).format("YYYY-MM-DD"),
      moment(activeDay["end"], "YYYY-MM-DD").format("YYYY-MM-DD")
    )(dispatch);
    getAppointments(
      user.userId,
      moment(actualDay).format("YYYY-MM-DD"),
      moment(actualDay).add(1, "day").format("YYYY-MM-DD"),
      locality.id,
      true
    )(dispatch);
  };

  return (
    <div className="w-full px-4">
      <div className="mb-8">
        <p className="font-bold text-2xl text-slate-900">Cita reagendada</p>
      </div>

      <div className="mb-5 text-center">
        <div className="flex justify-center text-center mb-6">
          <Lucide icon="CheckCircle" color="#216AD9" size={70} />
        </div>

        <p className="font-normal">
          La cita se ha reagendado exitosamente en tu agenda, el paciente en
          este momento recibió un email notificando el cambio de fecha y hora de
          la cita.
        </p>
      </div>

      <div className="lg:flex items-center text-center justify-center mt-8">
        <div className="lg:mr-6 lg:mb-0 mb-4">
          <Button
            variant="primary"
            className="w-[275px]"
            onClick={() => {
              getCalendarEventsDispatch();
              setShowRescheduleModal(false);
              changeStatusPopup(false)(dispatch);
            }}
          >
            De acuerdo, gracias
          </Button>
        </div>
      </div>
    </div>
  );
}
