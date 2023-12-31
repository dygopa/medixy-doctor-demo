import { IDiagnosis } from "./diagnosis";
import { IMedicalMeasure } from "./medicalMeasureEntity";
import { IMedicalRecord } from "./medicalRecordEntity";
import { ISubject } from "./subjectEntity";
import { ITreatment } from "./treatmentEntity";

export interface IMedicalConsulty {
    id: number;
    subjectId: number;
    subject: ISubject;
    doctorId: number;
    consultationDate: Date;
    consultationReason: string;
    referrerBy?: string | null;
    sufferingDate?: Date | null;
    generalInspection?: string | null;
    respiratorySystem?: string | null;
    digestiveSystem?: string | null;
    cardiovascularSystem?: string | null;
    reproductiveSystem?: string | null;
    urinarySystem?: string | null;
    ophthalmologicalSystem?: string | null;
    locomotorSystem?: string | null;
    earInspection?: string | null;
    neurologicalInspection?: string | null;
    skinInspection?: string | null;
    diagnose?: IDiagnosis[];
    observations?: string | null;
    medicalMeasures?: IMedicalMeasure[];
    treatments?: ITreatment[];
    medicalRecords?: IMedicalRecord[];
    medicalConsultyImages?: IMedicalConsultyImage[];
    createdOn: Date;
    updatedOn: Date | null;
    deletedOn: Date | null;
}


export interface IMedicalConsultyImage {
    id: number;
    url: string;
    description?: string | null;
    medicalConsultyId: number; 
    file?: { data: string, type: string }; 
}
