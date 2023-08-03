import { ILocality } from "domain/core/entities/localityEntity";

export function localityFromSupabaseToMap(data: any): ILocality {
    return {
        id: data["id"] ?? 0,
        name: data["nombre"] ?? "",
        code: data["codigoPostal"] ?? "",
        type: data["tipo"] ?? "",
        clues: data["clues"] ?? "",
        address: data["direccion"] ?? "",
        postal_code: data["codigoPostal"] ?? 0,
        state: data[""] ?? {},
        city: data["ciudad"] ?? "",
        federativeEntityId: data["entidadFederativaId"] ?? 0,
        municipalityId: data["municipioId"] ?? 0,
        countryLocationId: data["localidadPadreId"] ?? 0,
        street: data["calle"] ?? "",
        is_public: data["esPublico"] ?? false,
        is_virtual: data["esPublico"] ?? false,
        image_url: data["fotoUrl"] ?? "",
        latitude: data["latitud"] ?? 0,
        longitude: data["latitud"] ?? 0,
    } as ILocality;
}