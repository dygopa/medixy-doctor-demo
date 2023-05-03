import { IAlly } from "./allyEntity";

export interface IPromotion {
    promotionId: string;
    allyId: string;
    ally?: IAlly | null;
    hasSchedule: boolean;
    scheduleType: string;
    status: string;
    quantity: number;
    quantityDays: number;
    conditions: string;
    quotas: number;
    delivery: boolean;
    description: string;
    house: boolean;
    isApproved: boolean;
    localityId: boolean;
    country: string;
    weight?: number | null;
    price: number;
    currency?: string | null;
    type: string;
    title: string;
    validSince: any | null;
    validUntil: any | null;
    imageUrl: string;
    adminAttended: string;
    closeDate: any | null;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}

