import { IService, IServiceCategory } from "../entities/serviceEntity";

export interface IGetServicesResponse {
    data: IService[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface ICreateServiceCategoryResponse {
    data: IServiceCategory;
    metadata: {}
}
