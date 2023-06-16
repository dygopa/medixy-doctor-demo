import { IMunicipality } from "domain/core/entities/municipalityEntity";

export function municipalitySupabaseToMap(data: any): IMunicipality {
    return {
      id: data?.id ?? 0,
      catalogId: data?.catalogoId ?? 0,
      name: data?.nombre ?? "",
      federalEntityId: data?.entidadFederativaId ?? 0
    } as IMunicipality;
}
