import { MedicalRecordStatusEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Popup from "(presentation)/components/core/Popup/Popup";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import { IUser } from "domain/core/entities/userEntity";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../context/MedicalRecordContext";

interface INavigatorProps {
  user: IUser;
}

export default function Navigator({ user }: INavigatorProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { editAppointmentStatus } = actions;
  const { data: subject } = state.subject;
  const { data: appointment } = state.appointment;
  const { loading, error, successful } = state.editAppointmentStatus;

  const { actions: actionsSchedule, dispatch: dispatchSchedule } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    changeStatusPopup,
    changeTypePopup,
    predifinedReservationData,
    activePatient,
  } = actionsSchedule;

  const router = useRouter();

  const getRedirectMedicalRecordCreate = () => {
    if (appointment.data?.id) {
      router.push(
        MedicalRecordRoutesEnum.MedicalRecord +
          appointment.data.id +
          MedicalRecordRoutesEnum.MedicalRecordCreate +
          "?type=appointment"
      );
      return;
    }

    router.push(
      MedicalRecordRoutesEnum.MedicalRecord +
        subject?.subjectId +
        MedicalRecordRoutesEnum.MedicalRecordCreate
    );
  };

  useEffect(() => {
    if (successful) getRedirectMedicalRecordCreate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  return (
    <>
      <AlertComponent
        variant="error"
        show={error !== null}
        description="Algo ha salido mal. Vuelve a intentarlo."
      />

      <div className="w-full">
        <div className="lg:flex items-center justify-between">
          <div>
            <div className="mb-2">
              <h2 className="font-bold lg:text-2xl md:text-2xl text-lg truncate">
                Resumen del Expediente
              </h2>
            </div>

            <div>
              <p className="text-slate-500 lg:text-md md:text-md text-xs">
                Información detallada del expediente del paciente
              </p>
            </div>
          </div>

          {appointment.data?.id &&
          appointment.data?.status !== MedicalRecordStatusEnum.COMPLETE ? (
            <div className="lg:mt-0 mt-4">
              <Button
                variant="primary"
                disabled={loading || successful}
                onClick={() =>
                  editAppointmentStatus({
                    appointmentId: appointment.data.id,
                    status: MedicalRecordStatusEnum.PROCESSING,
                  })(dispatch)
                }
              >
                Atender paciente
              </Button>
            </div>
          ) : (
            <div className="lg:mt-0 mt-4">
              <Button
                variant="primary"
                onClick={() => {
                  activePatient(subject)(dispatchSchedule);
                  predifinedReservationData({})(dispatchSchedule);
                  changeStatusPopup(true)(dispatchSchedule);
                  changeTypePopup(0)(dispatchSchedule);
                }}
              >
                Agendar cita
              </Button>
            </div>
          )}
        </div>
      </div>

      <Popup user={user} />
    </>
  );
}
