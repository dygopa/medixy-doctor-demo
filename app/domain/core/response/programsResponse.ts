import { IProgramActivity } from "../entities/programActivityEntity";
import { IProgramCategory } from "../entities/programCategoryEntity";
import { IProgram } from "../entities/programEntity";

export interface IGetProgramsResponse {
    data: IProgram[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface IGetProgramsActivitiesResponse {
    data: IProgramActivity[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface IGetProgramCategoriesResponse {
    data: IProgramCategory[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
