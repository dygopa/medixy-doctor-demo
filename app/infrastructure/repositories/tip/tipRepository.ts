import { ITip, ITipAnalytic } from 'domain/core/entities/tipEntity';
import { TipFailure, tipFailuresEnum } from 'domain/core/failures/tip/tipFailure';
import { IGetTipsResponse } from 'domain/core/response/tipsResponse';
import { fromTipAnalyticSupabaseMap, fromTipAnalyticSupabaseToDocumentData, fromTipSupabaseMap, fromTipSupabaseToDocumentData } from 'domain/mappers/tip/supabase/tipSupabaseMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface ITipRepository {
    getTips(obj: { limit?: number; skip?: number | string; sort?: any; searchQuery?: string; isDelete?: boolean; country?: string; status?: string,  startDate?: Date; endDate?: Date }): Promise<IGetTipsResponse | TipFailure>;
    getTipById(tipId: string): Promise<ITip | TipFailure>;
    createTip(tip: ITip): Promise<ITip | TipFailure>;
    editTip(tip: ITip): Promise<ITip | TipFailure>;
    deleteTip(tipId: string): Promise<string | TipFailure>;
    editTipStatus(tipId: string, status: string): Promise<string | TipFailure>;
}  

export class TipRepository implements ITipRepository {
  async getTips(obj: { limit?: number; skip?: number | string; sort?: any; searchQuery?: string; isDelete?: boolean; country?: string; status?: string, startDate?: Date; endDate?: Date }): Promise<IGetTipsResponse | TipFailure> {
    try {
        let query = supabase.from("Consejo").select();
       
        if (obj.sort) {
            query = query.order(obj.sort.field, {
              ascending: obj.sort.ascending
            });
          }
  
          if (obj.searchQuery) {
            query = query.textSearch("titulo", obj.searchQuery);
          }
  
          if (obj.country) {
            query = query.eq('pais', obj.country);
          }

          if (typeof obj.isDelete === "boolean") {
            query = query.eq('eliminado', obj.isDelete);
          }
  
          if (obj.status) {
            query = query.eq("estado", obj.status);
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
  

        const snapshots = await query

        const tips: ITip[] = [];

        if (snapshots.data && snapshots.data.length > 0) {
          await Promise.all(snapshots.data.map(async (snapshot: any) => {
            const tipMap: ITip = fromTipSupabaseMap(snapshot);

            if (tipMap.tipId.length > 0) {
              const snapshotAnalytic = await supabase.from("ConsejoAnalitica").select().limit(1);

              if (snapshotAnalytic.data && snapshotAnalytic.data.length > 0) {
                const tipAnalyticMap: ITipAnalytic = fromTipAnalyticSupabaseMap(snapshotAnalytic.data[0]);

                tipMap.analytic = tipAnalyticMap;
              };

              tips.push(tipMap);
            }
          }));
        }

        const response: IGetTipsResponse = {
            data: tips,
            metadata: {
              total: 0,
              limit: obj.limit ?? null,
            }
        }
  
        return JSON.parse(JSON.stringify(response));
    } catch (error) { 
      const exception = error as any;
      return new TipFailure(tipFailuresEnum.serverError);
    }
  }

  async getTipById(tipId: string): Promise<ITip | TipFailure> {
    try {
        const snapshot = await supabase.from("Consejo").select().eq("consejoId", tipId).limit(1);

        let tip: ITip = {} as ITip;

        if (snapshot.data && snapshot.data.length > 0) {
          tip = fromTipSupabaseMap(snapshot.data[0]);

          if (tip.tipId.length > 0) {
            const snapshotAnalytic = await supabase.from("ConsejoAnalitica").select().limit(1);

            if (snapshotAnalytic.data && snapshotAnalytic.data.length > 0) {
              const tipAnalyticMap: ITipAnalytic = fromTipAnalyticSupabaseMap(snapshotAnalytic.data[0]);

              tip.analytic = tipAnalyticMap;
            };
          }
        }

        return tip;
    } catch (error) { 
      const exception = error as any;
      return new TipFailure(tipFailuresEnum.serverError);
    }
  }

  async createTip(tip: ITip): Promise<ITip | TipFailure> {
    try {
        tip.date = tip.date as Date ?? new Date();
        tip.createdOn = new Date();

        await supabase.from("Consejo").insert(fromTipSupabaseToDocumentData(tip));

        const snapshotAnalytic = await supabase.from("ConsejoAnalitica").select().limit(1);

        if (snapshotAnalytic.data && snapshotAnalytic.data.length > 0) {
          const tipAnalyticMap: ITipAnalytic = fromTipAnalyticSupabaseMap(snapshotAnalytic.data[0]);

          if (tipAnalyticMap.tipAnalyticId.length > 0) {
            await supabase.from("ConsejoAnalitica").update({
              cantidadConsejos: tipAnalyticMap.tipsCount + 1,
              fechaActualizacion: new Date().toISOString(),
            }).match({ consejoAnaliticaId: tipAnalyticMap.tipAnalyticId });
          }
        } else {
          const tipAnalytic: ITipAnalytic = {
              tipsCount: 1,
              features: tip.features,
              createdOn: new Date(),
              updatedOn: null,
              tipAnalyticId: ''
          }

          await supabase.from("ConsejoAnalitica").insert(fromTipAnalyticSupabaseToDocumentData(tipAnalytic));
        };

        return tip;
    } catch (error) { 
      const exception = error as any;
      return new TipFailure(tipFailuresEnum.serverError);
    }
  }

  async editTip(tip: ITip): Promise<ITip | TipFailure> {
    try {
      const snapshot = await supabase.from("Consejo").select().eq("consejoId", tip.tipId).limit(1);

      if (snapshot.data && snapshot.data.length > 0) {
        tip.updatedOn = new Date();

        await supabase.from("Consejo").update(fromTipSupabaseToDocumentData(tip)).match({ consejoId: tip.tipId });
      }

      return tip;
    } catch (error) { 
      const exception = error as any;
      return new TipFailure(tipFailuresEnum.serverError);
    }
  }

  async deleteTip(tipId: string): Promise<string | TipFailure> {
    try {
      const snapshot = await supabase.from("Consejo").select().eq("consejoId", tipId);

      let tip: ITip = {} as ITip;

      if (snapshot.data && snapshot.data.length > 0) {
        tip = fromTipSupabaseMap(snapshot.data[0]);

        await supabase.from("Consejo").update({
          eliminado: true,
          fechaEliminacion: new Date(),
        }).match({ consejoId: tipId });

        if (tip.tipId.length > 0) {
          const snapshotAnalytic = await supabase.from("ConsejoAnalitica").select().limit(1);

          if (snapshotAnalytic.data && snapshotAnalytic.data.length > 0) {
            const tipAnalyticMap: ITipAnalytic = fromTipAnalyticSupabaseMap(snapshotAnalytic.data[0]);

          if (tipAnalyticMap.tipAnalyticId.length > 0) {
              await supabase.from("ConsejoAnalitica").update({
                cantidadConsejos: tipAnalyticMap.tipsCount + 1,
                fechaActualizacion: new Date().toISOString(),
              }).match({ "consejoAnaliticaId": tipAnalyticMap.tipAnalyticId });
            }
          };
        }
      }

      return tipId;
    } catch (error) { 
      const exception = error as any;
      return new TipFailure(tipFailuresEnum.serverError);
    }
  }

  async editTipStatus(tipId: string, status: string): Promise<string | TipFailure> {
    try {
        await supabase.from("Consejo").update({
          estado: status,
          fechaActualizacion: new Date().toISOString()
        }).match({ consejoId: tipId });

        return tipId;
    } catch (error) { 
      const exception = error as any;
      return new TipFailure(tipFailuresEnum.serverError);
    }
  }
}
