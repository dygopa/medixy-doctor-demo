import { ISpecialty } from "../entities/specialtyEntity";

export interface IGetSpecialtiesResponse {
    data: ISpecialty[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface IGetSpecialtyResponse {
    data: ISpecialty;
    metadata: {}
}

export interface ICreateSpecialtyResponse {
    data: ISpecialty;
    metadata: {}
}
