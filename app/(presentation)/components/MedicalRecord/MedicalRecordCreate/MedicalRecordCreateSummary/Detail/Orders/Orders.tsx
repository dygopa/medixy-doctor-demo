import {
  MedicalRecordCategoriesIdEnum,
  medicalRecordTypeOrderEnum,
} from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import {
  IMedicalRecord,
  IMedicalRecordValue,
} from "domain/core/entities/medicalRecordEntity";
import { useEffect, useState } from "react";
import MedicalRecordCreateSummaryProvider from "../../context/MedicalRecordCreateSummaryContext";
import DownloadPDF from "./DownloadPDF/DownloadPDF";

interface IOrdersProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Orders({ medicalConsulty }: IOrdersProps) {
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([]);

  const setMedicalRecordsOrders = () => {
    if (
      medicalConsulty.medicalRecords &&
      medicalConsulty.medicalRecords.length === 0
    )
      return;

    const medicalRecordsOrders: IMedicalRecord[] = [];

    medicalConsulty.medicalRecords?.forEach((medicalRecord: IMedicalRecord) => {
      if (
        medicalRecord.medicalRecordType.medicalRecordCategoryId ===
        MedicalRecordCategoriesIdEnum.ORDERS
      ) {
        medicalRecordsOrders.push(medicalRecord);
      }
    });

    setMedicalRecords(medicalRecordsOrders);
  };

  useEffect(() => {
    setMedicalRecordsOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicalConsulty.medicalRecords]);

  if (medicalRecords.length === 0) return <div />;

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Ordenes</h3>
      </div>

      {medicalRecords.map(
        (medicalRecord: IMedicalRecord) =>
          medicalRecord.medicalRecordValues.length > 0 && (
            <div key={medicalRecord.id} className="mb-3">
              <h1 className="text-slate-900 font-bold text-lg flex">
                {
                  medicalRecordTypeOrderEnum[
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

              <MedicalRecordCreateSummaryProvider>
                <DownloadPDF medicalRecord={medicalRecord} />
              </MedicalRecordCreateSummaryProvider>
            </div>
          )
      )}
    </div>
  );
}
