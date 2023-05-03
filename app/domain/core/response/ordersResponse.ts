import { IOrder } from "../entities/orderEntity";

export interface IGetOrdersResponse {
    data: IOrder[];
    metadata: {
        total: number;
        limit: number | null;
    }
}