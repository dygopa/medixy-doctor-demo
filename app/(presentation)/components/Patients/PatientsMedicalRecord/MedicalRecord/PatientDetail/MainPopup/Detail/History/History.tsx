import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../../../context/MedicalRecordContext";
import Detail from "./Detail/Detail";
import HistoryTable from "./Table/Table";

export default function History() {
  const { state } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data: medicalConsulties, successful } = state.medicalConsulties;

  const [medicalConsulty, setMedicalConsulty] =
    useState<IMedicalConsulty | null>(null);

  const searchParams = useSearchParams();

  const medicalRecordId = searchParams.get("medical_record_id");

  const getMedicalConsulty = () => {
    if (medicalConsulties.data?.length === 0 || !medicalRecordId) return;

    const id = parseInt(medicalRecordId.toString(), 10);

    const medicalConsultyFind = medicalConsulties.data.find(
      (element) => element.id === id
    );

    if (medicalConsultyFind) setMedicalConsulty(medicalConsultyFind);
  };

  useEffect(() => {
    if (successful && medicalRecordId && medicalRecordId?.length > 0) {
      getMedicalConsulty();
    } else {
      setMedicalConsulty(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful, medicalRecordId]);

  return (
    <div className="overflow-x-hidden">
      {medicalConsulty ? (
        <Detail
          medicalConsulty={medicalConsulty}
          setMedicalConsulty={setMedicalConsulty}
        />
      ) : (
        <HistoryTable setMedicalConsulty={setMedicalConsulty} />
      )}
    </div>
  );
}
