import { TreatmentDosisTypeEnum } from "(presentation)/(enum)/treatment/treatmentEnums";
import { ITreatmentMedicine } from "domain/core/entities/treatmentEntity";

export const getDosisTypeText = (treatmentMedicine: ITreatmentMedicine) => {
    switch (treatmentMedicine.dosisType) {
      case TreatmentDosisTypeEnum.CAPSULE:
        return "Tomar una cápsula";
      case TreatmentDosisTypeEnum.COMPRIMITE:
        return "Tomar comprimido";
      case TreatmentDosisTypeEnum.EMULSION:
        return "Tomar emulsión";
      case TreatmentDosisTypeEnum.GRANULATE:
        return "Tomar granulado";
      case TreatmentDosisTypeEnum.INYECTABLE:
        return "Inyectar";
      case TreatmentDosisTypeEnum.JARABE:
        return "Tomar jarabe";
      case TreatmentDosisTypeEnum.POLVOS:
        return "En polvo";
      case TreatmentDosisTypeEnum.SUSPENTION:
        return "Suspensión";

      default:
        return "";
    }
  };

  export const getFrequencyText = (treatmentMedicine: ITreatmentMedicine) => {
    switch (treatmentMedicine.takeEachMeasure) {
      case "hours":
        return treatmentMedicine.takeEachValue === 1
          ? `${treatmentMedicine.takeEachValue} hora`
          : `${treatmentMedicine.takeEachValue} horas`;
      case "days":
        return treatmentMedicine.takeEachValue === 1
          ? `${treatmentMedicine.takeEachValue} día`
          : `${treatmentMedicine.takeEachValue} dias`;
      case "weeks":
        return treatmentMedicine.takeEachValue === 1
          ? `${treatmentMedicine.takeEachValue} semana`
          : `${treatmentMedicine.takeEachValue} semanas`;
      case "months":
        return treatmentMedicine.takeEachValue === 1
          ? `${treatmentMedicine.takeEachValue} mes`
          : `${treatmentMedicine.takeEachValue} meses`;

      default:
        return "";
    }
  };

  export const getDuringText = (treatmentMedicine: ITreatmentMedicine) => {
    switch (treatmentMedicine.takeUntilMeasure) {
      case "hours":
        return treatmentMedicine.takeUntilValue === 1
          ? `${treatmentMedicine.takeUntilValue} hora`
          : `${treatmentMedicine.takeUntilValue} horas`;
      case "days":
        return treatmentMedicine.takeUntilValue === 1
          ? `${treatmentMedicine.takeUntilValue} día`
          : `${treatmentMedicine.takeUntilValue} dias`;
      case "weeks":
        return treatmentMedicine.takeUntilValue === 1
          ? `${treatmentMedicine.takeUntilValue} semana`
          : `${treatmentMedicine.takeUntilValue} semanas`;
      case "months":
        return treatmentMedicine.takeUntilValue === 1
          ? `${treatmentMedicine.takeUntilValue} mes`
          : `${treatmentMedicine.takeUntilValue} meses`;

      default:
        return "";
    }
  };