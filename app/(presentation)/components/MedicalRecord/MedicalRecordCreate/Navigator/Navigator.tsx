import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../context/MedicalRecordCreateContext";
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

interface INavigatorProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

export default function Navigator({
  setIsOpen,
  setPopupSectionActive,
}: INavigatorProps) {
  const { state } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { data: subject } = state.subject;
  const { data: appointment } = state.appointment;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const getRedirectMedicalRecordCreate = () => {
    if (appointment.data?.id) {
      return (
        MedicalRecordRoutesEnum.MedicalRecord +
        appointment.data.id +
        MedicalRecordRoutesEnum.MedicalRecordCreate +
        MedicalRecordRoutesEnum.MedicalRecordCreateSummary +
        "?type=appointment"
      );
    }

    return (
      MedicalRecordRoutesEnum.MedicalRecord +
      subject?.subjectId +
      MedicalRecordRoutesEnum.MedicalRecordCreate +
      MedicalRecordRoutesEnum.MedicalRecordCreateSummary
    );
  };

  const getRedirectMedicalRecordCreateWithErrors = (queryErrors: string) => {
    if (appointment.data?.id) {
      return (
        MedicalRecordRoutesEnum.MedicalRecord +
        appointment.data.id +
        MedicalRecordRoutesEnum.MedicalRecordCreate +
        `?${queryErrors}&type=appointment`
      );
    }

    return (
      MedicalRecordRoutesEnum.MedicalRecord +
      subject?.subjectId +
      MedicalRecordRoutesEnum.MedicalRecordCreate +
      `?${queryErrors}`
    );
  };

  const validateDiagnosis = (values: any) => {
    let errors = {
      diagnose: false,
      diagnosisCount: 0,
    };

    errors = {
      ...errors,
      diagnose: values.diagnose.length === 0 ? true : false,
      diagnosisCount:
        values.diagnose.length === 0
          ? errors.diagnosisCount + 1
          : errors.diagnosisCount,
    };

    return errors;
  };

  const validateCurrentConsultation = (values: any) => {
    let errors = {
      consultationDate: false,
      consultationReason: false,
      currentConsultationCount: 0,
    };

    errors = {
      ...errors,
      consultationDate: handleConsultationDateErrors(values.consultationDate),
      currentConsultationCount: handleConsultationDateErrors(
        values.consultationDate
      )
        ? errors.currentConsultationCount + 1
        : errors.currentConsultationCount,
    };

    errors = {
      ...errors,
      consultationReason: handleConsultationReasonErrors(
        values.consultationReason
      ),
      currentConsultationCount: handleConsultationReasonErrors(
        values.consultationReason
      )
        ? errors.currentConsultationCount + 1
        : errors.currentConsultationCount,
    };

    return errors;
  };

  const validateVitalSigns = (values: any) => {
    let errors = {
      size: false,
      weight: false,
      temperature: false,
      respiratoryFrequency: false,
      oximetry: false,
      muscleMass: false,
      glicemy: false,
      vitalSignsCount: 0,
    };

    errors = {
      ...errors,
      size: handleSizeErrors(values.size),
      vitalSignsCount: handleSizeErrors(values.size)
        ? errors.vitalSignsCount + 1
        : errors.vitalSignsCount,
    };

    errors = {
      ...errors,
      weight: handleWeightErrors(values.weight),
      vitalSignsCount: handleWeightErrors(values.weight)
        ? errors.vitalSignsCount + 1
        : errors.vitalSignsCount,
    };

    errors = {
      ...errors,
      temperature: handleTemperatureErrors(values.temperature),
      vitalSignsCount: handleTemperatureErrors(values.temperature)
        ? errors.vitalSignsCount + 1
        : errors.vitalSignsCount,
    };

    errors = {
      ...errors,
      respiratoryFrequency: handleRespiratoryFrequencyErrors(
        values.respiratoryFrequency
      ),
      vitalSignsCount: handleRespiratoryFrequencyErrors(
        values.respiratoryFrequency
      )
        ? errors.vitalSignsCount + 1
        : errors.vitalSignsCount,
    };

    errors = {
      ...errors,
      oximetry: handleOximetryErrors(values.oximetry),
      vitalSignsCount: handleOximetryErrors(values.oximetry)
        ? errors.vitalSignsCount + 1
        : errors.vitalSignsCount,
    };

    errors = {
      ...errors,
      muscleMass: handleMuscleMassErrors(values.muscleMass),
      vitalSignsCount: handleMuscleMassErrors(values.muscleMass)
        ? errors.vitalSignsCount + 1
        : errors.vitalSignsCount,
    };

    errors = {
      ...errors,
      glicemy: handleGlicemyErrors(values.glicemy),
      vitalSignsCount: handleGlicemyErrors(values.glicemy)
        ? errors.vitalSignsCount + 1
        : errors.vitalSignsCount,
    };

    return errors;
  };

  const validateForm = (values: any) => {
    let currentConsultationErrors = {};
    let diagnosisErrors = {};
    let vitalSignsErrors = {};

    currentConsultationErrors = validateCurrentConsultation(
      values.currentConsultation
    );
    diagnosisErrors = validateDiagnosis(values.currentConsultation);
    vitalSignsErrors = validateVitalSigns(values.vitalSigns);

    return { currentConsultationErrors, diagnosisErrors, vitalSignsErrors };
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

    const {
      currentConsultationErrors,
      diagnosisErrors,
      vitalSignsErrors,
    }: any = validateForm(valuesStorage);

    let queryErrors = "";

    if (currentConsultationErrors.currentConsultationCount > 0) {
      queryErrors = queryErrors + `currentConsultationExpanded=true&`;

      Object.entries(currentConsultationErrors).map(([key, val]) => {
        if (val) queryErrors = queryErrors + `${key}=${val}&`;
      });
    }

    if (diagnosisErrors.diagnosisCount > 0) {
      queryErrors = queryErrors + `diagnose=true&`;

      Object.entries(diagnosisErrors).map(([key, val]) => {
        if (val) queryErrors = queryErrors + `${key}=${val}&`;
      });
    }

    if (vitalSignsErrors.vitalSignsCount > 0) {
      queryErrors = queryErrors + `vitalSignsExpanded=true&`;

      Object.entries(vitalSignsErrors).map(([key, val]) => {
        if (val) queryErrors = queryErrors + `${key}=${val}&`;
      });
    }

    if (queryErrors.length > 0) {
      router.push(getRedirectMedicalRecordCreateWithErrors(queryErrors));
      setShowAlertError(true);
      setIsLoading(false);

      setTimeout(() => {
        setShowAlertError(false);
      }, 5000);
      return;
    }

    saveValuesInLocalStorage();

    router.push(getRedirectMedicalRecordCreate());
  };

  return (
    <>
      <div className="w-full md:flex justify-between items-center sticky top-[67px] z-[97]  bg-slate-100 py-2 md:pb-0">
        <div className="md:w-[50%]">
          <h2 className="lg:mr-5 text-2xl font-bold truncate py-3">
            Nueva consulta
          </h2>
          {/*<p className="font-light text-slate-500 text-base my-3">
            Información detallada del expediente del paciente
          </p>*/}
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <Button
            variant="outline-primary"
            disabled={isLoading}
            onClick={() => {
              setPopupSectionActive(0);
              setIsOpen(true);
            }}
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
    </>
  );
}
