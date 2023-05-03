import { IContent } from "../entities/contentEntity";

export interface IGetContentsResponse {
    data: IContent[];
    metadata: {
        total: number;
        limit: number | null;
    }
}