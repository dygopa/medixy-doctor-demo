import { ILocalityService } from "domain/core/entities/localityEntity";
import { IService, IServiceCategory, IServiceToLocality } from "domain/core/entities/serviceEntity";
import { localityFromSupabaseToMap } from "../localities/localitiesSupabaseMapper";

export function serviceToLocalitiesSupabaseToMap(data: any): IServiceToLocality {
    return {
        id: data?.id ?? 0,
        price: data?.precio ?? 0,
        location_id: data?.localidadId ?? 0,
        service_id: data?.servicioId ?? 0,
    } as IServiceToLocality;
}

export function fromServiceToLocalitiesSupabaseDocumentData(relation: ILocalityService): any {
    const documentData = {
        precio: relation.price,
        localidadId: relation.location_id,
        servicioId: relation.service_id,
        estado: 1,
    } as any;

    return documentData;
}
export function servicesSupabaseMapper(data: any): IService {
    return {
        id: data?.id ?? 0,
        name: data?.nombre ?? "",
        service_category_id: data?.categoriaServicioId ?? "",
        service_category: data?.CategoriaServicios ? categorySupabaseMapper(data?.CategoriaServicios) : {},
        image_url: data?.fotoUrl ?? 0,
        description: data?.descripcion ?? 0,
        conditions: data?.condiciones ?? 0,
        status: data?.estado ?? 0,
        base_price: data?.precioBase ?? 0,
        location: data?.Localidades ? localityFromSupabaseToMap(data?.Localidades) : {},
        location_id: data?.localidadId ?? 0,
    } as IService;
}


export function categorySupabaseMapper(data:any): IServiceCategory {
    return {
        id: data?.id ?? 0,
        name: data?.nombre ?? ""
    } as IServiceCategory
}