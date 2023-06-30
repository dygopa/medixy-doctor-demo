import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import {
  IMedicalRecord,
  IMedicalRecordValue,
} from "domain/core/entities/medicalRecordEntity";
import {
  medicalRecordTypeEnum,
  MedicalRecordCategoriesIdEnum,
} from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { useEffect, useState } from "react";
import { getMedicalRecordsForTypes } from "(presentation)/(helper)/medicalRecords/medicalRecordsHelper";

interface IRecordsProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Records({ medicalConsulty }: IRecordsProps) {
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([]);

  const setMedicalRecordsHistory = () => {
    if (
      medicalConsulty.medicalRecords &&
      medicalConsulty.medicalRecords.length === 0
    )
      return;

    const medicalRecordsHistory: IMedicalRecord[] = [];

    medicalConsulty.medicalRecords?.forEach((medicalRecord: IMedicalRecord) => {
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

      setMedicalRecords(medicalRecordsList);
      return;
    }

    setMedicalRecords([]);
  };

  useEffect(() => {
    setMedicalRecordsHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicalConsulty.medicalRecords]);

  if (medicalRecords.length === 0) return <div />;

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Antecedentes</h3>
      </div>

      {medicalRecords.map((medicalRecord: IMedicalRecord) => (
        <div key={medicalRecord.id} className="mb-3">
          <h1 className="text-slate-900 font-bold text-lg flex">
            {medicalRecordTypeEnum[medicalRecord.medicalRecordType.name]}:
          </h1>
          {medicalRecord.medicalRecordValues.map(
            (medicalRecordValue: IMedicalRecordValue) => (
              <div key={medicalRecordValue.id}>
                <p className="text-grey font-normal text-lg">
                  {medicalRecordValue.value}
                </p>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}
