import Image from "next/image";
import { useContext, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../../../context/MedicalRecordContext";

interface IPatientDetailProps {
  patientId: number;
}

export default function PatientDetail({ patientId }: IPatientDetailProps) {
  const { state } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data: patient } = state.patient;

  return (
    <div className="flex items-center py-8 px-4">
      <div className="mr-8">
        {patient && patient?.pictureUrl.length > 0 ? (
          <Image
            className="object-cover rounded-full"
            src={patient.pictureUrl}
            alt=""
            width={100}
            height={100}
          />
        ) : (
          <FiUser size={80} />
        )}
      </div>

      <div>
        <div className="mb-3">
          <p className="text-slate-900 font-bold text-3xl">
            {patient?.name} {patient?.lastName}
          </p>
        </div>

        <div>
          <p className="text-slate-900 font-normal text-lg">{patient?.email}</p>
        </div>
      </div>
    </div>
  );
}
