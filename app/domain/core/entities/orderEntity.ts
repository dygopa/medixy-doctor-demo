import { IAlly } from "./allyEntity";
import { ILocality } from "./localityEntity";
import { IPatient } from "./patientEntity";
import { IService } from "./serviceEntity";

export interface IOrder {
    orderId: string;
    patientId: string;
    patient?: IPatient | null;
    allyId: string;
    ally?: IAlly | null;
    title: string;
    attentedStatus: string;
    qualification: boolean;
    orderNumber: string;
    comment: string;
    culqiOrderId: string;
    localityId: string;
    locality?: ILocality | null;
    petId: string;
    commercialName: string;
    country: string;
    pointsGenerated: number;
    price: number;
    delivery: number;
    amountApproved: number;
    paymentStatus: string;
    paymentMethod: string;
    quantity: number;
    currency?: string | null;
    serviceId: string;
    service?: IService | null;
    status: string;
    appointmentStatus: string;
    type: string;
    typeMembership: string;
    userName: string;
    userAttented: string;
    videoId: string;
    date: any | null;
    validSince: any | null;
    validUntil: any | null;
    hourAttended: number;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}

