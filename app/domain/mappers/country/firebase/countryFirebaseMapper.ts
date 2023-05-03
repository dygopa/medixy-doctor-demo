import { ICountry } from "domain/core/entities/countryEntity";

export function countryFirebaseToMap(data: any): ICountry {
  return {
    countryId: data?.paisId ?? "",
    phoneCode: data?.codigoArea ?? "",
    textCode: data?.codigoTexto ?? "",
    juridicPersonId: data?.idPersonaJuridica ?? [],
    naturalPersonId: data?.idPersonaNatural ?? [],
    pointValue: data?.valorPunto ?? "",
    cities: data?.ciudades ?? [],
    currency: data?.simbolo ?? "",
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
    deletedOn: data?.deletedOn ?? new Date(),
  } as ICountry;
}
