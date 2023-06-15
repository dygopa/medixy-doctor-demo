import { MedicalMeasureTypesEnum } from "(presentation)/(enum)/medicalMeasure/medicalMeasureEnums";
import {
  TreatmentDosisTypeEnum,
  TreatmentViaDosisEnum,
} from "(presentation)/(enum)/treatment/treatmentEnums";
import {
  getMedicalRecordsHistory,
  getMedicalRecordsPhysical,
} from "(presentation)/(helper)/medicalRecords/medicalRecordsHelper";
import {
  PatientsMedicalRecordRoutesEnum,
  PatientsRoutesEnum,
} from "(presentation)/(routes)/patientsRoutes";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { IDiagnosis } from "domain/core/entities/diagnosis";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import {
  IMedicalMeasure,
  IMedicalMeasureType,
} from "domain/core/entities/medicalMeasureEntity";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import {
  ITreatment,
  ITreatmentMedicine,
} from "domain/core/entities/treatmentEntity";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  IMedicalRecordCreateSummaryContext,
  MedicalRecordCreateSummaryContext,
} from "../context/MedicalRecordCreateSummaryContext";

export default function Navigator() {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordCreateSummaryContext>(
      MedicalRecordCreateSummaryContext
    );
  const { createMedicalConsulty } = actions;
  const { data: subject } = state.subject;
  const {
    data: medicalConsulty,
    loading,
    error,
    successful,
  } = state.createMedicalConsulty;

  const router = useRouter();

  const [showAlertError, setShowAlertError] = useState(false);

  const getValuesFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) {
      router.push(
        PatientsRoutesEnum.PatientsView +
          subject?.subjectId +
          PatientsMedicalRecordRoutesEnum.MedicalRecord +
          PatientsMedicalRecordRoutesEnum.MedicalRecordCreate
      );
      return;
    }

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    return valuesJSON;
  };

  const getMedicalMeasures = (values: any): IMedicalMeasure[] => {
    const medicalMeasures: IMedicalMeasure[] = [];

    if (values.vitalSigns.size?.length > 0) {
      const medicalMeasureSize: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.size),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.SIZE,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureSize);
    }

    if (values.vitalSigns.weight?.length > 0) {
      const medicalMeasureWeight: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.weight),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.WEIGHT,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureWeight);
    }

    if (values.vitalSigns.temperature?.length > 0) {
      const medicalMeasureTemperature: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.temperature),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.TEMPERATURE,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureTemperature);
    }

    if (values.vitalSigns.respiratoryFrequency?.length > 0) {
      const medicalMeasureRespiratoryFrequency: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.respiratoryFrequency),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.RESPIRATORY_FREQUENCY,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureRespiratoryFrequency);
    }

    if (values.vitalSigns.oximetry?.length > 0) {
      const medicalMeasureOximetry: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.oximetry),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.OXIMETRY,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureOximetry);
    }

    if (values.vitalSigns.muscleMass?.length > 0) {
      const medicalMeasureMuscleMass: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.muscleMass),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.MUSCLE_MASS_INDEX,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureMuscleMass);
    }

    if (values.vitalSigns.glicemy?.length > 0) {
      const medicalMeasureGlicemy: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.glicemy),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.GLICEMY,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureGlicemy);
    }

    return medicalMeasures;
  };

  const getDiagnosis = (values: any) => {
    if (values?.diagnose?.length === 0) return;

    let diagnoses: IDiagnosis[] = [];

    values.diagnose.forEach((cie10: ICIE10) => {
      let diagnosis: IDiagnosis = {
        id: 0,
        description: cie10.description4,
        cie10Id: cie10.id,
        medicalConsultyId: 0,
      };
      diagnoses.push(diagnosis);
    });
    return diagnoses;
  };

  const getTreatment = (values: any) => {
    if (values?.recipes?.length === 0) return;

    let treatment: ITreatment = {
      id: 0,
      status: 1,
      subjectId: subject?.subjectId ?? 0,
      medicalConsultyId: 0,
      treatmentMedicines: [],
    };

    const treatmentMedicines: ITreatmentMedicine[] = [];

    values.recipes.forEach((recipe: any) => {
      const treatmentMedicine: ITreatmentMedicine = {
        id: 0,
        viaDosis:
          recipe?.via?.length > 0
            ? parseInt(recipe.via, 10)
            : TreatmentViaDosisEnum.ORAL,
        medicine: recipe.medicine,
        dosisQuantity: recipe.quantity,
        dosisType:
          recipe?.unit?.length > 0
            ? parseInt(recipe.unit, 10)
            : TreatmentDosisTypeEnum.CAPSULE,
        takeUntilMeasure: recipe.duringMeasure,
        takeUntilValue:
          recipe?.duringValue > 0 ? parseInt(recipe.duringValue) : 0,
        takeEachMeasure: recipe.frequencyMeasure,
        takeEachValue:
          recipe?.frequencyValue > 0 ? parseInt(recipe.frequencyValue) : 0,
        createdOn: new Date(),
        treatmentId: 0,
        status: 1,
        observations: recipe?.indication ?? "",
      };

      treatmentMedicines.push(treatmentMedicine);
    });

    treatment.treatmentMedicines = treatmentMedicines;

    return treatment;
  };

  const getMedicalRecords = (values: any) => {
    const medicalRecords: IMedicalRecord[] = [];

    const medicalRecordsHistory = getMedicalRecordsHistory(
      values.records,
      subject?.subjectId ?? 0
    );

    if (medicalRecordsHistory.length > 0) {
      medicalRecords.push(...medicalRecordsHistory);
    }

    const medicalRecordsPhysical = getMedicalRecordsPhysical(
      values.physical,
      subject?.subjectId ?? 0
    );

    if (medicalRecordsPhysical.length > 0) {
      medicalRecords.push(...medicalRecordsPhysical);
    }

    return medicalRecords;
  };

  const onCreateMedicalConsulty = () => {
    const values = getValuesFromLocalStorage();

    const medicalMeasures = getMedicalMeasures(values);

    const treatment = getTreatment(values);

    const diagnoses = getDiagnosis(values.currentConsultation);

    const medicalRecords = getMedicalRecords(values);

    const medicalConsulty: IMedicalConsulty = {
      id: 0,
      consultationDate: values.currentConsultation.consultationDate
        ? new Date(
            new Date(values.currentConsultation.consultationDate).getFullYear(),
            new Date(values.currentConsultation.consultationDate).getMonth(),
            new Date(values.currentConsultation.consultationDate).getDate() + 1
          )
        : new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() + 1
          ),
      consultationReason: values.currentConsultation.consultationReason,
      referrerBy:
        values.currentConsultation.referredBy.length > 0
          ? values.currentConsultation.referredBy
          : null,
      sufferingDate: values.currentConsultation.sufferingDate
        ? new Date(
            new Date(values.currentConsultation.sufferingDate).getFullYear(),
            new Date(values.currentConsultation.sufferingDate).getMonth(),
            new Date(values.currentConsultation.sufferingDate).getDate() + 1,
            0,
            0,
            0,
            0
          )
        : null,
      diagnose: diagnoses ?? [],
      observations:
        values.currentConsultation.observations.length > 0
          ? values.currentConsultation.observations
          : null,
      medicalMeasures: medicalMeasures,
      medicalRecords: medicalRecords,
      treatments: treatment ? [treatment] : [],
      createdOn: new Date(),
      updatedOn: null,
      deletedOn: null,
      subjectId: subject?.subjectId ?? 0,
    };

    createMedicalConsulty(medicalConsulty)(dispatch);
  };

  const onShowAlertError = () => {
    setShowAlertError(true);

    setTimeout(() => {
      setShowAlertError(false);
    }, 3000);
  };

  const onCreateMedicalConsultySucessful = () => {
    localStorage.removeItem("prosit.storage.medical-record-create");

    setTimeout(() => {
      router.push(
        PatientsRoutesEnum.PatientsView +
          subject?.subjectId +
          PatientsMedicalRecordRoutesEnum.MedicalRecord +
          `?view_medical_record=true&medical_record_id=${medicalConsulty.data?.id}&from=medical-consulty-summary`
      );
    }, 3000);
  };

  useEffect(() => {
    if (successful) onCreateMedicalConsultySucessful();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useEffect(() => {
    if (error) onShowAlertError();
  }, [error]);

  return (
    <>
      <div className="w-full">
        <div className="lg:flex items-center justify-between">
          <div>
            <div className="mb-2">
              <h2 className="font-bold text-2xl truncate">Nueva consulta</h2>
            </div>

            <div>
              <p className="text-slate-500 text-md">
                Resumen detallado de la consulta a crear
              </p>
            </div>
          </div>

          <div className="lg:mt-0 mt-4 flex items-center">
            <div className="mr-3">
              <Button
                variant="primary"
                disabled={loading || successful}
                onClick={() => onCreateMedicalConsulty()}
              >
                Crear consulta
              </Button>
            </div>

            <div>
              {loading || successful ? (
                <Button variant="outline-primary" disabled>
                  Volver
                </Button>
              ) : (
                <Link
                  href={
                    PatientsRoutesEnum.PatientsView +
                    subject?.subjectId +
                    PatientsMedicalRecordRoutesEnum.MedicalRecord +
                    PatientsMedicalRecordRoutesEnum.MedicalRecordCreate
                  }
                >
                  <Button variant="outline-primary">Volver</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <AlertComponent
        variant="success"
        show={successful}
        description="¡Se ha guardado la consulta éxitosamente!"
      />

      <AlertComponent
        variant="error"
        show={showAlertError}
        description="Algo ha salido mal al intentar guardar la consulta. Vuelve a intentarlo."
      />
    </>
  );
}
