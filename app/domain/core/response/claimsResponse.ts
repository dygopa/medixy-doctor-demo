import { IClaim } from "../entities/claimEntity";

export interface IGetClaimsResponse {
    data: IClaim[];
    metadata: {
        total: number;
        limit: number | null;
    }
}