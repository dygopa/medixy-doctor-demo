import { IAlly } from "domain/core/entities/allyEntity";
import { ILocality } from "domain/core/entities/localityEntity";
import { IProduct } from "domain/core/entities/productEntity";

export function productSupabaseToMap(data: any, currency?: string | null, ally?: IAlly | null, locality?: ILocality | null): IProduct {
  return {
    productId: data?.productoId ?? "",
    allyId: data?.aliadoId ?? "",
    ally: ally ?? null,
    localityId: data?.localidadId ?? "",
    locality: locality ?? null,
    quantity: data?.cantidad ?? 0,
    category: data?.categoria ?? "",
    barCode: data?.codigoBarras ?? "",
    continueBuying: data?.continuarVendiendo ?? false,
    delivery: data?.domicilio ?? false,
    description: data?.descripcion ?? "",
    managed: data?.dirigido ?? "",
    age: data?.edad ?? "",
    minExists: data?.existenciaMinima ?? "",
    isApproved: data?.aprobado ?? false,
    brand: data?.marca ?? "",
    country: data?.pais ?? "",
    keywords: data?.palabrasClave ?? [],
    weight: data?.peso ?? "",
    weightUnit: data?.pesoUnidad ?? "",
    weightValue: data?.pesoValor ?? "",
    price: data?.precio ?? 0,
    currency: data?.moneda ?? null,
    presentation: data?.presentacion ?? "",
    sku: data?.sku ?? "",
    status: data?.estado ?? "",
    petType: data?.tipoMascota ?? "",
    title: data?.titulo ?? "",
    imageUrl: data?.urlImagen ?? "",
    createdOn: data?.fechaCreacion ?? new Date(),
    updatedOn: data?.fechaActualizacion ?? new Date(),
    deletedOn: data?.fechaEliminacion ?? new Date(),
  } as IProduct;
}
