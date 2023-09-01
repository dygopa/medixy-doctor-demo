import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { IPostalCode } from "domain/core/entities/postalCodeEntity";

export function postalCodeSupabaseToMap(data: any): IPostalCode {
    return {
      id: data?.id ?? 0,
      catalogId: data?.municipioCatalogoId ?? 0,
      postalCode: data?.codigoPostal ?? "",
      settlement: data?.asentamiento ?? "",
      federalEntityId: data?.entidadFederativaId ?? 0,
      federalEntity: {} as IFederalEntity,
      municipality: {} as IMunicipality,
    } as IPostalCode;
}
