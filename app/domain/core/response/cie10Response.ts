import { ICIE10 } from "../entities/cie10Entity";

export interface IGetCIE10ListResponse {
    data: ICIE10[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

