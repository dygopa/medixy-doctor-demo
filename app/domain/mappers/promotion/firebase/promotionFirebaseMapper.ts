import { IAlly } from "domain/core/entities/allyEntity";
import { IPromotion } from "domain/core/entities/promotionEntity";

export function promotionFirebaseToMap(data: any, ally?: IAlly | null, currency?: string | null): IPromotion {
  return {
    promotionId: data?.promoId ?? "",
    allyId: data?.aliadoId ?? "",
    ally: ally ?? null,
    hasSchedule: data?.agendaContiene ?? false,
    scheduleType: data?.tipoAgenda ?? "",
    quantity: data?.cantidad ?? 0,
    quantityDays: data?.cantidadDias ?? 0,
    conditions: data?.condiciones ?? "",
    status: data?.status ?? "",
    quotas: data?.cupos ?? 0,
    delivery: data?.delivery ?? false,
    description: data?.descripcion ?? "",
    house: data?.domicilio ?? false,
    isApproved: data?.isApproved ?? false,
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
    validUntil: data?.validUntil ?? null,
    closeDate: data?.fechaCierre ?? null,
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
    deletedOn: data?.deletedOn ?? new Date(),
  } as IPromotion;
}
