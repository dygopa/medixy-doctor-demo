import { IPoints } from "domain/core/entities/pointsEntity";

export function pointsFirebaseToMap(data: any): IPoints {
  return {
    accumulated: data?.ppAcumulados ?? 0,
    redeemed: data?.ppCanjeados ?? 0,
    generated: data?.ppGenerados ?? 0,
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
    deletedOn: data?.deletedOn ?? new Date(),
  } as IPoints;
}
