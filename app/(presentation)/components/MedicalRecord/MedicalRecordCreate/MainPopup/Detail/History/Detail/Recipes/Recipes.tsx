import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import {
  ITreatment,
  ITreatmentMedicine,
} from "domain/core/entities/treatmentEntity";

interface IRecipesProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Recipes({ medicalConsulty }: IRecipesProps) {
  if (medicalConsulty.treatments && medicalConsulty.treatments.length === 0)
    return <div />;

  return (
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
    </div>
  );
}
