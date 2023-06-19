import {
  MedicalRecordCategoriesIdEnum,
  medicalRecordTypePhysicalEnum,
} from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import {
  IMedicalRecord,
  IMedicalRecordValue,
} from "domain/core/entities/medicalRecordEntity";
import { useEffect, useState } from "react";

interface IPhysicalProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Physical({ medicalConsulty }: IPhysicalProps) {
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([]);

  const setMedicalRecordsPhysical = () => {
    if (
      medicalConsulty.medicalRecords &&
      medicalConsulty.medicalRecords.length === 0
    )
      return;

    const medicalRecordsPhysical: IMedicalRecord[] = [];

    medicalConsulty.medicalRecords?.forEach((medicalRecord: IMedicalRecord) => {
      if (
        medicalRecord.medicalRecordType.medicalRecordCategoryId ===
        MedicalRecordCategoriesIdEnum.PHYSICAL
      ) {
        medicalRecordsPhysical.push(medicalRecord);
      }
    });

    setMedicalRecords(medicalRecordsPhysical);
  };

  useEffect(() => {
    setMedicalRecordsPhysical();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicalConsulty.medicalRecords]);

  if (medicalRecords.length === 0) return <div />;

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Examen físico</h3>
      </div>

      {medicalRecords.map((medicalRecord: IMedicalRecord) => (
        <div key={medicalRecord.id} className="mb-3">
          <h1 className="text-slate-900 font-bold text-lg flex">
            {
              medicalRecordTypePhysicalEnum[
                medicalRecord.medicalRecordType.name
              ]
            }
            :
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
