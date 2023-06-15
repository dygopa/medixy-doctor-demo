import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";

export interface IEditSubjectState {
    subject: IGetSubjectState;
    getFederalEntities: IEditSubjectEditSubjectState;
    editSubject: IUpdateSubjectState;
}

interface IGetSubjectState {
    data: ISubject | null;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure| null; 
}

interface IEditSubjectEditSubjectState {
    data: Array<IFederalEntity>;
    loading: boolean;
    successful: boolean;
    error: FederalEntityFailure| null; 
}

interface IUpdateSubjectState {
    data: boolean;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null;
}

export const initialState: IEditSubjectState = {
    subject: {
        data: null,
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
    }
}