import { ILocality } from "./localityEntity";
import { IPoints } from "./pointsEntity";

export interface IAlly {
    allyId: string;
    code: string;
    profilePictureUrl: string;
    welcome: boolean;
    refferCode: string;
    countRatings: number;
    delivery: number;
    address: string;
    email: string;
    companyEmail: string;
    localityId: string;
    locality?: ILocality | null;
    identify: string;
    isApproved: boolean;
    speciality: string;
    workingWith: string;
    certified: string;
    points: IPoints | null;
    name: string;
    commercialName: string;
    membership: string;
    professionalBlank: string;
    country: string;
    role: string;
    status: string;
    phoneNumber: string;
    presentationText: string;
    type: string;
    companyType: string;
    token: string;
    totalRatings: number;
    adminAttented: string;
    odooCompanyId: string;
    odooName: string;
    lockedDays: number;
    closeDate: any | null;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}

export interface IAllyType {
    allyType: string;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}
