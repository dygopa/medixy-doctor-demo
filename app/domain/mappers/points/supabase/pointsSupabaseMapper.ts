import { IPoints } from "domain/core/entities/pointsEntity";

export function pointsSupabaseToMap(data: any): IPoints {
  return {
    accumulated: data?.puntosAcumulados ?? 0,
    redeemed: data?.puntosCanjeados ?? 0,
    generated: data?.puntosGenerados ?? 0,
    createdOn: data?.fechaCreacion ?? new Date(),
    updatedOn: data?.fechaActualizacion ?? new Date(),
    deletedOn: data?.fechaEliminacion ?? new Date(),
  } as IPoints;
}
