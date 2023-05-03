import { IProgramCategory } from "domain/core/entities/programCategoryEntity";

export function programCategoryFirebaseToMap(data: any): IProgramCategory {
  return {
    programCategoryId: data?.programCategoryId ?? "",
    parentId: data?.parentId ?? "",
    description: data?.description ?? "",
    icon: data?.icon ?? "",
    level: data?.level ?? 1,
    name: data?.name ?? "",
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
    deletedOn: data?.deletedOn ?? new Date(),
  } as IProgramCategory;
}
