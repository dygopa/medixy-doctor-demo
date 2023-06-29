import { MedicalRecordStatusEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../context/MedicalRecordContext";

export default function Navigator() {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { editAppointmentStatus } = actions;
  const { data: subject } = state.subject;
  const { data: appointment } = state.appointment;
  const { loading, error, successful } = state.editAppointmentStatus;

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
              <h2 className="font-bold text-2xl truncate">
                Resumen del expediente
              </h2>
            </div>

            <div>
              <p className="text-slate-500 text-md">
                Información detallada del expediente del paciente
              </p>
            </div>
          </div>

          {appointment.data?.id &&
            appointment.data?.status !== MedicalRecordStatusEnum.COMPLETE && (
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
            )}
        </div>
      </div>
    </>
  );
}
