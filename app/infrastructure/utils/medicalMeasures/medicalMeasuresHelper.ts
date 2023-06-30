import { MedicalMeasureTypesEnum } from "(presentation)/(enum)/medicalMeasure/medicalMeasureEnums";
import { IMedicalMeasure } from "domain/core/entities/medicalMeasureEntity";

export const getMedicalMeasuresMap = (medicalMeasures: IMedicalMeasure[]) => {
    if (
      medicalMeasures &&
      medicalMeasures.length === 0
    )
      return [];

    const medicalMeasuresList: IMedicalMeasure[] = [];

    medicalMeasures?.forEach(
      (medicalMeasure: IMedicalMeasure) => {
        const index = medicalMeasuresList.findIndex(
          (medicalMeasureFind) =>
            medicalMeasureFind.medicalMeasureTypeId ===
            medicalMeasure.medicalMeasureTypeId
        );

        if (index < 0) medicalMeasuresList.push(medicalMeasure);
      }
    );

    return medicalMeasuresList;
  };

  export const getTitleByMeasureType = (medicalMeasureType: string): string => {
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

  export const getLetterByMeasureType = (medicalMeasureType: string): string => {
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