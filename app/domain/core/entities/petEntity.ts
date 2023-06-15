import { ISubject } from "./subjectEntity";

export interface IPet {
    petId: string;
    name: string;
    description: string;
    specie: string;
    breed: string;
    gender: string;
    SubjectId: string;
    Subject?: ISubject | null;
    imageUrl: string;
    birthDate: any | null;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}
