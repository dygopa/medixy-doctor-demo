import { IFederalEntity } from "./federalEntitiesEntity";

export interface IMunicipality {
    id: number;
    catalogId: number;
    name: string;
    federalEntityId: number;
    federalEntity: IFederalEntity;
}