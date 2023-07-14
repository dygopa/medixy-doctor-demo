import { IServiceToLocality } from "domain/core/entities/serviceEntity";

export function serviceToLocalitiesSupabaseToMap(data: any): IServiceToLocality {
    return {
        price: data?.precio ?? 0,
        location_id: data?.localidadId ?? 0,
        service_id: data?.servicioId ?? 0,
    } as IServiceToLocality;
}