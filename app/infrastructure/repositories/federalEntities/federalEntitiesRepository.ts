import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { FederalEntityFailure, federalEntityFailuresEnum } from "domain/core/failures/federalEntity/federalEntityFailure";
import { federalEntitySupabaseToMap } from "domain/mappers/federalEntities/supabase/federalEntitiesSupabaseMappers";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface IFederalEntityRepository {
  getFederalEntities(obj: { searchQuery?: string | null; limit?: number | null }): Promise<IFederalEntity[] | FederalEntityFailure>;
}

export class FederalEntityRepository implements IFederalEntityRepository {
  async getFederalEntities(obj: { searchQuery?: string | null; limit?: number | null }): Promise<IFederalEntity[] | FederalEntityFailure > {
    try {
      let query = supabase.from("EntidadFederativa").select();

      if (obj.searchQuery) {
        query = query.or(`or(nombre.ilike.%${obj.searchQuery.trim().toLowerCase()}%,abreviatura.ilike.%${obj.searchQuery.trim().toLowerCase()}%),and(nombre.ilike.%${obj.searchQuery.trim().toLowerCase()}%,abreviatura.ilike.%${obj.searchQuery.trim().toLowerCase()}%)`);
      }

      if (obj.limit) {
        query = query.limit(obj.limit);
      }

      const snapshots = await query;

      const federalEntities: IFederalEntity[] = [];

      if (snapshots.data && snapshots.data.length > 0) {
        await Promise.all(snapshots.data.map(async (snapshot: any) => {
          const federalEntityMap: IFederalEntity = federalEntitySupabaseToMap(snapshot);

          if (federalEntityMap.entityId >= 0) federalEntities.push(federalEntityMap);
        }));
      }

      return federalEntities;
    } catch (error) {
      const exception = error as any;
      return new FederalEntityFailure(federalEntityFailuresEnum.serverError);
    }
  }

  async getFederalEntityById(obj: { id: number }): Promise<IFederalEntity | FederalEntityFailure> {
    try {
      const res = await supabase.from("EntidadFederativa").select("*", { count: "exact" }).eq("id", obj.id);

      let municipality: IFederalEntity = {} as IFederalEntity;

      if (res.data && res.data.length > 0) municipality = federalEntitySupabaseToMap(res.data[0]);

      return municipality;
    } catch (error) {
      const exception = error as any;
      return new FederalEntityFailure(federalEntityFailuresEnum.serverError);
    }
  }
  
}