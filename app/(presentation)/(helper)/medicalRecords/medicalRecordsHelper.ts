import { MedicalRecordTypesEnum, MedicalRecordTypesPhysicalEnum, MedicalRecordValueTypesEnum, MedicalRecordValueTypesPhysicalEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { IMedicalRecord, IMedicalRecordType, IMedicalRecordValueType } from "domain/core/entities/medicalRecordEntity";

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

      if (values?.abnormality?.values?.abdomen?.isChecked) {
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

      if (values?.abnormality?.values?.anatomicalStateEyes?.isChecked) {
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

      if (values?.abnormality?.values?.buccalPharynx?.isChecked) {
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

      if (values?.abnormality?.values?.chest?.isChecked) {
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

      if (values?.abnormality?.values?.extremities?.isChecked) {
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

      if (values?.abnormality?.values?.eyeVision?.isChecked) {
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

      if (values?.abnormality?.values?.hearingEars?.isChecked) {
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

      if (values?.abnormality?.values?.neck?.isChecked) {
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

      if (values?.abnormality?.values?.spine?.isChecked) {
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