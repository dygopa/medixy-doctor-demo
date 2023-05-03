import { ICallToAction } from "./callToActionEntity";

export interface ITipFeatures {
    
}

export interface ITipAnalytic {
    tipAnalyticId: string;
    tipsCount: number;
    features: ITipFeatures;
    createdOn: any | null;
    updatedOn: any | null;
}

export interface ITip {
    tipId: string;
    index: number;
    status: string;
    title: string;
    description: string;
    mainProgramCategoryId: string;
    programCategoryId: string;
    type: string;
    callToActions: ICallToAction[];
    repeatPost: boolean;
    features: ITipFeatures;
    analytic?: ITipAnalytic | null;
    isDelete: boolean;
    date: any | null;
    createdOn: any | null;
    updatedOn: any | null;
}

