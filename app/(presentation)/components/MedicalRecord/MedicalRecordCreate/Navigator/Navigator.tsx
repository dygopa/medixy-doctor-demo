import { MedicalMeasureTypesEnum } from "(presentation)/(enum)/medicalMeasure/medicalMeasureEnums";
import {
  TreatmentDosisTypeEnum,
  TreatmentViaDosisEnum,
} from "(presentation)/(enum)/treatment/treatmentEnums";
import {
  getMedicalRecordsHistory,
  getMedicalRecordsOrders,
  getMedicalRecordsPhysical,
} from "(presentation)/(helper)/medicalRecords/medicalRecordsHelper";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { IDiagnosis } from "domain/core/entities/diagnosis";
import {
  IMedicalConsulty,
  IMedicalConsultyImage,
} from "domain/core/entities/medicalConsultyEntity";
import {
  IMedicalMeasure,
  IMedicalMeasureType,
} from "domain/core/entities/medicalMeasureEntity";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import {
  ITreatment,
  ITreatmentMedicine,
} from "domain/core/entities/treatmentEntity";
import { IUser } from "domain/core/entities/userEntity";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../context/MedicalRecordCreateContext";
import ConfirmModal from "./ConfirmModal/ConfirmModal";
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
  user: IUser;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

export default function Navigator({
  user,
  setIsOpen,
  setPopupSectionActive,
}: INavigatorProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { createMedicalConsulty } = actions;
  const { data: subject } = state.subject;
  const { data: appointment } = state.appointment;
  const {
    data: medicalConsulty,
    loading,
    error,
    successful,
  } = state.createMedicalConsulty;

  const router = useRouter();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getRedirectMedicalRecordCreate = () => {
    if (appointment.data?.id) {
      return (
        MedicalRecordRoutesEnum.MedicalRecord +
        appointment.data.id +
        MedicalRecordRoutesEnum.MedicalRecordCreate +
        MedicalRecordRoutesEnum.MedicalRecordCreateSummary +
        `?type=appointment&medical_consulty_id=${medicalConsulty.data.id}`
      );
    }

    return (
      MedicalRecordRoutesEnum.MedicalRecord +
      subject?.subjectId +
      MedicalRecordRoutesEnum.MedicalRecordCreate +
      MedicalRecordRoutesEnum.MedicalRecordCreateSummary +
      `?medical_consulty_id=${medicalConsulty.data.id}`
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

  const onValidateForm = (valuesStorage: any) => {
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
      setAlertMessage(
        "Debes completar la información requerida para generar un resumen de la consulta"
      );
      setShowAlertError(true);
      setIsLoading(false);

      setTimeout(() => {
        setShowAlertError(false);
        setAlertMessage("");
      }, 5000);
      return false;
    }

    return true;
  };

  const getMedicalMeasures = (values: any): IMedicalMeasure[] => {
    const medicalMeasures: IMedicalMeasure[] = [];

    if (values.vitalSigns.size?.length > 0) {
      const medicalMeasureSize: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.size),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.SIZE,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureSize);
    }

    if (values.vitalSigns.weight?.length > 0) {
      const medicalMeasureWeight: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.weight),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.WEIGHT,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureWeight);
    }

    if (values.vitalSigns.temperature?.length > 0) {
      const medicalMeasureTemperature: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.temperature),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.TEMPERATURE,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureTemperature);
    }

    if (values.vitalSigns.respiratoryFrequency?.length > 0) {
      const medicalMeasureRespiratoryFrequency: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.respiratoryFrequency),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.RESPIRATORY_FREQUENCY,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureRespiratoryFrequency);
    }

    if (values.vitalSigns.oximetry?.length > 0) {
      const medicalMeasureOximetry: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.oximetry),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.OXIMETRY,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureOximetry);
    }

    if (values.vitalSigns.muscleMass?.length > 0) {
      const medicalMeasureMuscleMass: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.muscleMass),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.MUSCLE_MASS_INDEX,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureMuscleMass);
    }

    if (values.vitalSigns.glicemy?.length > 0) {
      const medicalMeasureGlicemy: IMedicalMeasure = {
        id: 0,
        value: parseFloat(values.vitalSigns.glicemy),
        medicalMeasureTypeId: 0,
        medicalMeasureType: {
          id: 0,
          type: MedicalMeasureTypesEnum.GLICEMY,
          createdOn: new Date(),
        } as IMedicalMeasureType,
        subjectId: subject?.subjectId ?? 0,
        createdOn: new Date(),
      };

      medicalMeasures.push(medicalMeasureGlicemy);
    }

    return medicalMeasures;
  };

  const getDiagnosis = (values: any) => {
    if (values?.diagnose?.length === 0) return;

    let diagnoses: IDiagnosis[] = [];

    values.diagnose.forEach((cie10: ICIE10) => {
      let diagnosis: IDiagnosis = {
        id: 0,
        description: cie10.description4,
        cie10Id: cie10.id,
        medicalConsultyId: 0,
        isPrincipal: cie10.isPrincipal,
      };
      diagnoses.push(diagnosis);
    });
    return diagnoses;
  };

  const getTreatment = (values: any) => {
    if (values?.recipes?.length === 0) return;

    let treatment: ITreatment = {
      id: 0,
      status: 1,
      subjectId: subject?.subjectId ?? 0,
      medicalConsultyId: 0,
      treatmentMedicines: [],
      reference: "",
    };

    const treatmentMedicines: ITreatmentMedicine[] = [];

    values.recipes.forEach((recipe: any) => {
      const treatmentMedicine: ITreatmentMedicine = {
        id: 0,
        viaDosis:
          recipe?.via?.length > 0
            ? parseInt(recipe.via, 10)
            : TreatmentViaDosisEnum.ORAL,
        medicine: recipe.medicine,
        dosisQuantity: recipe.quantity,
        dosisType:
          recipe?.unit?.length > 0
            ? parseInt(recipe.unit, 10)
            : TreatmentDosisTypeEnum.CAPSULE,
        takeUntilMeasure: recipe.duringMeasure,
        takeUntilValue:
          recipe?.duringValue > 0 ? parseInt(recipe.duringValue) : 0,
        takeEachMeasure: recipe.frequencyMeasure,
        takeEachValue:
          recipe?.frequencyValue > 0 ? parseInt(recipe.frequencyValue) : 0,
        createdOn: new Date(),
        treatmentId: 0,
        status: 1,
        observations: recipe?.indication ?? "",
      };

      treatmentMedicines.push(treatmentMedicine);
    });

    treatment.treatmentMedicines = treatmentMedicines;

    return treatment;
  };

  const getMedicalRecords = (values: any) => {
    const medicalRecords: IMedicalRecord[] = [];

    const medicalRecordsHistory = getMedicalRecordsHistory(
      values.records,
      subject?.subjectId ?? 0
    );

    if (medicalRecordsHistory.length > 0) {
      medicalRecords.push(...medicalRecordsHistory);
    }

    const medicalRecordsPhysical = getMedicalRecordsPhysical(
      values.physical,
      subject?.subjectId ?? 0
    );

    if (medicalRecordsPhysical.length > 0) {
      medicalRecords.push(...medicalRecordsPhysical);
    }

    const medicalRecordsOrders = getMedicalRecordsOrders(
      values.orders,
      subject?.subjectId ?? 0
    );

    if (medicalRecordsOrders.length > 0) {
      medicalRecords.push(...medicalRecordsOrders);
    }

    return medicalRecords;
  };

  const getMedicalConsultyImages = (values: any) => {
    const medicalConsultyImages: IMedicalConsultyImage[] = [];

    if (values && values.images && values.images.length > 0) {
      values.images.forEach((image: any) => {
        medicalConsultyImages.push(image as IMedicalConsultyImage);
      });
    }

    return medicalConsultyImages;
  };

  const onCreateMedicalRecord = () => {
    setIsLoading(true);

    const values = setValuesFromLocalStorage();

    const isValid = onValidateForm(values);

    if (isValid) {
      saveValuesInLocalStorage();

      const medicalMeasures = getMedicalMeasures(values);

      const treatment = getTreatment(values);

      const diagnoses = getDiagnosis(values.currentConsultation);

      const medicalRecords = getMedicalRecords(values);

      const medicalConsultyImages = getMedicalConsultyImages(values);

      const medicalConsulty: IMedicalConsulty = {
        id: 0,
        doctorId: user.userId ? parseInt(user.userId, 10) : 0,
        consultationDate: values.currentConsultation.consultationDate
          ? new Date(
              new Date(
                values.currentConsultation.consultationDate
              ).getFullYear(),
              new Date(values.currentConsultation.consultationDate).getMonth(),
              new Date(values.currentConsultation.consultationDate).getDate() +
                1
            )
          : new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() + 1
            ),
        consultationReason: values.currentConsultation.consultationReason,
        referrerBy:
          values.currentConsultation.referredBy.length > 0
            ? values.currentConsultation.referredBy
            : null,
        sufferingDate: values.currentConsultation.sufferingDate
          ? new Date(
              new Date(values.currentConsultation.sufferingDate).getFullYear(),
              new Date(values.currentConsultation.sufferingDate).getMonth(),
              new Date(values.currentConsultation.sufferingDate).getDate() + 1,
              0,
              0,
              0,
              0
            )
          : null,
        diagnose: diagnoses ?? [],
        observations:
          values.currentConsultation.observations.length > 0
            ? values.currentConsultation.observations
            : null,
        medicalMeasures: medicalMeasures,
        medicalRecords: medicalRecords,
        treatments: treatment ? [treatment] : [],
        createdOn: new Date(),
        updatedOn: null,
        deletedOn: null,
        subjectId: subject?.subjectId ?? 0,
        subject: subject ?? ({} as ISubject),
        medicalConsultyImages: medicalConsultyImages,
      };

      createMedicalConsulty({
        medicalConsulty: medicalConsulty,
        appointmentId: appointment.data?.id ? appointment.data.id : null,
      })(dispatch);
    }
  };

  const onShowAlertError = () => {
    setShowAlertError(true);

    setTimeout(() => {
      setShowAlertError(false);
      setAlertMessage("");
    }, 3000);
  };

  const onCreateMedicalConsultySucessful = () => {
    localStorage.removeItem("prosit.storage.medical-record-create");

    setTimeout(() => {
      router.push(getRedirectMedicalRecordCreate());
    }, 2000);
  };

  useEffect(() => {
    if (successful) onCreateMedicalConsultySucessful();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useEffect(() => {
    if (error) {
      setAlertMessage(
        "Algo ha salido mal al intentar guardar la consulta. Vuelve a intentarlo."
      );
      onShowAlertError();
    }
  }, [error]);

  return (
    <>
      {showConfirmModal && (
        <div
          className={twMerge([
            "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
            showConfirmModal ? "visible" : "hidden",
          ])}
        >
          <ConfirmModal
            setShowConfirmModal={setShowConfirmModal}
            onCreateMedicalRecord={onCreateMedicalRecord}
          />
        </div>
      )}

      <div className="w-full md:flex justify-between items-center sticky top-[67px] z-[69]  bg-slate-100 py-2 md:pb-0">
        <div className="md:w-[50%] lg:mb-0 mb-4">
          <h2 className="lg:mr-5 text-2xl font-bold truncate mb-2">
            Nueva Consulta
          </h2>
          <p className="font-normal text-slate-500 text-lg">
            Doctor {user?.names} {user?.firstName}
          </p>
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
            disabled={isLoading || loading || successful}
            onClick={() => setShowConfirmModal(true)}
          >
            {isLoading ? "Finalizando consulta..." : "Finalizar consulta"}
          </Button>
        </div>
      </div>

      <AlertComponent
        variant="error"
        show={showAlertError}
        description={alertMessage}
      />

      <AlertComponent
        variant="success"
        show={successful}
        description="¡Se ha guardado la consulta éxitosamente!"
      />
    </>
  );
}
