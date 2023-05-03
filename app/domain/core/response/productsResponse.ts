import { IProduct } from "../entities/productEntity";

export interface IGetProductsResponse {
    data: IProduct[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
