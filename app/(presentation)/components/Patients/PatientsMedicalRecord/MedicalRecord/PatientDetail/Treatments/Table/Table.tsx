import Button from "(presentation)/components/core/BaseComponents/Button";
import { ITreatment } from "domain/core/entities/treatmentEntity";
import { useContext, useEffect } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../../context/MedicalRecordContext";
import Treatment from "./Treatment";

export default function TreatmentsTable() {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getTreatments } = actions;
  const { data: patient } = state.patient;
  const { data: treatments, loading, error, successful } = state.treatments;

  const onGetTreatmentsDispatch = () => {
    if (patient?.patientId) {
      getTreatments({
        patientId: patient.patientId,
        limit: 3,
      })(dispatch);
    }
  };

  useEffect(() => {
    onGetTreatmentsDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          Cargando los tratamientos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo no ha salido como se esperaba
        </p>
        <p className="font-light text-slate-500 text-base mb-4">
          Lo sentimos, algo no ha salido bien. Vuelve a intentarlo
        </p>
        <Button variant="primary" onClick={() => onGetTreatmentsDispatch()}>
          Volver a intentar
        </Button>
      </div>
    );
  }

  if (successful && treatments?.data && treatments.data?.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          El paciente no posee tratamientos.
        </p>
      </div>
    );
  }

  if (!treatments.data) return <div />;

  return (
    <div className="">
      {treatments.data.map((treatment: ITreatment) => (
        <div key={treatment.id} className="overflow-x-auto w-full">
          <Treatment treatment={treatment} />
        </div>
      ))}
    </div>
  );
}
