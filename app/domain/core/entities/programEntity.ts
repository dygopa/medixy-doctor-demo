import { IProgramActivity } from "./programActivityEntity";
import { IProgramCategory } from "./programCategoryEntity";

export interface IProgramFeatures {}

export interface IProgramPrice {
    price: number;
    currency: string;
    country: string;
}

export interface IProgramLang {
    langId: string;
    langCode: string;
    programId: string;
    name: string;
    description: string;
    createdAt: any | null;
}

export interface IProgram {
    programId: string;
    programCategoryId: string;
    programCategory?: IProgramCategory | null;
    programActivities: IProgramActivity[];
    name: string;
    status: string;
    videoUrl: string;
    description: string;
    isThereValidityConstraint: boolean;
    validityStartDate: any | null;
    validityEndDate: any | null;
    contractType: string;
    prices: IProgramPrice[],
    tags: string[];
    isDefault: boolean;
    features: IProgramFeatures;
    isDelete: boolean;
    createdOn: any | null;
    updatedOn: any | null;
}
