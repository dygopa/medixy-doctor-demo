import { MedicalRecordCategoriesIdEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { getMedicalRecordsForTypes } from "(presentation)/(helper)/medicalRecords/medicalRecordsHelper";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";

export const getMedicalRecordsHistory = (medicalRecords: IMedicalRecord[]) => {
    if (
      medicalRecords &&
      medicalRecords.length === 0
    )
      return [];

    const medicalRecordsHistory: IMedicalRecord[] = [];

    medicalRecords?.forEach((medicalRecord: IMedicalRecord) => {
      if (
        medicalRecord.medicalRecordType.medicalRecordCategoryId ===
        MedicalRecordCategoriesIdEnum.RECORDS
      ) {
        medicalRecordsHistory.push(medicalRecord);
      }
    });

    if (medicalRecordsHistory.length > 0) {
      const medicalRecordsList: IMedicalRecord[] = getMedicalRecordsForTypes(
        medicalRecordsHistory
      );

      return medicalRecordsList;
    }

    return medicalRecordsHistory;
};

export const getMedicalRecordsPhysical = (medicalRecords: IMedicalRecord[]) => {
    if (
      medicalRecords &&
      medicalRecords.length === 0
    )
      return [];

    const medicalRecordsPhysical: IMedicalRecord[] = [];

    medicalRecords?.forEach((medicalRecord: IMedicalRecord) => {
      if (
        medicalRecord.medicalRecordType.medicalRecordCategoryId ===
        MedicalRecordCategoriesIdEnum.PHYSICAL
      ) {
        medicalRecordsPhysical.push(medicalRecord);
      }
    });

    return medicalRecordsPhysical;
  };