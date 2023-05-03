import { IAlly } from "domain/core/entities/allyEntity";
import { ILocality } from "domain/core/entities/localityEntity";
import { IProduct } from "domain/core/entities/productEntity";

export function productFirebaseToMap(data: any, currency?: string | null, ally?: IAlly | null, locality?: ILocality | null): IProduct {
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
    delivery: data?.delivery ?? false,
    description: data?.descripcion ?? "",
    managed: data?.dirigido ?? "",
    age: data?.edad ?? "",
    minExists: data?.existenciaMinima ?? "",
    isApproved: data?.isApproved ?? false,
    brand: data?.marca ?? "",
    country: data?.pais ?? "",
    keywords: data?.palabrasClave ?? [],
    weight: data?.peso ?? "",
    weightUnit: data?.pesoUnidad ?? "",
    weightValue: data?.pesoValor ?? "",
    price: data?.precio ?? 0,
    currency: data?.currency ?? null,
    presentation: data?.presentacion ?? "",
    sku: data?.sku ?? "",
    status: data?.status ?? "",
    petType: data?.tipoMascota ?? "",
    title: data?.titulo ?? "",
    imageUrl: data?.urlImagen ?? "",
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
    deletedOn: data?.deletedOn ?? new Date(),
  } as IProduct;
}
