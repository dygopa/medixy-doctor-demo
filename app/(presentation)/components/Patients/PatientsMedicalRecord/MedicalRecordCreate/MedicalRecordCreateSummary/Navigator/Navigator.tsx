import { MedicalMeasureTypesEnum } from "(presentation)/(enum)/medicalMeasure/medicalMeasureEnums";
import {
  MedicalRecordTypesEnum,
  MedicalRecordValueTypesEnum,
} from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import {
  TreatmentDosisTypeEnum,
  TreatmentViaDosisEnum,
} from "(presentation)/(enum)/treatment/treatmentEnums";
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
import {
  IMedicalRecord,
  IMedicalRecordType,
  IMedicalRecordValueType,
} from "domain/core/entities/medicalRecordEntity";
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
  const { data: patient } = state.patient;
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
      "noodus.storage.medical-record-create"
    );

    if (!valuesStorage) {
      router.push(
        PatientsRoutesEnum.PatientsView +
          patient?.patientId +
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

    if (values.currentConsultation.size?.length > 0) {
      const medicalMeasureSize: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.currentConsultation.size),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.SIZE,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        patientId: patient?.patientId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureSize);
    }

    if (values.currentConsultation.weight?.length > 0) {
      const medicalMeasureWeight: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.currentConsultation.weight),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.WEIGHT,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        patientId: patient?.patientId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureWeight);
    }

    if (values.currentConsultation.temperature?.length > 0) {
      const medicalMeasureTemperature: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.currentConsultation.temperature),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.TEMPERATURE,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        patientId: patient?.patientId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureTemperature);
    }

    if (values.currentConsultation.respiratoryFrequency?.length > 0) {
      const medicalMeasureRespiratoryFrequency: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.currentConsultation.respiratoryFrequency),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.RESPIRATORY_FREQUENCY,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        patientId: patient?.patientId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureRespiratoryFrequency);
    }

    if (values.currentConsultation.oximetry?.length > 0) {
      const medicalMeasureOximetry: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.currentConsultation.oximetry),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.OXIMETRY,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        patientId: patient?.patientId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureOximetry);
    }

    if (values.currentConsultation.muscleMass?.length > 0) {
      const medicalMeasureMuscleMass: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.currentConsultation.muscleMass),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.MUSCLE_MASS_INDEX,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        patientId: patient?.patientId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureMuscleMass);
    }

    if (values.currentConsultation.glicemy?.length > 0) {
      const medicalMeasureGlicemy: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.currentConsultation.glicemy),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.GLICEMY,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        patientId: patient?.patientId ?? 0,
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
      patientId: patient?.patientId ?? 0,
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

    if (
      values?.allergiesPathological?.isChecked &&
      values?.allergiesPathological?.values?.length > 0
    ) {
      values?.allergiesPathological?.values.forEach((allergy: any) => {
        medicalRecords.push({
          id: 0,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesEnum.ALLERGIES,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: allergy,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesEnum.ALLERGIES_NAME,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      });
    }

    if (values?.alcoholicBeveragesNonPathological?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.ALCOCHOLIC_BEVERAGES,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.alcoholicBeveragesNonPathological?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.ALCOCHOLIC_BEVERAGES_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (values?.anemia?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.ANEMIA,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.anemia?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.ANEMIA_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (values?.arthritis?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.ARTHRITIS,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.arthritis?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.ARTHRITIS_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (values?.asma?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.ASMA,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.asma?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.ASMA_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (values?.bloodClots?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.BLOODS_CLOTS,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.bloodClots?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.BLOODS_CLOTS_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (
      values?.bloodTypeNonPathological?.isChecked &&
      values?.bloodTypeNonPathological?.values?.length > 0
    ) {
      values?.bloodTypeNonPathological?.values.forEach((bloodType: any) => {
        medicalRecords.push({
          id: 0,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesEnum.BLOOD_TYPE,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: bloodType,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesEnum.BLOOD_TYPE_NAME,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      });
    }

    if (values?.cancer?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.CANCER,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.cancer?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.CANCER_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (
      values?.cancerFamily?.isChecked &&
      values?.cancerFamily?.values?.length > 0
    ) {
      values?.cancerFamily?.values.forEach((cancer: any) => {
        medicalRecords.push({
          id: 0,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesEnum.CANCER_FAMILY,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: cancer,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesEnum.CANCER_FAMILY,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      });
    }

    if (values?.colitis?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.COLITIS,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.colitis?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.COLITIS_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (values?.covidNonPathological?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.COVID,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.covidNonPathological?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.COVID_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (
      values?.diabetesFamily?.isChecked &&
      values?.diabetesFamily?.values?.length > 0
    ) {
      values?.diabetesFamily?.values.forEach((diabetes: any) => {
        medicalRecords.push({
          id: 0,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesEnum.DIABETES,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: diabetes,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesEnum.DIABETES_FAMILY,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      });
    }

    if (values?.drugsNonPathological?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.DRUGS,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.drugsNonPathological?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.DRUGS_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (values?.exerciseNonPathological?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.EXERCISE,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.exerciseNonPathological?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.EXERCISE_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (
      values?.hypertensionFamily?.isChecked &&
      values?.hypertensionFamily?.values?.length > 0
    ) {
      values?.hypertensionFamily?.values.forEach((hypertension: any) => {
        medicalRecords.push({
          id: 0,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesEnum.HIPERTENSION,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: hypertension,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesEnum.HIPERTENSION_FAMILY,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      });
    }

    if (
      values?.otherFamily?.isChecked &&
      values?.otherFamily?.values?.length > 0
    ) {
      values?.otherFamily?.values.forEach((other: any) => {
        medicalRecords.push({
          id: 0,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesEnum.OTHER,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: other,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesEnum.OTHER_FAMILY,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      });
    }

    if (
      values?.sidaFamily?.isChecked &&
      values?.sidaFamily?.values?.length > 0
    ) {
      values?.sidaFamily?.values.forEach((sida: any) => {
        medicalRecords.push({
          id: 0,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesEnum.SIDA,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: sida,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesEnum.SIDA_FAMILY,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      });
    }

    if (values?.smokingNonPathological?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.SMOKING,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.smokingNonPathological?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.SMOKING_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (
      values?.surgicalInterventions?.isChecked &&
      values?.surgicalInterventions?.values?.length > 0
    ) {
      values?.surgicalInterventions?.values.forEach(
        (surgicalIntervention: any) => {
          medicalRecords.push({
            id: 0,
            medicalRecordTypeId: 0,
            medicalRecordType: {
              id: 0,
              name: MedicalRecordTypesEnum.SURGICAL_INTERVENTIONS,
            } as IMedicalRecordType,
            medicalRecordValues: [
              {
                id: 0,
                value: surgicalIntervention,
                medicalRecordValueType: {
                  id: 0,
                  name: MedicalRecordValueTypesEnum.SURGICAL_INTERVENTIONS_NAME,
                } as IMedicalRecordValueType,
              },
            ],
            medicalConsultyId: 0,
            medicalConsulty: {},
          } as IMedicalRecord);
        }
      );
    }

    if (
      values?.takeMedication?.isChecked &&
      values?.takeMedication?.values?.length > 0
    ) {
      values?.takeMedication?.values.forEach((medication: any) => {
        medicalRecords.push({
          id: 0,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesEnum.TAKE_MEDICATIONS,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: medication,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesEnum.TAKE_MEDICATIONS_NAME,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      });
    }

    if (values?.transfusions?.isChecked) {
      medicalRecords.push({
        id: 0,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesEnum.TRANSFUSIONS,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.transfusions?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesEnum.TRANSFUSIONS_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    return medicalRecords;
  };

  const onCreateMedicalConsulty = () => {
    const values = getValuesFromLocalStorage();

    const medicalMeasures = getMedicalMeasures(values);

    const treatment = getTreatment(values);

    const diagnoses = getDiagnosis(values.currentConsultation);

    const medicalRecords = getMedicalRecords(values.records);

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
      generalInspection:
        values.currentConsultation.generalInspection.length > 0
          ? values.currentConsultation.generalInspection
          : null,
      respiratorySystem:
        values.currentConsultation.respiratorySystem.length > 0
          ? values.currentConsultation.respiratorySystem
          : null,
      digestiveSystem:
        values.currentConsultation.digestiveSystem.length > 0
          ? values.currentConsultation.digestiveSystem
          : null,
      cardiovascularSystem:
        values.currentConsultation.cardiovascularSystem.length > 0
          ? values.currentConsultation.cardiovascularSystem
          : null,
      reproductiveSystem:
        values.currentConsultation.reproductiveSystem.length > 0
          ? values.currentConsultation.reproductiveSystem
          : null,
      urinarySystem:
        values.currentConsultation.urinarySystem.length > 0
          ? values.currentConsultation.urinarySystem
          : null,
      ophthalmologicalSystem:
        values.currentConsultation.ophthalmologicalSystem.length > 0
          ? values.currentConsultation.ophthalmologicalSystem
          : null,
      locomotorSystem:
        values.currentConsultation.locomotorSystem.length > 0
          ? values.currentConsultation.locomotorSystem
          : null,
      earInspection:
        values.currentConsultation.earInspection.length > 0
          ? values.currentConsultation.earInspection
          : null,
      neurologicalInspection:
        values.currentConsultation.neurologicalInspection.length > 0
          ? values.currentConsultation.neurologicalInspection
          : null,
      skinInspection:
        values.currentConsultation.skinInspection.length > 0
          ? values.currentConsultation.skinInspection
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
      patientId: patient?.patientId ?? 0,
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
    // localStorage.removeItem("noodus.storage.medical-record-create");

    setTimeout(() => {
      router.push(
        PatientsRoutesEnum.PatientsView +
          patient?.patientId +
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
                    patient?.patientId +
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
