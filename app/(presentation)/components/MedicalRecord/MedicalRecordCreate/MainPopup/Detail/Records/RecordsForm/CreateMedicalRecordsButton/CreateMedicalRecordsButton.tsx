import { getMedicalRecordsHistory } from "(presentation)/(helper)/medicalRecords/medicalRecordsHelper";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "(presentation)/components/MedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { valuesTypes } from "../RecordsForm";

interface ICreateMedicalRecordsButtonProps {
  values: valuesTypes;
  setShowRecordsForm: Dispatch<SetStateAction<boolean>>;
}

export default function CreateMedicalRecordsButton({
  values,
  setShowRecordsForm,
}: ICreateMedicalRecordsButtonProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { createMedicalRecords, createMedicalRecordsInitialState } = actions;
  const { data: subject } = state.subject;
  const { loading, error, successful } = state.createMedicalRecords;

  const [isLoading, setIsLoading] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getMedicalRecords = (valuesRecords: any) => {
    let medicalRecordsList: IMedicalRecord[] = [];

    const medicalRecordsHistory = getMedicalRecordsHistory(
      valuesRecords,
      subject?.subjectId ?? 0
    );

    if (medicalRecordsHistory.length > 0) {
      medicalRecordsList.push(...medicalRecordsHistory);
    }

    return medicalRecordsList;
  };

  const onCreateMedicalRecords = () => {
    setIsLoading(true);

    const medicalRecords = getMedicalRecords(values);

    if (medicalRecords.length > 0) {
      createMedicalRecords({
        medicalRecords,
      })(dispatch);
    }
  };

  useEffect(() => {
    if (successful) {
      setShowAlertSuccess(true);

      setTimeout(() => {
        createMedicalRecordsInitialState()(dispatch);
        setShowAlertSuccess(false);
        setShowRecordsForm(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  const onShowAlertError = () => {
    setShowAlertError(true);

    setTimeout(() => {
      setShowAlertError(false);
      setAlertMessage("");
    }, 3000);
  };

  useEffect(() => {
    if (error) {
      setAlertMessage(
        "Algo ha salido mal al intentar guardar los antecedentes. Vuelve a intentarlo."
      );
      onShowAlertError();
    }
  }, [error]);

  return (
    <>
      <AlertComponent
        variant="error"
        show={showAlertError}
        description={alertMessage}
      />

      <AlertComponent
        variant="success"
        show={showAlertSuccess}
        description="¡Se han guardado los antecedentes éxitosamente!"
      />

      <Button
        disabled={isLoading || loading}
        variant="primary"
        onClick={() => onCreateMedicalRecords()}
      >
        Guardar
      </Button>
    </>
  );
}
