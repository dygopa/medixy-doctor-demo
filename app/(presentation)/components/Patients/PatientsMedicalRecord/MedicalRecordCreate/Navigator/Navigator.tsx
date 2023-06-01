import {
  PatientsMedicalRecordRoutesEnum,
  PatientsRoutesEnum,
} from "(presentation)/(routes)/patientsRoutes";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../context/MedicalRecordCreateContext";
import UserMainPopup from "./UserMainPopup/UserMainPopup";
import {
  handleConsultationDateErrors,
  handleConsultationReasonErrors,
  handleGlicemyErrors,
  handleMuscleMassErrors,
  handleOximetryErrors,
  handleRespiratoryFrequencyErrors,
  handleSizeErrors,
  handleTemperatureErrors,
  handleWeightErrors,
} from "./Validators/Validators";

export default function Navigator() {
  const { state } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { data: patient } = state.patient;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const validateCurrentConsultation = (values: any) => {
    let errors = {
      consultationDate: false,
      consultationReason: false,
      diagnose: false,
      size: false,
      weight: false,
      temperature: false,
      respiratoryFrequency: false,
      oximetry: false,
      muscleMass: false,
      glicemy: false,
      count: 0,
    };

    errors = {
      ...errors,
      consultationDate: handleConsultationDateErrors(values.consultationDate),
      count: handleConsultationDateErrors(values.consultationDate)
        ? errors.count + 1
        : errors.count,
    };

    errors = {
      ...errors,
      consultationReason: handleConsultationReasonErrors(
        values.consultationReason
      ),
      count: handleConsultationReasonErrors(values.consultationReason)
        ? errors.count + 1
        : errors.count,
    };

    errors = {
      ...errors,
      size: handleSizeErrors(values.size),
      count: handleSizeErrors(values.size) ? errors.count + 1 : errors.count,
    };

    errors = {
      ...errors,
      weight: handleWeightErrors(values.weight),
      count: handleWeightErrors(values.weight)
        ? errors.count + 1
        : errors.count,
    };

    errors = {
      ...errors,
      temperature: handleTemperatureErrors(values.temperature),
      count: handleTemperatureErrors(values.temperature)
        ? errors.count + 1
        : errors.count,
    };

    errors = {
      ...errors,
      respiratoryFrequency: handleRespiratoryFrequencyErrors(
        values.respiratoryFrequency
      ),
      count: handleRespiratoryFrequencyErrors(values.respiratoryFrequency)
        ? errors.count + 1
        : errors.count,
    };

    errors = {
      ...errors,
      oximetry: handleOximetryErrors(values.oximetry),
      count: handleOximetryErrors(values.oximetry)
        ? errors.count + 1
        : errors.count,
    };

    errors = {
      ...errors,
      muscleMass: handleMuscleMassErrors(values.muscleMass),
      count: handleMuscleMassErrors(values.muscleMass)
        ? errors.count + 1
        : errors.count,
    };

    errors = {
      ...errors,
      glicemy: handleGlicemyErrors(values.glicemy),
      count: handleGlicemyErrors(values.glicemy)
        ? errors.count + 1
        : errors.count,
    };

    errors = {
      ...errors,
      diagnose: values.diagnose.length === 0 ? true : false,
      count: values.diagnose.length === 0 ? errors.count + 1 : errors.count,
    };

    return errors;
  };

  const validateForm = (values: any) => {
    let currentConsultationErrors = {};

    currentConsultationErrors = validateCurrentConsultation(values);

    return { currentConsultationErrors };
  };

  const setValuesFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    return valuesJSON;
  };

  const saveValuesInLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    let valuesJSON = JSON.parse(valuesStorage ?? "");

    let isValid = valuesJSON.isValid;
    isValid = true;

    valuesJSON.isValid = isValid;

    localStorage.setItem(
      "prosit.storage.medical-record-create",
      JSON.stringify(valuesJSON)
    );
  };

  const onCreateMedicalRecord = () => {
    setIsLoading(true);

    const valuesStorage = setValuesFromLocalStorage();

    const { currentConsultationErrors }: any = validateForm(
      valuesStorage.currentConsultation
    );

    let queryErrors = "";

    if (currentConsultationErrors.count > 0) {
      queryErrors = queryErrors + `currentConsultationExpanded=true&`;

      Object.entries(currentConsultationErrors).map(([key, val]) => {
        if (val) queryErrors = queryErrors + `${key}=${val}&`;
      });
    }

    if (queryErrors.length > 0) {
      router.push(
        PatientsRoutesEnum.PatientsView +
          patient?.patientId +
          PatientsMedicalRecordRoutesEnum.MedicalRecord +
          PatientsMedicalRecordRoutesEnum.MedicalRecordCreate +
          `?${queryErrors}`
      );
      setShowAlertError(true);
      setIsLoading(false);

      setTimeout(() => {
        setShowAlertError(false);
      }, 5000);
      return;
    }

    saveValuesInLocalStorage();

    router.push(
      PatientsRoutesEnum.PatientsView +
        patient?.patientId +
        PatientsMedicalRecordRoutesEnum.MedicalRecord +
        PatientsMedicalRecordRoutesEnum.MedicalRecordCreate +
        PatientsMedicalRecordRoutesEnum.MedicalRecordCreateSummary
    );
  };

  return (
    <>
      <div className="w-full lg:flex justify-between items-center sticky top-[67px] z-[97]  bg-slate-100 pt-2">
        <div className="lg:w-[50%]">
          <h2 className="lg:mr-5 text-2xl font-bold truncate">
            Nueva consulta
          </h2>
          <p className="font-light text-slate-500 text-base my-3">
            Información detallada del expediente del paciente
          </p>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline-primary"
            disabled={isLoading}
            onClick={() => setIsOpen(true)}
            className="mr-4  px-5"
          >
            <i className="fa-solid fa-user text-xl" />
          </Button>

          <Button
            variant="primary"
            disabled={isLoading}
            onClick={() => onCreateMedicalRecord()}
          >
            {isLoading ? "Generando resumen..." : "Crear consulta"}
          </Button>
        </div>
      </div>

      <AlertComponent
        variant="error"
        show={showAlertError}
        description="Debes completar la información requerida para generar un resumen de la consulta"
      />

      <UserMainPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
