import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import {
  ITreatment,
  ITreatmentMedicine,
} from "domain/core/entities/treatmentEntity";
import { useContext } from "react";
import {
  IMedicalRecordCreateSummaryContext,
  MedicalRecordCreateSummaryContext,
} from "../../context/MedicalRecordCreateSummaryContext";

interface IRecipesProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Recipes({ medicalConsulty }: IRecipesProps) {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: user } = authState.getUserAuthenticated;

  const { state, actions, dispatch } =
    useContext<IMedicalRecordCreateSummaryContext>(
      MedicalRecordCreateSummaryContext
    );
  const { getTreatmentPDF } = actions;
  const { loading, error } = state.getTreatmentPDF;

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
                    <h1 className="text-slate-900 font-bold text-lg">
                      {treatmentMedicine.medicine}
                    </h1>
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
