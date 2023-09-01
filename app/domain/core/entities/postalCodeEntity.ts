import { IFederalEntity } from "./federalEntitiesEntity";
import { IMunicipality } from "./municipalityEntity";

export interface IPostalCode {
    id: number;
    catalogId: number;
    postalCode: string;
    settlement: string;
    federalEntityId: number;
    federalEntity: IFederalEntity;
    municipality: IMunicipality;
}