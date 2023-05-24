import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { FederalEntityFailure, federalEntityFailuresEnum } from "domain/core/failures/federalEntity/federalEntityFailure";
import { federalEntitySupabaseToMap } from "domain/mappers/federalEntities/supabase/federalEntitiesSupabaseMappers";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface IFederalEntityRepository {
  getFederalEntities(): Promise<IFederalEntity[] | FederalEntityFailure>;
}

export class FederalEntityRepository implements IFederalEntityRepository {
  async getFederalEntities(): Promise<IFederalEntity[] | FederalEntityFailure > {
    try {
      let query = supabase.from("EntidadFederativa").select();

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
  
}