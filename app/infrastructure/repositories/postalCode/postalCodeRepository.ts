import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { IPostalCode } from "domain/core/entities/postalCodeEntity";
import { PostalCodeFailure, postalCodeFailuresEnum } from "domain/core/failures/postalCode/postalCodeFailure";
import { IGetPostalCodesResponse, IGetPostalCodeResponse } from "domain/core/response/postalCodeResponse";
import { federalEntitySupabaseToMap } from "domain/mappers/federalEntities/supabase/federalEntitiesSupabaseMappers";
import { municipalitySupabaseToMap } from "domain/mappers/municipality/supabase/municipalitySupabaseMapper";
import { postalCodeSupabaseToMap } from "domain/mappers/postalCode/supabase/postalCodeSupabaseMapper";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface IPostalCodeRepository {
  getPostalCodes(obj: {  searchQuery?: string | null; limit?: number | null; federalEntityId?: number | null }): Promise<IGetPostalCodesResponse | PostalCodeFailure>;
  getPostalCodeById(obj: { id: number }): Promise<IGetPostalCodeResponse | PostalCodeFailure>;
  getPostalCodeByPostalCode(obj: { postalCode: string }): Promise<IGetPostalCodeResponse | PostalCodeFailure>;
}

export class PostalCodeRepository implements IPostalCodeRepository {
  async getPostalCodes(obj: {  searchQuery?: string | null; limit?: number | null; federalEntityId?: number | null }): Promise<IGetPostalCodesResponse | PostalCodeFailure > {
    try {
      let query = supabase.from("CodigosPostales").select(`
      *,
      EntidadFederativa (*)
      `,{ count: "exact" })

      if (obj.searchQuery) {
        query = query.textSearch("codigoPostal", obj.searchQuery.trim().toLowerCase());
      }

      if (obj.federalEntityId) {
        query = query.eq("entidadFederativaId", obj.federalEntityId);
      }

      if (obj.limit) {
        query = query.limit(obj.limit);
      }

      const res = await query;

      const postalCodes: IPostalCode[] = [];

      if (res.data && res.data.length > 0) {
        await Promise.all(res.data.map(async (data: any) => {
          const postalCodeMap: IPostalCode = postalCodeSupabaseToMap(data);

          if (res.data[0]?.EntidadFederativa) {
            const federalEntity: IFederalEntity = federalEntitySupabaseToMap(res.data[0].EntidadFederativa);
  
            if (federalEntity.entityId > 0) postalCodeMap.federalEntity = federalEntity;
          }
  
          if (postalCodeMap.catalogId > 0) {
            const resMunicipality = await supabase.from("Municipios").select("*").eq("catalogoId", postalCodeMap.catalogId).eq("entidadFederativaId", postalCodeMap.federalEntityId).limit(1);
  
            if (resMunicipality.data && resMunicipality.data.length > 0) {
              const municipality: IMunicipality = municipalitySupabaseToMap(resMunicipality.data[0]);
  
            if (municipality.id > 0) postalCodeMap.municipality = municipality;
            }
          }

          if (postalCodeMap.id > 0) postalCodes.push(postalCodeMap);
        }));
      }

      const response: IGetPostalCodesResponse = {
        data: postalCodes,
        metadata: {
          total: res.count ?? 0,
          limit: obj.limit ?? 0,
        }
      }

      return response;
    } catch (error) {
      const exception = error as any;
      return new PostalCodeFailure(postalCodeFailuresEnum.serverError);
    }
  }

  async getPostalCodeById(obj: { id: number }): Promise<IGetPostalCodeResponse | PostalCodeFailure> {
    try {
      const res = await supabase.from("CodigosPostales").select("*", { count: "exact" }).eq("id", obj.id);

      let postalCode: IPostalCode = {} as IPostalCode;

      if (res.data && res.data.length > 0) postalCode = postalCodeSupabaseToMap(res.data[0]);

      const response: IGetPostalCodeResponse = {
        data: postalCode,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any;
      return new PostalCodeFailure(postalCodeFailuresEnum.serverError);
    }
  }

  async getPostalCodeByPostalCode(obj: { postalCode: string }): Promise<IGetPostalCodeResponse | PostalCodeFailure> {
    try {
      const res = await supabase.from("CodigosPostales").select(`
      *,
      EntidadFederativa (*)
      `, 
      { count: "exact" }).eq("codigoPostal", obj.postalCode);

      let postalCode: IPostalCode = {} as IPostalCode;

      if (res.data && res.data.length > 0) {
        postalCode = postalCodeSupabaseToMap(res.data[0]);

        if (res.data[0]?.EntidadFederativa) {
          const federalEntity: IFederalEntity = federalEntitySupabaseToMap(res.data[0].EntidadFederativa);

          if (federalEntity.entityId > 0) postalCode.federalEntity = federalEntity;
        }

        if (postalCode.catalogId > 0) {
          const resMunicipality = await supabase.from("Municipios").select("*").eq("catalogoId", postalCode.catalogId).eq("entidadFederativaId", postalCode.federalEntityId).limit(1);

          if (resMunicipality.data && resMunicipality.data.length > 0) {
            const municipality: IMunicipality = municipalitySupabaseToMap(resMunicipality.data[0]);

          if (municipality.id > 0) postalCode.municipality = municipality;
          }
        }
      }

      const response: IGetPostalCodeResponse = {
        data: postalCode,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any;
      return new PostalCodeFailure(postalCodeFailuresEnum.serverError);
    }
  }
}