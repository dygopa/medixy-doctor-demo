import { TreatmentDosisTypeEnum } from "(presentation)/(enum)/treatment/treatmentEnums";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import {
  ITreatment,
  ITreatmentMedicine,
} from "domain/core/entities/treatmentEntity";
import { IUser } from "domain/core/entities/userEntity";
import { useContext } from "react";
import {
  IMedicalRecordCreateSummaryContext,
  MedicalRecordCreateSummaryContext,
} from "../../context/MedicalRecordCreateSummaryContext";

interface IRecipesProps {
  user: IUser;
  medicalConsulty: IMedicalConsulty;
}

export default function Recipes({ user, medicalConsulty }: IRecipesProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordCreateSummaryContext>(
      MedicalRecordCreateSummaryContext
    );
  const { getTreatmentPDF } = actions;
  const { loading, error } = state.getTreatmentPDF;

  const getDosisTypeText = (treatmentMedicine: ITreatmentMedicine) => {
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

  const getFrequencyText = (treatmentMedicine: ITreatmentMedicine) => {
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

  const getDuringText = (treatmentMedicine: ITreatmentMedicine) => {
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

  if (medicalConsulty.treatments && medicalConsulty.treatments.length === 0)
    return <div />;

  return (
    <>
      <AlertComponent
        variant="error"
        show={error !== null}
        description="Algo ha salido mal. Vuelve a intentarlo"
      />

      <div>
        <div className="mb-2">
          <h3 className="text-slate-400 text-lg">Tratamientos</h3>
        </div>

        <div>
          {medicalConsulty.treatments?.map(
            (treatment: ITreatment) =>
              treatment.treatmentMedicines.length > 0 &&
              treatment.treatmentMedicines.map(
                (treatmentMedicine: ITreatmentMedicine) => (
                  <div key={treatmentMedicine.id} className="mb-1">
                    <div>
                      <h1 className="text-slate-900 font-bold text-lg">
                        {treatmentMedicine.medicine}
                      </h1>
                    </div>

                    <div className="mb-1">
                      <p className="text-slate-900 font-normal">{`${getDosisTypeText(
                        treatmentMedicine
                      )} cada ${getFrequencyText(
                        treatmentMedicine
                      )} por ${getDuringText(treatmentMedicine)}`}</p>
                    </div>

                    {treatmentMedicine.observations && (
                      <div>
                        <p className="text-slate-400 font-normal">
                          {treatmentMedicine.observations}
                        </p>
                      </div>
                    )}
                  </div>
                )
              )
          )}
        </div>

        <div className="mt-3">
          <Button
            variant="outline-primary"
            size="sm"
            disabled={loading}
            onClick={() =>
              getTreatmentPDF({
                doctor: user,
                treatment: medicalConsulty.treatments![0]
                  ? medicalConsulty.treatments![0]
                  : ({} as ITreatment),
              })(dispatch)
            }
          >
            <div className="flex items-center">
              <div className="mr-2">
                <Lucide icon="FilePlus" color="#216AD9" size={20} />
              </div>

              <div>Generar PDF del tratamiento</div>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
