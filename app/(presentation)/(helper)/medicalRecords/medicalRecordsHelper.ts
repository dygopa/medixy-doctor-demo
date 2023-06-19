import { MedicalRecordTypesEnum, MedicalRecordTypesOrdersEnum, MedicalRecordTypesPhysicalEnum, MedicalRecordValueTypesEnum, MedicalRecordValueTypesOrdersEnum, MedicalRecordValueTypesPhysicalEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { IMedicalRecord, IMedicalRecordType, IMedicalRecordValue, IMedicalRecordValueType } from "domain/core/entities/medicalRecordEntity";
import { IOrderMedical } from "domain/core/entities/orderEntity";
import { medicalRecordsValues } from "./medicalRecordsValues";

export const getMedicalRecordsHistory = (values: any, subjectId: number) => {
    const medicalRecords: IMedicalRecord[] = [];

    if (
      values?.allergiesPathological?.isChecked &&
      values?.allergiesPathological?.values?.length > 0
    ) {
      values?.allergiesPathological?.values.forEach((allergy: any) => {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
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
        subjectId: subjectId,
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
        subjectId: subjectId,
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
        subjectId: subjectId,
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
        subjectId: subjectId,
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
        subjectId: subjectId,
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
          subjectId: subjectId,
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
        subjectId: subjectId,
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
          subjectId: subjectId,
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
        subjectId: subjectId,
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
        subjectId: subjectId,
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
          subjectId: subjectId,
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
        subjectId: subjectId,
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
        subjectId: subjectId,
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
          subjectId: subjectId,
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
          subjectId: subjectId,
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
          subjectId: subjectId,
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
        subjectId: subjectId,
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
            subjectId: subjectId,
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
          subjectId: subjectId,
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
        subjectId: subjectId,
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
}


export const getMedicalRecordsPhysical = (values: any, subjectId: number) => {
    const medicalRecords: IMedicalRecord[] = [];

    if (values?.abnormalAppearance?.isChecked) {
      medicalRecords.push({
        id: 0,
        subjectId: subjectId,
        medicalRecordTypeId: 0,
        medicalRecordType: {
          id: 0,
          name: MedicalRecordTypesPhysicalEnum.ABNORMAL_APPEREANCE,
        } as IMedicalRecordType,
        medicalRecordValues: [
          {
            id: 0,
            value: values?.abnormalAppearance?.value,
            medicalRecordValueType: {
              id: 0,
              name: MedicalRecordValueTypesPhysicalEnum.ABNORMAL_APPEREANCE_DESCRIPTION,
            } as IMedicalRecordValueType,
          },
        ],
        medicalConsultyId: 0,
        medicalConsulty: {},
      } as IMedicalRecord);
    }

    if (values?.abnormalMovements?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.ABNORMAL_MOVEMENTS,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormalMovements?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.ABNORMAL_MOVEMENTS_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.abnormality?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.ABNORMALITY,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormality?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.ABNORMALITY_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.amputation?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.AMPUTATION,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.amputation?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.AMPUTATION_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.deformity?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.DEFORMITY,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.deformity?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.DEFORMITY_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.disnea?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.DISNEA,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.disnea?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.DISNEA_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.mentalDisorder?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.MENTAL_DISORDER,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.mentalDisorder?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.MENTAL_DISORDER_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.normalGait?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.ABNORMAL_GAIT,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.normalGait?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.ABNORMAL_GAIT_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.paralysis?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.PARALISYS,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.paralysis?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.PARALISYS_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.smokingPhysical?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.SMOKING_PHYSICAL,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.smokingPhysical?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.SMOKING_PHYSICAL_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.abnormality?.isChecked && values?.abnormality?.values?.abdomen?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.ABDOMEN,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormality?.values?.abdomen?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.ABDOMEN_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.abnormality?.isChecked && values?.abnormality?.values?.anatomicalStateEyes?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.ANATOMICAL_STATE_EYES,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormality?.values?.anatomicalStateEyes?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.ANATOMICAL_STATE_EYES_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.abnormality?.isChecked && values?.abnormality?.values?.buccalPharynx?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.BUCCAL_PHARYNX,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormality?.values?.buccalPharynx?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.BUCCAL_PHARYNX_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.abnormality?.isChecked && values?.abnormality?.values?.chest?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.CHEST,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormality?.values?.chest?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.CHEST_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.abnormality?.isChecked && values?.abnormality?.values?.extremities?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.EXTREMITIES,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormality?.values?.extremities?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.EXTREMITIES_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.abnormality?.isChecked && values?.abnormality?.values?.eyeVision?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.EYE_VISION,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormality?.values?.eyeVision?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.EYE_VISION_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.abnormality?.isChecked && values?.abnormality?.values?.hearingEars?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.HEARING_EARS,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormality?.values?.hearingEars?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.HEARING_EARS_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.abnormality?.isChecked && values?.abnormality?.values?.neck?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.NECK,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormality?.values?.neck?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.NECK_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

      if (values?.abnormality?.isChecked && values?.abnormality?.values?.spine?.isChecked) {
        medicalRecords.push({
          id: 0,
          subjectId: subjectId,
          medicalRecordTypeId: 0,
          medicalRecordType: {
            id: 0,
            name: MedicalRecordTypesPhysicalEnum.SPINE,
          } as IMedicalRecordType,
          medicalRecordValues: [
            {
              id: 0,
              value: values?.abnormality?.values?.spine?.value,
              medicalRecordValueType: {
                id: 0,
                name: MedicalRecordValueTypesPhysicalEnum.SPINE_DESCRIPTION,
              } as IMedicalRecordValueType,
            },
          ],
          medicalConsultyId: 0,
          medicalConsulty: {},
        } as IMedicalRecord);
      }

    return medicalRecords;
}


export const getMedicalRecordsOrders = (values: any, subjectId: number) => {
  const medicalRecords: IMedicalRecord[] = [];

  if (values.length > 0) {
    values.forEach((value: IOrderMedical) => {
      switch (value.orderType) {
        case "laboratory":
          medicalRecords.push({
            id: 0,
            subjectId: subjectId,
            medicalRecordTypeId: 0,
            medicalRecordType: {
              id: 0,
              name: MedicalRecordTypesOrdersEnum.ORDER_LABORATORY,
            } as IMedicalRecordType,
            medicalRecordValues: [
              {
                id: 0,
                value: value.medicalProfile.name,
                medicalRecordValueType: {
                  id: 0,
                  name: MedicalRecordValueTypesOrdersEnum.ORDER_LABORATORY_MEDICAL_EXAM,
                } as IMedicalRecordValueType,
              },
              {
                id: 1,
                value: value.indications,
                medicalRecordValueType: {
                  id: 0,
                  name: MedicalRecordValueTypesOrdersEnum.ORDER_LABORATORY_INDICATION,
                } as IMedicalRecordValueType,
              },
            ],
            medicalConsultyId: 0,
            medicalConsulty: {},
          } as IMedicalRecord);
          break;

        case "diagnosis":
          medicalRecords.push({
            id: 0,
            subjectId: subjectId,
            medicalRecordTypeId: 0,
            medicalRecordType: {
              id: 0,
              name: MedicalRecordTypesOrdersEnum.ORDER_DIAGNOSIS,
            } as IMedicalRecordType,
            medicalRecordValues: [
              {
                id: 0,
                value: value.medicalProfile.name,
                medicalRecordValueType: {
                  id: 0,
                  name: MedicalRecordValueTypesOrdersEnum.ORDER_DIAGNOSIS_MEDICAL_EXAM,
                } as IMedicalRecordValueType,
              },
              {
                id: 1,
                value: value.indications,
                medicalRecordValueType: {
                  id: 0,
                  name: MedicalRecordValueTypesOrdersEnum.ORDER_DIAGNOSIS_INDICATION,
                } as IMedicalRecordValueType,
              },
            ],
            medicalConsultyId: 0,
            medicalConsulty: {},
          } as IMedicalRecord);
          break;

          
        case "specialty":
          medicalRecords.push({
            id: 0,
            subjectId: subjectId,
            medicalRecordTypeId: 0,
            medicalRecordType: {
              id: 0,
              name: MedicalRecordTypesOrdersEnum.ORDER_SPECIALTY,
            } as IMedicalRecordType,
            medicalRecordValues: [
              {
                id: 0,
                value: value.specialty,
                medicalRecordValueType: {
                  id: 0,
                  name: MedicalRecordValueTypesOrdersEnum.ORDER_SPECIALTY,
                } as IMedicalRecordValueType,
              },
              {
                id: 1,
                value: value.doctorName,
                medicalRecordValueType: {
                  id: 0,
                  name: MedicalRecordValueTypesOrdersEnum.ORDER_SPECIALTY_DOCTOR_NAME,
                } as IMedicalRecordValueType,
              },
              {
                id: 2,
                value: value.otherDoctorName,
                medicalRecordValueType: {
                  id: 0,
                  name: MedicalRecordValueTypesOrdersEnum.ORDER_SPECIALTY_OTHER_DOCTOR_NAME,
                } as IMedicalRecordValueType,
              },
            ],
            medicalConsultyId: 0,
            medicalConsulty: {},
          } as IMedicalRecord);
          break;

          case "justificative":
          medicalRecords.push({
            id: 0,
            subjectId: subjectId,
            medicalRecordTypeId: 0,
            medicalRecordType: {
              id: 0,
              name: MedicalRecordTypesOrdersEnum.ORDER_MEDICAL_PROOF,
            } as IMedicalRecordType,
            medicalRecordValues: [
              {
                id: 0,
                value: value.indications,
                medicalRecordValueType: {
                  id: 0,
                  name: MedicalRecordValueTypesOrdersEnum.ORDER_MEDICAL_PROOF,
                } as IMedicalRecordValueType,
              },
            ],
            medicalConsultyId: 0,
            medicalConsulty: {},
          } as IMedicalRecord);

         
          break;

          case "certificate":
            medicalRecords.push({
              id: 0,
              subjectId: subjectId,
              medicalRecordTypeId: 0,
              medicalRecordType: {
                id: 0,
                name: MedicalRecordTypesOrdersEnum.ORDER_MEDICAL_CERTIFICATE,
              } as IMedicalRecordType,
              medicalRecordValues: [
                {
                  id: 0,
                  value: value.indications,
                  medicalRecordValueType: {
                    id: 0,
                    name: MedicalRecordValueTypesOrdersEnum.ORDER_MEDICAL_CERTIFICATE,
                  } as IMedicalRecordValueType,
                },
              ],
              medicalConsultyId: 0,
              medicalConsulty: {},
            } as IMedicalRecord);
  
           
            break;

            case "hospitalitation":
              medicalRecords.push({
                id: 0,
                subjectId: subjectId,
                medicalRecordTypeId: 0,
                medicalRecordType: {
                  id: 0,
                  name: MedicalRecordTypesOrdersEnum.ORDER_HOSPITALIZATION,
                } as IMedicalRecordType,
                medicalRecordValues: [
                  {
                    id: 0,
                    value: value.indications,
                    medicalRecordValueType: {
                      id: 0,
                      name: MedicalRecordValueTypesOrdersEnum.ORDER_HOSPITALIZATION,
                    } as IMedicalRecordValueType,
                  },
                ],
                medicalConsultyId: 0,
                medicalConsulty: {},
              } as IMedicalRecord);
    
             
              break;

              case "opening":
                medicalRecords.push({
                  id: 0,
                  subjectId: subjectId,
                  medicalRecordTypeId: 0,
                  medicalRecordType: {
                    id: 0,
                    name: MedicalRecordTypesOrdersEnum.ORDER_OPENING,
                  } as IMedicalRecordType,
                  medicalRecordValues: [
                    {
                      id: 0,
                      value: value.indications,
                      medicalRecordValueType: {
                        id: 0,
                        name: MedicalRecordValueTypesOrdersEnum.ORDER_OPENING,
                      } as IMedicalRecordValueType,
                    },
                  ],
                  medicalConsultyId: 0,
                  medicalConsulty: {},
                } as IMedicalRecord);
      
               
                break;
      
        default:
          break;
      }
    });
  }

  return medicalRecords;
}

export const getMedicalRecordsValues = (medicalRecords: IMedicalRecord[]) => {
  if (medicalRecords.length === 0) return medicalRecordsValues;
  
  let values = medicalRecordsValues;

  medicalRecords.forEach((medicalRecord: IMedicalRecord) => {
    switch (medicalRecord.medicalRecordType.name) {
      case MedicalRecordTypesEnum.ALLERGIES:
        if (medicalRecord.medicalRecordValues.length > 0) {
          values = {
            ...values, 
            allergiesPathological: { 
              isChecked: true, 
              values: values.allergiesPathological.values.concat(medicalRecord.medicalRecordValues.map((medicalRecordValue: IMedicalRecordValue) => { 
                if (values.allergiesPathological.values.indexOf(medicalRecordValue.value) < 0) return medicalRecordValue.value;
              
                return "";
              })) 
            } 
          };

          values = {...values, allergiesPathological: { isChecked: true, values: values.allergiesPathological.values.filter((valueFilter) => valueFilter !== "") }}
        }
        break;
      case MedicalRecordTypesEnum.SURGICAL_INTERVENTIONS:
        if (medicalRecord.medicalRecordValues.length > 0) {
          values = {
            ...values, 
            surgicalInterventions: { 
              isChecked: true, 
              values: values.surgicalInterventions.values.concat(medicalRecord.medicalRecordValues.map((medicalRecordValue: IMedicalRecordValue) => { 
                if (values.surgicalInterventions.values.indexOf(medicalRecordValue.value) < 0) return medicalRecordValue.value;
              
                return "";
              })) 
            } 
          };

          values = {...values, surgicalInterventions: { isChecked: true, values: values.surgicalInterventions.values.filter((valueFilter) => valueFilter !== "") }}
        }
        break;
      case MedicalRecordTypesEnum.TAKE_MEDICATIONS:
        if (medicalRecord.medicalRecordValues.length > 0) {
          values = {
            ...values, 
            takeMedication: { 
              isChecked: true, 
              values: values.takeMedication.values.concat(medicalRecord.medicalRecordValues.map((medicalRecordValue: IMedicalRecordValue) => { 
                if (values.takeMedication.values.indexOf(medicalRecordValue.value) < 0) return medicalRecordValue.value;
              
                return "";
              })) 
            } 
          };

          values = {...values, takeMedication: { isChecked: true, values: values.takeMedication.values.filter((valueFilter) => valueFilter !== "") }}
        }
        break;
      case MedicalRecordTypesEnum.TRANSFUSIONS:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.transfusions.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, transfusions: { isChecked: true, value:  values.transfusions.value + `${values.transfusions.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.ANEMIA:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.anemia.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, anemia: { isChecked: true, value:  values.anemia.value + `${values.anemia.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.ARTHRITIS:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.arthritis.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, arthritis: { isChecked: true, value:  values.arthritis.value + `${values.arthritis.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.ASMA:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.asma.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, asma: { isChecked: true, value:  values.asma.value + `${values.asma.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.CANCER:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.cancer.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, cancer: { isChecked: true, value:  values.cancer.value + `${values.cancer.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.BLOODS_CLOTS:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.bloodClots.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, bloodClots: { isChecked: true, value:  values.bloodClots.value + `${values.bloodClots.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.COLITIS:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.colitis.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, colitis: { isChecked: true, value:  values.colitis.value + `${values.colitis.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.BLOOD_TYPE:
        if (medicalRecord.medicalRecordValues.length > 0) {
          values = {
            ...values, 
            bloodTypeNonPathological: { 
              isChecked: true, 
              values: values.bloodTypeNonPathological.values.concat(medicalRecord.medicalRecordValues.map((medicalRecordValue: IMedicalRecordValue) => { 
                if (values.bloodTypeNonPathological.values.indexOf(medicalRecordValue.value) < 0) return medicalRecordValue.value;
              
                return "";
              })) 
            } 
          };

          values = {...values, bloodTypeNonPathological: { isChecked: true, values: values.bloodTypeNonPathological.values.filter((valueFilter) => valueFilter !== "") }}
        }
        break;
      case MedicalRecordTypesEnum.SMOKING:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.smokingNonPathological.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, smokingNonPathological: { isChecked: true, value:  values.smokingNonPathological.value + `${values.smokingNonPathological.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.ALCOCHOLIC_BEVERAGES:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.alcoholicBeveragesNonPathological.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, alcoholicBeveragesNonPathological: { isChecked: true, value:  values.alcoholicBeveragesNonPathological.value + `${values.alcoholicBeveragesNonPathological.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.DRUGS:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.drugsNonPathological.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, drugsNonPathological: { isChecked: true, value:  values.drugsNonPathological.value + `${values.drugsNonPathological.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.COVID:
        if (medicalRecord.medicalRecordValues.length > 0 && medicalRecord.medicalRecordValues.length > 0 && !values.covidNonPathological.value.includes(medicalRecord.medicalRecordValues[0].value)) {
          values = {...values, covidNonPathological: { isChecked: true, value:  values.covidNonPathological.value + `${values.covidNonPathological.value.length > 0 ? ", " : ""}` + medicalRecord.medicalRecordValues[0].value } };
        }
        break;
      case MedicalRecordTypesEnum.DIABETES:
        if (medicalRecord.medicalRecordValues.length > 0) {
          values = {
            ...values, 
            diabetesFamily: { 
              isChecked: true, 
              values: values.diabetesFamily.values.concat(medicalRecord.medicalRecordValues.map((medicalRecordValue: IMedicalRecordValue) => { 
                if (values.diabetesFamily.values.indexOf(medicalRecordValue.value) < 0) return medicalRecordValue.value;
              
                return "";
              })) 
            } 
          };

          values = {...values, diabetesFamily: { isChecked: true, values: values.diabetesFamily.values.filter((valueFilter) => valueFilter !== "") }}
        }
        break;
      case MedicalRecordTypesEnum.CANCER_FAMILY:
        if (medicalRecord.medicalRecordValues.length > 0) {
          values = {
            ...values, 
            cancerFamily: { 
              isChecked: true, 
              values: values.cancerFamily.values.concat(medicalRecord.medicalRecordValues.map((medicalRecordValue: IMedicalRecordValue) => { 
                if (values.cancerFamily.values.indexOf(medicalRecordValue.value) < 0) return medicalRecordValue.value;
              
                return "";
              })) 
            } 
          };

          values = {...values, cancerFamily: { isChecked: true, values: values.cancerFamily.values.filter((valueFilter) => valueFilter !== "") }}
        }
        break;
      case MedicalRecordTypesEnum.HIPERTENSION:
        if (medicalRecord.medicalRecordValues.length > 0) {
          values = {
            ...values, 
            hypertensionFamily: { 
              isChecked: true, 
              values: values.hypertensionFamily.values.concat(medicalRecord.medicalRecordValues.map((medicalRecordValue: IMedicalRecordValue) => { 
                if (values.hypertensionFamily.values.indexOf(medicalRecordValue.value) < 0) return medicalRecordValue.value;
              
                return "";
              })) 
            } 
          };

          values = {...values, hypertensionFamily: { isChecked: true, values: values.hypertensionFamily.values.filter((valueFilter) => valueFilter !== "") }}
        }
        break;
      case MedicalRecordTypesEnum.SIDA:
        if (medicalRecord.medicalRecordValues.length > 0) {
          values = {
            ...values, 
            sidaFamily: { 
              isChecked: true, 
              values: values.sidaFamily.values.concat(medicalRecord.medicalRecordValues.map((medicalRecordValue: IMedicalRecordValue) => { 
                if (values.sidaFamily.values.indexOf(medicalRecordValue.value) < 0) return medicalRecordValue.value;
              
                return "";
              })) 
            } 
          };

          values = {...values, sidaFamily: { isChecked: true, values: values.sidaFamily.values.filter((valueFilter) => valueFilter !== "") }}
        }
        break;
      case MedicalRecordTypesEnum.OTHER:
        if (medicalRecord.medicalRecordValues.length > 0) {
          values = {
            ...values, 
            otherFamily: { 
              isChecked: true, 
              values: values.otherFamily.values.concat(medicalRecord.medicalRecordValues.map((medicalRecordValue: IMedicalRecordValue) => { 
                if (values.otherFamily.values.indexOf(medicalRecordValue.value) < 0) return medicalRecordValue.value;
              
                return "";
              })) 
            } 
          };

          values = {...values, otherFamily: { isChecked: true, values: values.otherFamily.values.filter((valueFilter) => valueFilter !== "") }}
        }
        break;

      default:
        break;
    }
  });

  return values;
}

export const getMedicalRecordsForTypes = (medicalRecords: IMedicalRecord[]) => {
  if (medicalRecords.length === 0) return [];

  const values: IMedicalRecord[] = [];

  medicalRecords.forEach((medicalRecord: IMedicalRecord) => {
    const currentMedicalRecordIndex = values.findIndex((medicalRecordFind) => medicalRecordFind.medicalRecordType.name === medicalRecord.medicalRecordType.name);

    if (medicalRecord.medicalRecordValues.length > 0 && currentMedicalRecordIndex >= 0) {
      const medicalRecordValues = values[currentMedicalRecordIndex].medicalRecordValues;

      medicalRecord.medicalRecordValues.forEach((medicalRecordValue: IMedicalRecordValue) => {
        if (values[currentMedicalRecordIndex].medicalRecordValues.findIndex((medicalRecordValueFind) => medicalRecordValueFind.value === medicalRecordValue.value) < 0) {
          medicalRecordValues.push(medicalRecordValue);
        }
      });

      values[currentMedicalRecordIndex].medicalRecordValues = medicalRecordValues;
    } else if (medicalRecord.medicalRecordValues.length > 0) {
      values.push({
        id: values.length + 1,
        medicalRecordTypeId: medicalRecord.medicalRecordTypeId,
        medicalRecordType: medicalRecord.medicalRecordType,
        medicalRecordValues: medicalRecord.medicalRecordValues,
        medicalConsultyId: medicalRecord.medicalConsultyId,
        medicalConsulty: medicalRecord.medicalConsulty,
        subjectId: medicalRecord.subjectId,
        subject: medicalRecord.subject,
      } as IMedicalRecord);
    }
  });

  return values;
}
