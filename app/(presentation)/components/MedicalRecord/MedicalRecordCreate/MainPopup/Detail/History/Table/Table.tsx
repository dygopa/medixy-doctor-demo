import Button from "(presentation)/components/core/BaseComponents/Button";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../../../../context/MedicalRecordCreateContext";
import MedicalConsulty from "./MedicalConsulty";

interface IHistoryTableProps {
  subjectId: number;
  setMedicalConsulty: Dispatch<SetStateAction<IMedicalConsulty | null>>;
}

export default function HistoryTable({
  subjectId,
  setMedicalConsulty,
}: IHistoryTableProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { getMedicalConsulties } = actions;
  const {
    data: medicalConsulties,
    loading,
    error,
    successful,
  } = state.medicalConsulties;

  const onGetMedicalConsultiesDispatch = () => {
    if (subjectId) {
      getMedicalConsulties({
        subjectId: subjectId,
        sort: { field: "fechaConsulta", ascending: false },
      })(dispatch);
    }
  };

  useEffect(() => {
    onGetMedicalConsultiesDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          Cargando historial de consultas...
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
        <Button
          variant="primary"
          onClick={() => onGetMedicalConsultiesDispatch()}
        >
          Volver a intentar
        </Button>
      </div>
    );
  }

  if (
    successful &&
    medicalConsulties?.data &&
    medicalConsulties.data?.length === 0
  ) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          El paciente no posee un historial de consultas.
        </p>
      </div>
    );
  }

  if (!medicalConsulties.data) return <div />;

  return (
    <div>
      <div className="mb-3">
        <p className="text-lg font-bold">Historial de consultas</p>
      </div>

      <div className="grid grid-cols-12 gap-2 mt-4">
        {medicalConsulties.data.map((medicalConsulty: IMedicalConsulty) => (
          <div key={medicalConsulty.id} className="col-span-12 w-full">
            <MedicalConsulty
              medicalConsulty={medicalConsulty}
              setMedicalConsulty={setMedicalConsulty}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
