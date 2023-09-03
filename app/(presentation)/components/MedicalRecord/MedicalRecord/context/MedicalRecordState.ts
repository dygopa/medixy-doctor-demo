import { ICountriesISO } from "domain/core/entities/countryEntity";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import { AppointmentFailure } from "domain/core/failures/appointment/appintmentFailure";
import { CountryFailure } from "domain/core/failures/country/countryFailure";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { MedicalMeasureFailure } from "domain/core/failures/medicalMeasure/medicalMeasureFailure";
import { MedicalRecordFailure } from "domain/core/failures/medicalRecord/medicalRecordFailure";
import { MunicipalityFailure } from "domain/core/failures/municipality/municipalityFailure";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { TreatmentFailure } from "domain/core/failures/treatment/treatmentFailure";
import { IGetAppointmentResponse } from "domain/core/response/appointmentsResponse";
import { IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import { IGetMedicalConsultiesResponse } from "domain/core/response/medicalConsultyResponse";
import { IGetMedicalMeasuresResponse } from "domain/core/response/medicalMeasureResponses";
import { IGetMedicalRecordsResponse } from "domain/core/response/medicalRecordResponse";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";
import { IGetSubjectRelationsResponse } from "domain/core/response/subjectsResponse";
import { IGetTreatmentsResponse } from "domain/core/response/treatmentResponses";

export interface IMedicalRecordState {
    subject: IGetSubjectState;
    appointment: IGetAppointmentState;
    medicalMeasures: IGetMedicalMeasuresState;
    medicalConsulties: IGetMedicalConsultiesState;
    treatments: IGetTreatmentsState;
    allergies: IGetAllergiesState;
    medicalRecords: IGetMedicalRecordsState;
    orders: IGetOrdersState;
    editSubject: IUpdateSubjectState;
    companions: IGetCompanionsState;
    createCompanion: ICompanionCreateCompanionState;
    editAppointmentStatus: IEditAppointmentStatusState;
    getTreatmentPDF: IGetTratmentPDFState;
    getMedicalConsultyPDF: IGetMedicalConsultyPDFState;
    getMedicalRecordPDF: IGetMedicalRecordPDFState;
    updateAvatar: ISubjectAvatarState;
    getCountriesISO: IGetCountriesISOState;
}

interface IGetSubjectState {
    data: ISubject | null;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

interface IGetAppointmentState {
    data: IGetAppointmentResponse;
    loading: boolean;
    successful: boolean;
    error: AppointmentFailure | null; 
}

interface IGetMedicalMeasuresState {
    data: IGetMedicalMeasuresResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalMeasureFailure | null; 
}

interface IGetMedicalConsultiesState {
    data: IGetMedicalConsultiesResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalConsultyFailure | null; 
}

interface IGetTreatmentsState {
    data: IGetTreatmentsResponse;
    loading: boolean;
    successful: boolean;
    error: TreatmentFailure | null; 
}

interface IGetAllergiesState {
    data: IGetMedicalRecordsResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalRecordFailure | null; 
}

interface IGetMedicalRecordsState {
    data: IGetMedicalRecordsResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalRecordFailure | null; 
}

interface IGetOrdersState {
    data: IGetMedicalRecordsResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalRecordFailure | null; 
}

interface IUpdateSubjectState {
    data: boolean;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null;
}

interface IGetCompanionsState {
    data: IGetSubjectRelationsResponse;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

interface ICompanionCreateCompanionState {
    data: boolean;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null;
}

interface IEditAppointmentStatusState {
    loading: boolean;
    successful: boolean;
    error: AppointmentFailure | null;
}

interface IGetTratmentPDFState {
    loading: boolean;
    successful: boolean;
    error: TreatmentFailure | null;
}

interface IGetMedicalConsultyPDFState {
    loading: boolean;
    successful: boolean;
    error: MedicalConsultyFailure | null;
}

interface IGetMedicalRecordPDFState {
    loading: boolean;
    successful: boolean;
    error: MedicalRecordFailure | null;
}

interface ISubjectAvatarState{
    data: string;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

interface IGetCountriesISOState {
    data: Array<ICountriesISO>;
    loading: boolean;
    successful: boolean;
    error: CountryFailure| null;
  }

export const initialState: IMedicalRecordState = {
    subject: {
        data: null,
        loading: false,
        successful: false,
        error: null,
    },
    appointment: {
        data: {} as IGetAppointmentResponse,
        loading: false,
        successful: false,
        error: null,
    },
    medicalMeasures: {
        data: {} as IGetMedicalMeasuresResponse,
        loading: false,
        successful: false,
        error: null,
    },
    medicalConsulties: {
        data: {} as IGetMedicalConsultiesResponse,
        loading: false,
        successful: false,
        error: null,
    },
    treatments: {
        data: {} as IGetTreatmentsResponse,
        loading: false,
        successful: false,
        error: null,
    },
    allergies: {
        data: {} as IGetMedicalRecordsResponse,
        loading: false,
        successful: false,
        error: null,
    },
    medicalRecords: {
        data: {} as IGetMedicalRecordsResponse,
        loading: false,
        successful: false,
        error: null,
    },
    orders: {
        data: {} as IGetMedicalRecordsResponse,
        loading: false,
        successful: false,
        error: null,
    },
    editSubject: {
        data: false,
        loading: false,
        successful: false,
        error: null,
    },
    companions: {
        data: {} as IGetSubjectRelationsResponse,
        loading: false,
        successful: false,
        error: null,
    },
    createCompanion: {
        data: false,
        loading: false,
        successful: false,
        error: null,
    },
    editAppointmentStatus: {
        loading: false,
        successful: false,
        error: null,
    },
    getTreatmentPDF: {
        loading: false,
        successful: false,
        error: null,
    },
    getMedicalConsultyPDF: {
        loading: false,
        successful: false,
        error: null,
    },
    getMedicalRecordPDF: {
        loading: false,
        successful: false,
        error: null,
    },
    updateAvatar: {
        data: "",
        loading: false,
        successful: false,
        error: null,
    },
    getCountriesISO: {
        data: [],
        loading: false,
        successful: false,
        error: null,
      },
}