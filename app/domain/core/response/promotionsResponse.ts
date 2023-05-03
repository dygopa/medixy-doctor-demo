import { IPromotion } from "../entities/promotionEntity";

export interface IGetPromotionsResponse {
    data: IPromotion[];
    metadata: {
        total: number;
        limit: number | null;
    }
}