import { ISpecie } from "domain/core/entities/specieEntity";

export function specieFirebaseToMap(data: any, specieId: string): ISpecie {
  return {
    specieId: specieId,
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
    deletedOn: data?.deletedOn ?? new Date(),
  } as ISpecie;
}
