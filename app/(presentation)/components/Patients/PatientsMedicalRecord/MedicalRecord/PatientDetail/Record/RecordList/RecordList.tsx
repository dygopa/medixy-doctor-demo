import { medicalRecordTypeEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  IMedicalRecord,
  IMedicalRecordValue,
} from "domain/core/entities/medicalRecordEntity";
import { useContext, useEffect } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../../context/MedicalRecordContext";

export default function RecordList() {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getMedicalRecords } = actions;
  const { data: patient } = state.patient;
  const {
    data: medicalRecords,
    loading,
    error,
    successful,
  } = state.medicalRecords;

  const onGetMedicalRecordsDispatch = () => {
    if (patient?.patientId) {
      getMedicalRecords({
        patientId: patient.patientId,
        limit: 6,
      })(dispatch);
    }
  };

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

  if (successful && medicalRecords?.data && medicalRecords.data?.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          El paciente no posee tratamientos.
        </p>
      </div>
    );
  }

  if (!medicalRecords.data) return <div />;

  return (
    <div className="mt-4">
      <div>
        {medicalRecords.data.map((medicalRecord: IMedicalRecord) => (
          <div key={medicalRecord.id} className="flex items-center mb-2">
            <div className="mr-1">
              <p className="text-slate-900 text-md font-medium">
                {medicalRecordTypeEnum[medicalRecord.medicalRecordType.name]}{" "}
                {medicalRecord.medicalRecordValues.length > 0 && "-"}
              </p>
            </div>

            {medicalRecord.medicalRecordValues.length > 0 && (
              <div>
                {medicalRecord.medicalRecordValues.map(
                  (medicalRecordValue: IMedicalRecordValue) => (
                    <p
                      key={medicalRecordValue.id}
                      className="text-slate-900 text-md font-medium overflow-hidden block text-ellipsis"
                      style={{ wordBreak: "break-word", maxHeight: "3em" }}
                    >
                      {medicalRecordValue.value}
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
