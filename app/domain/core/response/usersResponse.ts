import { IUser } from "../entities/userEntity";

export interface IGetUsersResponse {
    data: IUser[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
