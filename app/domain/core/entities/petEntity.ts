import { IPatient } from "./patientEntity";

export interface IPet {
    petId: string;
    name: string;
    description: string;
    specie: string;
    breed: string;
    gender: string;
    patientId: string;
    patient?: IPatient | null;
    imageUrl: string;
    birthDate: any | null;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}
