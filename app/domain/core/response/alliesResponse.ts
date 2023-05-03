import { IAlly, IAllyType } from "../entities/allyEntity";

export interface IGetAlliesResponse {
    data: IAlly[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface IGetAlliesTypesResponse {
    data: IAllyType[];
    metadata: {
        total: number;
        limit: number | null;
    }
}