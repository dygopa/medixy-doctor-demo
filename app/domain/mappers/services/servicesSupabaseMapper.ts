import { ILocalityService } from "domain/core/entities/localityEntity";
import { IServiceToLocality } from "domain/core/entities/serviceEntity";

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
