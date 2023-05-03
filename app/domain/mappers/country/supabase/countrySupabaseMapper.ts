import { ICountry } from "domain/core/entities/countryEntity";

export function countrySupabaseToMap(data: any): ICountry {
  return {
    countryId: data?.pais ?? "",
    phoneCode: data?.codigoArea ?? "",
    textCode: data?.codigoTexto ?? "",
    juridicPersonId: data?.idPersonaJuridica ?? [],
    naturalPersonId: data?.idPersonaNatural ?? [],
    pointValue: data?.valorPunto ?? "",
    cities: data?.ciudades ?? [],
    currency: data?.simbolo ?? "",
    createdOn: data?.fechaCreacion ? new Date(data.fechaCreacion) : new Date(),
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : new Date(),
    deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : new Date(),
  } as ICountry;
}
