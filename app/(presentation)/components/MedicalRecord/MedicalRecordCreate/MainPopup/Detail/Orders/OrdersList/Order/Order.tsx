import {
  medicalRecordTypeOrderEnum,
  MedicalRecordTypesOrdersEnum,
} from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import MedicalRecordCreateProvider from "(presentation)/components/MedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import { IUser } from "domain/core/entities/userEntity";
import DownloadPDF from "./DownloadPDF/DownloadPDF";

interface IOrderProps {
  user: IUser;
  medicalRecord: IMedicalRecord;
}

export default function Order({ user, medicalRecord }: IOrderProps) {
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
    <div className="lg:flex md:flex block items-center justify-between">
      <div className="flex items-center">
        <div className="mr-8">
          <p className="text-slate-500 font-normal lg:text-md">
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
          <p className="text-slate-900 lg:text-md">
            {getTextByOrderType(medicalRecord)}
          </p>
        </div>
      </div>

      <div className="flex items-center lg:mt-0 md:mt-0 mt-3">
        <MedicalRecordCreateProvider>
          <DownloadPDF user={user} medicalRecord={medicalRecord} />
        </MedicalRecordCreateProvider>
      </div>
    </div>
  );
}
