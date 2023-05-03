import { IBreed } from "domain/core/entities/breedEntity";

export function breedFirebaseToMap(data: any, breedId: string): IBreed {
  return {
    breedId: breedId,
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
    deletedOn: data?.deletedOn ?? new Date(),
  } as IBreed;
}
