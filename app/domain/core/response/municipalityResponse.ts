import { IMunicipality } from "../entities/municipalityEntity";

export interface IGetMunicipalitiesResponse {
    data: IMunicipality[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
