import { MedicalMeasureTypesEnum } from "(presentation)/(enum)/medicalMeasure/medicalMeasureEnums";
import Button from "(presentation)/components/core/BaseComponents/Button";
import clsx from "clsx";
import { IMedicalMeasure } from "domain/core/entities/medicalMeasureEntity";
import { useContext, useEffect, useState } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../../context/MedicalRecordContext";

export default function VitalSignsList() {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getMedicalMeasures } = actions;
  const { data: patient } = state.patient;
  const { data, loading, error, successful } = state.medicalMeasures;

  const [medicalMeasures, setMedicalMeasures] = useState<IMedicalMeasure[]>([]);

  const setMedicalMeasuresMap = () => {
    const medicalMeasuresList: IMedicalMeasure[] = [];

    if (data.data && data.data.length > 0) {
      data.data.forEach((medicalMeasure: IMedicalMeasure) => {
        const index = medicalMeasuresList.findIndex(
          (medicalMeasureFind) =>
            medicalMeasureFind.medicalMeasureTypeId ===
            medicalMeasure.medicalMeasureTypeId
        );

        if (index < 0) medicalMeasuresList.push(medicalMeasure);
      });
    }

    setMedicalMeasures(medicalMeasuresList);
  };

  const onGetMedicalMeasures = () => {
    if (patient?.patientId) {
      getMedicalMeasures({
        patientId: patient.patientId,
        sort: { field: "fechaCreacion", ascending: false },
      })(dispatch);
    }
  };

  const getTitleByMeasureType = (medicalMeasureType: string): string => {
    switch (medicalMeasureType) {
      case MedicalMeasureTypesEnum.SIZE:
        return "Talla";
      case MedicalMeasureTypesEnum.TEMPERATURE:
        return "Temperatura";
      case MedicalMeasureTypesEnum.WEIGHT:
        return "Peso";
      case MedicalMeasureTypesEnum.GLICEMY:
        return "Glicemia";
      case MedicalMeasureTypesEnum.MUSCLE_MASS_INDEX:
        return "Indice masa muscular";
      case MedicalMeasureTypesEnum.OXIMETRY:
        return "Oximetria";
      case MedicalMeasureTypesEnum.RESPIRATORY_FREQUENCY:
        return "Frecuencia respiratoria";

      default:
        return "";
    }
  };

  const getLetterByMeasureType = (medicalMeasureType: string): string => {
    switch (medicalMeasureType) {
      case MedicalMeasureTypesEnum.SIZE:
        return "mt(s)";
      case MedicalMeasureTypesEnum.TEMPERATURE:
        return "°C";
      case MedicalMeasureTypesEnum.WEIGHT:
        return "kg";

      default:
        return "";
    }
  };

  useEffect(() => {
    onGetMedicalMeasures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successful) setMedicalMeasuresMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          Cargando signos vítales...
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
        <Button variant="primary" onClick={() => onGetMedicalMeasures()}>
          Volver a intentar
        </Button>
      </div>
    );
  }

  if (successful && medicalMeasures && medicalMeasures?.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          El paciente no posee un historial de signos vítales.
        </p>
      </div>
    );
  }

  if (!medicalMeasures) return <div />;

  return (
    <div className="flex flex-col items-start w-full h-full">
      {medicalMeasures.map((medicalMeasure: IMedicalMeasure) => (
        <div
          key={medicalMeasure.id}
          className="flex justify-between items-center w-full mb-1"
        >
          <p className="font-light text-lg text-slate-500">
            {getTitleByMeasureType(medicalMeasure.medicalMeasureType.type)}
          </p>
          <p className="font-semibold text-lg text-secondary">
            {medicalMeasure.value}
            {getLetterByMeasureType(medicalMeasure.medicalMeasureType.type)}
          </p>
        </div>
      ))}
    </div>
  );
}
