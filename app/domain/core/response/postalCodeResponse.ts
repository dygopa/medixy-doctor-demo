import { IPostalCode } from "../entities/postalCodeEntity";

export interface IGetPostalCodesResponse {
    data: IPostalCode[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface IGetPostalCodeResponse {
    data: IPostalCode;
    metadata: {}
}
