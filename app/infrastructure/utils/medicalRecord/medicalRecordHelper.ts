import { MedicalRecordCategoriesIdEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
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