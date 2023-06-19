import {
  MedicalRecordCategoriesIdEnum,
  medicalRecordTypeEnum,
} from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  IMedicalRecord,
  IMedicalRecordValue,
} from "domain/core/entities/medicalRecordEntity";
import { useContext, useEffect, useState } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../../../../context/MedicalRecordCreateContext";

interface IRecordListProps {
  subjectId: number;
}

export default function RecordList({ subjectId }: IRecordListProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { getMedicalRecords } = actions;
  const { data, loading, error, successful } = state.medicalRecords;

  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([]);

  const setMedicalRecordsMap = () => {
    const medicalRecordsList: IMedicalRecord[] = [];

    if (data.data && data.data.length > 0) {
      data.data.forEach((medicalRecord: IMedicalRecord) => {
        const index = medicalRecordsList.findIndex(
          (medicalRecordFind) =>
            medicalRecordFind.medicalRecordTypeId ===
            medicalRecord.medicalRecordTypeId
        );

        if (index < 0) medicalRecordsList.push(medicalRecord);
      });
    }

    setMedicalRecords(medicalRecordsList);
  };

  const onGetMedicalRecordsDispatch = () => {
    if (subjectId) {
      getMedicalRecords({
        subjectId: subjectId,
        medicalRecordCategoryId: MedicalRecordCategoriesIdEnum.RECORDS,
      })(dispatch);
    }
  };

  useEffect(() => {
    if (successful) setMedicalRecordsMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useEffect(() => {
    onGetMedicalRecordsDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          Cargando los antecedentes...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo no ha salido como se esperaba
        </p>
        <p className="font-light text-slate-500 text-base mb-4">
          Lo sentimos, algo no ha salido bien. Vuelve a intentarlo
        </p>
        <Button variant="primary" onClick={() => onGetMedicalRecordsDispatch()}>
          Volver a intentar
        </Button>
      </div>
    );
  }

  if (successful && medicalRecords.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          El paciente no posee antecedentes.
        </p>
      </div>
    );
  }

  if (!data.data) return <div />;

  return (
    <div className="mt-4">
      <div>
        {medicalRecords.map((medicalRecord: IMedicalRecord) => (
          <div key={medicalRecord.id} className="mb-3 border-b py-2">
            <div>
              <p className="text-slate-900 text-lg font-bold">
                {medicalRecordTypeEnum[medicalRecord.medicalRecordType.name]}:
              </p>
            </div>

            <div>
              {medicalRecord.medicalRecordValues.length > 0 && (
                <div>
                  {medicalRecord.medicalRecordValues.map(
                    (medicalRecordValue: IMedicalRecordValue) => (
                      <p
                        key={medicalRecordValue.id}
                        className="text-grey text-lg font-normal overflow-hidden block text-ellipsis"
                        style={{ wordBreak: "break-word", maxHeight: "3em" }}
                      >
                        {medicalRecordValue.value}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
