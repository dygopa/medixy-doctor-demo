import {
  medicalRecordTypeOrderEnum,
  MedicalRecordTypesOrdersEnum,
} from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import MedicalRecordProvider from "(presentation)/components/MedicalRecord/MedicalRecord/context/MedicalRecordContext";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import DownloadPDF from "./DownloadPDF/DownloadPDF";

interface IOrderProps {
  medicalRecord: IMedicalRecord;
}

export default function Order({ medicalRecord }: IOrderProps) {
  const getTextByOrderType = (medicalRecord: IMedicalRecord): string => {
    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_LABORATORY
    ) {
      return medicalRecord.medicalRecordValues[0].value.length === 0
        ? medicalRecord.medicalRecordValues[1].value
        : medicalRecord.medicalRecordValues[0].value;
    }

    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_DIAGNOSIS
    ) {
      return medicalRecord.medicalRecordValues[0].value.length === 0
        ? medicalRecord.medicalRecordValues[1].value
        : medicalRecord.medicalRecordValues[0].value;
    }

    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_HOSPITALIZATION
    ) {
      return medicalRecordTypeOrderEnum[medicalRecord.medicalRecordType.name];
    }

    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_MEDICAL_PROOF
    ) {
      return medicalRecordTypeOrderEnum[medicalRecord.medicalRecordType.name];
    }

    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_MEDICAL_CERTIFICATE
    ) {
      return medicalRecordTypeOrderEnum[medicalRecord.medicalRecordType.name];
    }

    if (
      medicalRecord.medicalRecordType.name ===
        MedicalRecordTypesOrdersEnum.ORDER_SPECIALTY &&
      medicalRecord.medicalRecordValues.length >= 1
    ) {
      return `${medicalRecord.medicalRecordValues[0].value} ${medicalRecord.medicalRecordValues[1].value}`;
    }

    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_OPENING
    ) {
      return medicalRecord.medicalRecordValues[0].value;
    }

    return "";
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center w-full">
        <div className="lg:mr-8 md:mr-8 mr-3">
          <p className="text-slate-500 font-normal lg:text-[14px] md:text-[14px] text-xs">
            {new Date(medicalRecord.medicalConsulty.consultationDate).getDate()}
            /
            {new Date(
              medicalRecord.medicalConsulty.consultationDate
            ).getMonth()}
            /
            {new Date(
              medicalRecord.medicalConsulty.consultationDate
            ).getFullYear()}
          </p>
        </div>

        <div className="lg:w-auto w-[250px]">
          <p className="text-slate-900 lg:text-[14px] md:text-[14px] text-xs text-ellipsis overflow-hidden whitespace-nowrap">
            {getTextByOrderType(medicalRecord)}
          </p>
        </div>
      </div>

      {/* <div className="flex items-center">
        <MedicalRecordProvider>
          <DownloadPDF medicalRecord={medicalRecord} />
        </MedicalRecordProvider>
            </div> */}
    </div>
  );
}
