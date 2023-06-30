import { ISubject } from "domain/core/entities/subjectEntity";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { MedicalMeasureFailure } from "domain/core/failures/medicalMeasure/medicalMeasureFailure";
import { MedicalRecordFailure } from "domain/core/failures/medicalRecord/medicalRecordFailure";
import { TreatmentFailure } from "domain/core/failures/treatment/treatmentFailure";
import { IGetMedicalConsultiesResponse } from "domain/core/response/medicalConsultyResponse";
import { IGetMedicalMeasuresResponse } from "domain/core/response/medicalMeasureResponses";
import { IGetMedicalRecordsResponse } from "domain/core/response/medicalRecordResponse";
import { IGetTreatmentsResponse } from "domain/core/response/treatmentResponses";
import { IGetSpecialtiesResponse } from "domain/core/response/specialtiesResponse";
import { SpecialtyFailure } from "domain/core/failures/specialty/specialtyFailure";
import { IGetSubjectRelationsResponse } from "domain/core/response/subjectsResponse";
import { IGetAppointmentResponse } from "domain/core/response/appointmentsResponse";
import { AppointmentFailure } from "domain/core/failures/appointment/appintmentFailure";

export interface IMedicalRecordCreateState {
    subject: IGetSubjectState;
    appointment: IGetAppointmentState;
    specialties: IGetSpecialtiesState;
    medicalMeasures: IGetMedicalMeasuresState;
    medicalConsulties: IGetMedicalConsultiesState;
    treatments: IGetTreatmentsState;
    allergies: IGetAllergiesState;
    medicalRecords: IGetMedicalRecordsState;
    getFederalEntities: IGetFederalEntitiesState;
    editSubject: IUpdateSubjectState;
    companions: IGetCompanionsState;
    createCompanion: ICompanionCreateCompanionState;
    getTreatmentPDF: IGetTratmentPDFState;
    getMedicalConsultyPDF: IGetMedicalConsultyPDFState;
    getMedicalRecordPDF: IGetMedicalRecordPDFState;
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

interface IGetSpecialtiesState {
    data: IGetSpecialtiesResponse;
    loading: boolean;
    successful: boolean;
    error: SpecialtyFailure | null; 
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

interface IGetFederalEntitiesState {
    data: Array<IFederalEntity>;
    loading: boolean;
    successful: boolean;
    error: FederalEntityFailure | null; 
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

export const initialState: IMedicalRecordCreateState = {
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
    specialties: {
        data: {} as IGetSpecialtiesResponse,
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
    getFederalEntities: {
        data: [],
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
}