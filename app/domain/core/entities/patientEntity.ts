import { IPoints } from "./pointsEntity";

export interface IPatient {
    patientId: string;
    firstName: string;
    lastName: string;
    user: string;
    url: string;
    genrer: string;
    age: number;
    address: string;
    points: IPoints | null;
    membership: string;
    city: string;
    phoneCountryCode: string;
    email: string;
    profilePictureUrl: string;
    registerComplete: boolean;
    documentNumber: string;
    country: string;
    phoneNumber: string;
    documentType: string;
    personType: string;
    token: string;
    stripeId: string;
    birthDate: any | null;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}

