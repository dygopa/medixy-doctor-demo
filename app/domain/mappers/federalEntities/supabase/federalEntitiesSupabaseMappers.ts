import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";

export function federalEntitySupabaseToMap (data:any): IFederalEntity {
    return {
        entityId: data?.id ?? 0,
        nameEntity: data?.nombre ?? "",
        abbrevation: data?.abreviatura ?? "",
    } as IFederalEntity
}