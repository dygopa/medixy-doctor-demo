import { MedicalMeasureTypesEnum } from "(presentation)/(enum)/medicalMeasure/medicalMeasureEnums";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { IMedicalMeasure } from "domain/core/entities/medicalMeasureEntity";
import { useEffect, useState } from "react";

interface IVitalSignsProps {
  medicalConsulty: IMedicalConsulty;
}

export default function VitalSigns({ medicalConsulty }: IVitalSignsProps) {
  const [medicalMeasures, setMedicalMeasures] = useState<IMedicalMeasure[]>([]);

  const setMedicalMeasuresMap = () => {
    if (
      medicalConsulty.medicalMeasures &&
      medicalConsulty.medicalMeasures.length === 0
    )
      return <div />;

    const medicalMeasuresList: IMedicalMeasure[] = [];

    medicalConsulty.medicalMeasures?.forEach(
      (medicalMeasure: IMedicalMeasure) => {
        const index = medicalMeasuresList.findIndex(
          (medicalMeasureFind) =>
            medicalMeasureFind.medicalMeasureTypeId ===
            medicalMeasure.medicalMeasureTypeId
        );

        if (index < 0) medicalMeasuresList.push(medicalMeasure);
      }
    );

    setMedicalMeasures(medicalMeasuresList);
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
        return "Masa muscular";
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
    setMedicalMeasuresMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicalConsulty.medicalMeasures]);

  if (medicalMeasures.length === 0) return <div />;

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Signos vitales</h3>
      </div>

      {medicalMeasures.map((medicalMeasure: IMedicalMeasure) => (
        <div key={medicalMeasure.id} className="mb-3">
          <h1 className="text-slate-900 font-bold text-lg flex">
            {getTitleByMeasureType(medicalMeasure.medicalMeasureType.type)}:
          </h1>

          <div>
            <p className="text-grey font-normal text-lg">
              {" "}
              {medicalMeasure.value.toFixed(2)}
              {getLetterByMeasureType(medicalMeasure.medicalMeasureType.type)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
