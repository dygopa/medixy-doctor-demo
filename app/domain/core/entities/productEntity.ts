import { IAlly } from "./allyEntity";
import { ILocality } from "./localityEntity";

export interface IProduct {
    productId: string;
    allyId: string;
    ally?: IAlly | null;
    localityId: string;
    locality?: ILocality | null;
    quantity: number;
    category: string;
    barCode: string;
    continueBuying: boolean;
    delivery: boolean;
    description: string;
    managed: string;
    age: string;
    minExists: string;
    isApproved: boolean;
    brand: string;
    country: string;
    keywords: string[];
    weight: string;
    weightUnit: string;
    weightValue: string;
    price: number;
    currency?: string | null;
    presentation: string;
    sku: string;
    status: string;
    petType: string;
    title: string;
    imageUrl: string;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}

