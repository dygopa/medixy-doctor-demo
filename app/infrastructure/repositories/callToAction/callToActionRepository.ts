import { ICallToAction } from 'domain/core/entities/callToActionEntity';
import { CallToActionFailure, callToActionFailuresEnum } from 'domain/core/failures/callToAction/callToActionFailure';
import { IGetCallToActionsResponse } from 'domain/core/response/callToActionsResponse';
import { fromCallToActionSupabaseMap } from 'domain/mappers/callToAction/supabase/callToActionSupabaseMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface ICallToActionRepository {
    getCallToActions(obj: { skip?: number | undefined; sort?: any | undefined; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetCallToActionsResponse | CallToActionFailure>;
}

export class CallToActionRepository implements ICallToActionRepository {
  async getCallToActions(obj: { skip?: number | undefined; sort?: any | undefined; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetCallToActionsResponse | CallToActionFailure> {
    try {
        let query = supabase.from("CTAs").select();

        if (obj.sort) {
            query = query.order(obj.sort.field, {
              ascending: obj.sort.ascending
            });
          }
  
          if (obj.searchQuery) {
            query = query.textSearch("nombre", obj.searchQuery);
          }
  
          if (obj.country) {
            query = query.eq('pais', obj.country);
          }
  
  
          if (obj.startDate) {
            query = query.gte("fechaCreacion", obj.startDate.toISOString());
          }
  
          if (obj.endDate) {
            query = query.lte("fechaCreacion", obj.endDate.toISOString());
          }
  
          if (obj.skip && typeof obj.skip === "number" && obj.limit) {
            query = query.range(obj.skip, obj.skip + obj.limit);
          }
  
          if (obj.limit) {
            query = query.limit(obj.limit);
          }

        const snapshots = await query;

        const callToActions: ICallToAction[] = [];

        if (snapshots.data && snapshots.data.length > 0) {
          snapshots.data.forEach((snapshot: any) => {
            const callToActionMap: ICallToAction = fromCallToActionSupabaseMap(snapshot);
            callToActions.push(callToActionMap);
          });
        }

        const response: IGetCallToActionsResponse = {
            data: callToActions,
            metadata: {
              total: 0,
              limit: obj.limit ?? null,
            }
        }
  
        return JSON.parse(JSON.stringify(response));
    } catch (error) { 
        const exception = error as any;
        return new CallToActionFailure(callToActionFailuresEnum.serverError);
    }
  }
}
