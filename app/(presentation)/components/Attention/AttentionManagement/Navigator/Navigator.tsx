import { MedicalRecordStatusEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import React, { useContext, useEffect, useState } from "react";
import {
  AttentionContext,
  IAttentionContext,
} from "../context/AttentionContext";

function Navigator() {
  const { state, actions, dispatch } =
    useContext<IAttentionContext>(AttentionContext);
  const { finishedAppointment, canceledAppointment } = actions;
  const { data: appointment } = state.appointment;
  const {
    loading: finishedAppointmentLoading,
    successful: finishedAppointmentSucessful,
    error: finishedAppointmentError,
  } = state.finishedAppointment;
  const {
    loading: canceledAppointmentLoading,
    successful: canceledAppointmentSucessful,
    error: canceledAppointmentError,
  } = state.canceledAppointment;

  const [showToastSucessful, setShowToastSucessful] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const onShowToastSucessful = (message: string) => {
    setToastMessage(message);
    setShowToastSucessful(true);

    setTimeout(() => {
      setShowToastSucessful(false);
      setToastMessage("");

      window.location.reload();
    }, 4000);
  };

  const onShowToastError = (message: string) => {
    setToastMessage(message);
    setShowToastError(true);

    setTimeout(() => {
      setShowToastError(false);
      setToastMessage("");
    }, 4000);
  };

  useEffect(() => {
    if (finishedAppointmentSucessful)
      onShowToastSucessful(
        "¡Se ha actualizado la cita del servicio como finalizado!"
      );

    if (canceledAppointmentSucessful)
      onShowToastSucessful(
        "¡Se ha actualizado la cita del servicio como cancelada!"
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedAppointmentSucessful, canceledAppointmentSucessful]);

  useEffect(() => {
    if (finishedAppointmentError)
      onShowToastError(
        "Algo ha salido mal al intentar finalizar el servicio. Vuelve a intentarlo."
      );

    if (canceledAppointmentError)
      onShowToastError(
        "Algo ha salido mal al intentar cancelar el servicio. Vuelve a intentarlo."
      );
  }, [canceledAppointmentError, finishedAppointmentError]);

  return (
    <>
      <div className="w-full md:flex justify-between items-start sticky top-[67px] z-[50] bg-slate-100 py-2">
        <div className="w-full lg:w-2/4 relative flex flex-col justify-between items-start">
          <h2 className="mr-5 text-2xl font-bold truncate">
            Servicio en atención
          </h2>
          <p>Información detallada del servicio para el paciente</p>
        </div>
        {appointment.data.status === MedicalRecordStatusEnum.PENDING && (
          <div className="md:w-[40%] flex justify-end items-center lg:gap-8 gap-2">
            <Button
              disabled={
                finishedAppointmentLoading ||
                canceledAppointmentLoading ||
                finishedAppointmentSucessful ||
                canceledAppointmentSucessful
              }
              onClick={() => finishedAppointment(appointment.data.id)(dispatch)}
              variant="primary"
              className="lg:w-1/2 w-full px-7"
            >
              Finalizar Servicio
            </Button>
            <Button
              disabled={
                finishedAppointmentLoading ||
                canceledAppointmentLoading ||
                finishedAppointmentSucessful ||
                canceledAppointmentSucessful
              }
              onClick={() => canceledAppointment(appointment.data.id)(dispatch)}
              variant="outline-primary"
              className="lg:w-1/2 w-full px-7"
            >
              Cancelar Servicio
            </Button>
          </div>
        )}
      </div>

      <AlertComponent
        variant="success"
        show={showToastSucessful}
        description={toastMessage}
      />
      <AlertComponent
        variant="error"
        show={showToastError}
        description={toastMessage}
      />
    </>
  );
}

export default Navigator;
