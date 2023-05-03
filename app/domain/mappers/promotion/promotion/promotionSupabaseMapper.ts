import { IAlly } from "domain/core/entities/allyEntity";
import { IPromotion } from "domain/core/entities/promotionEntity";

export function promotionSupabaseToMap(data: any, ally?: IAlly | null, currency?: string | null): IPromotion {
  return {
    promotionId: data?.promocionId ?? "",
    allyId: data?.aliadoId ?? "",
    ally: ally ?? null,
    hasSchedule: data?.agendaContiene ?? false,
    scheduleType: data?.tipoAgenda ?? "",
    quantity: data?.cantidad ?? 0,
    quantityDays: data?.cantidadDias ?? 0,
    conditions: data?.condiciones ?? "",
    status: data?.estado ?? "",
    quotas: data?.cupos ?? 0,
    delivery: data?.delivery ?? false,
    description: data?.descripcion ?? "",
    house: data?.domicilio ?? false,
    isApproved: data?.aprobado ?? false,
    localityId: data?.localidadId ?? false,
    country: data?.pais ?? "Perú",
    weight: data?.peso ?? null,
    price: data?.precio ?? 0,
    currency: currency ?? null,
    type: data?.tipoPromocion ?? "",
    title: data?.titulo ?? "",
    imageUrl: data?.urlImagen ?? "",
    adminAttended: data?.usuarioAtendio ?? "",
    validSince: data?.vigenciaDesde ?? null,
    validUntil: data?.vigenciaHasta ?? null,
    closeDate: data?.fechaCierre ?? null,
    createdOn: data?.fechaCreacion ? new Date(data.fechaCreacion) : new Date(),
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : new Date(),
    deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : new Date(),
  } as IPromotion;
}
