import { ITip } from "../entities/tipEntity";

export interface IGetTipsResponse {
    data: ITip[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
