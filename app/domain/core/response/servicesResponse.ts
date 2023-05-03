import { IService } from "../entities/serviceEntity";

export interface IGetServicesResponse {
    data: IService[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
