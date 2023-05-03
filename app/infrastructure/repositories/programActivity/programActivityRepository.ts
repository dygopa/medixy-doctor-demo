import { IProgramActivity, IProgramActivityLang } from 'domain/core/entities/programActivityEntity';
import { ProgramActivityFailure, programActivityFailuresEnum } from 'domain/core/failures/programActivity/programActivityFailure';
import { formSupabaseToDocumentData, fromProgramActivityLangSupabaseMap, fromProgramActivityLangSupabaseToDocumentData, fromSupabaseMap } from 'domain/mappers/programActivity/supabase/programActivityMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import { IGetProgramsActivitiesResponse } from 'domain/core/response/programsResponse';

export default interface IProgramActivitiesRepository {
  getProgramActivities(obj: { programId: string; skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, status?: string | undefined, isDelete?: boolean | undefined; minIndex?: number | undefined; maxIndex?: number | undefined; startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramsActivitiesResponse | ProgramActivityFailure>;
  createProgramActivity(programId: string, programActivity: IProgramActivity): Promise<IProgramActivity | ProgramActivityFailure>;
  getProgramActivityById(programId: string, programActivityId: string): Promise<IProgramActivity | ProgramActivityFailure>;
  editProgramActivity(programActivity: IProgramActivity): Promise<IProgramActivity | ProgramActivityFailure>;
  editProgramActivityStatus(programId: string, programActivityId: string, status: string): Promise<string | ProgramActivityFailure>;
  deleteProgramActivity(programId: string, programActivityId: string): Promise<string | ProgramActivityFailure>;
  getProgramActivityLangById(programId: string, programActivityId: string, langCode: string): Promise<IProgramActivityLang | ProgramActivityFailure>;
  createProgramActivityLang(programId: string, programActivityId: string, programActivityLang: IProgramActivityLang): Promise<IProgramActivityLang | ProgramActivityFailure>;
}

export class ProgramActivityRepository implements IProgramActivitiesRepository {
  async getProgramActivities(obj: { programId: string; skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, status?: string | undefined, isDelete?: boolean | undefined; minIndex?: number | undefined; maxIndex?: number | undefined; startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramsActivitiesResponse | ProgramActivityFailure> {
    try {
        let query = supabase.from("ActividadPrograma").select().eq("programaId", obj.programId);

        if (typeof obj.isDelete === "boolean") {
          query = query.eq("eliminado", false);
        }

        if (obj.minIndex) {
          query = query.gte("indice", obj.minIndex);
        }

        if (obj.maxIndex) {
          query = query.lte("indice", obj.maxIndex);
        }

        if (obj.status) {
            query = query.eq('estado', obj.status);
          }
  
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

        const snapshots = await query;

        const programActivities: IProgramActivity[] = [];

        if (snapshots.data && snapshots.data.length > 0) {
          snapshots.data.forEach((snapshot: any) => {
            const programMap: IProgramActivity = fromSupabaseMap(snapshot);
            programActivities.push(programMap);
          });
        }

        const response: IGetProgramsActivitiesResponse = {
            data: programActivities,
            metadata: {
              total: 0,
              limit: obj.limit ?? null,
            }
        }
  
        return JSON.parse(JSON.stringify(response));
    } catch (error) { 
      const exception = error as any;
      return new ProgramActivityFailure(programActivityFailuresEnum.serverError);
    }
  }

  async createProgramActivity(programId: string, programActivity: IProgramActivity): Promise<IProgramActivity | ProgramActivityFailure> {
    try {
        programActivity.createdOn = new Date();

        const programActivityData = await supabase.from("ActividadPrograma").insert(formSupabaseToDocumentData(programActivity)).select();

        programActivity.programActivityId = programActivityData?.data && programActivityData.data[0]?.actividadId ? programActivityData.data[0].actividadId : "";

        const programActivityLang: IProgramActivityLang = {
            langId: "",
            langCode: "es",
            name: programActivity.name,
            description: programActivity.description,
            createdAt: new Date(),
            callToActions: programActivity.callToActions.length > 0 ? [
                {
                    name: programActivity.callToActions[0].name,
                },
                {
                    name: programActivity.callToActions[1].name,
                },
            ] : [],
            programActivityId: programActivity.programActivityId,
        }

        await supabase.from("ActividadProgramaLenguaje").insert(fromProgramActivityLangSupabaseToDocumentData(programActivityLang));

        return programActivity;
    } catch (error) { 
      const exception = error as any;
      return new ProgramActivityFailure(programActivityFailuresEnum.serverError);
    }
  }

  async editProgramActivity(programActivity: IProgramActivity): Promise<IProgramActivity | ProgramActivityFailure> {
    try {
      programActivity.updatedOn = new Date();

      await supabase.from("ActividadPrograma").update(formSupabaseToDocumentData(programActivity)).match({ programaId: programActivity.programId, actividadId: programActivity.programActivityId });

      return programActivity;
    } catch (error) { 
      const exception = error as any;
      return new ProgramActivityFailure(programActivityFailuresEnum.serverError);
    }
  }

  async getProgramActivityById(programId: string, programActivityId: string): Promise<IProgramActivity | ProgramActivityFailure> {
    try {
        const snapshot = await supabase.from("ActividadPrograma").select().eq("programaId", programId).eq("actividadId", programActivityId).limit(1);

        let programActivity: IProgramActivity = {} as IProgramActivity;

        if (snapshot.data && snapshot.data.length > 0) programActivity = fromSupabaseMap(snapshot.data[0]);

        return programActivity;
    } catch (error) { 
      const exception = error as any;
      return new ProgramActivityFailure(programActivityFailuresEnum.serverError);
    }
  }

  async deleteProgramActivity(programId: string, programActivityId: string): Promise<string | ProgramActivityFailure> {
    try {
        await supabase.from("ActividadPrograma").update({
          eliminado: true,
          fechaEliminacion: new Date()
        }).match({ programaId: programId, actividadId: programActivityId });

        return programId;
    } catch (error) { 
      const exception = error as any;
      return new ProgramActivityFailure(programActivityFailuresEnum.serverError);
    }
  }

  async editProgramActivityStatus(programId: string, programActivityId: string, status: string): Promise<string | ProgramActivityFailure> {
    try {
        await supabase.from("ActividadPrograma").update({
          estado: status,
          fechaActualizacion: new Date()
        }).match({ programaId: programId, actividadId: programActivityId });

        return programId;
    } catch (error) { 
      const exception = error as any;
      return new ProgramActivityFailure(programActivityFailuresEnum.serverError);
    }
  }

  async getProgramActivityLangById(programId: string, programActivityId: string, langCode: string): Promise<IProgramActivityLang | ProgramActivityFailure> {
    try {
        const snapshots = await supabase.from("ActividadProgramaLenguaje").select().eq("actividadId", programActivityId).eq("lenguajeCodigo", langCode).limit(1);

        let programLang: IProgramActivityLang = {} as IProgramActivityLang;

        if (snapshots.data && snapshots.data.length > 0) programLang = fromProgramActivityLangSupabaseMap(snapshots.data[0]);

        return programLang;
    } catch (error) { 
      const exception = error as any;
      return new ProgramActivityFailure(programActivityFailuresEnum.serverError);
    }
  }

  async createProgramActivityLang(programId: string,  programActivityId: string, programActivityLang: IProgramActivityLang): Promise<IProgramActivityLang | ProgramActivityFailure> {
    try {
        const snapshots = await supabase.from("ActividadProgramaLenguaje").select().eq("actividadId", programActivityId).eq("lenguajeCodigo", programActivityLang.langCode).limit(1);

        programActivityLang.createdAt = new Date()

        if (snapshots.data && snapshots.data.length > 0) {
          const programActivityLangId = snapshots.data[0].lenguajeId;

          programActivityLang.langId = programActivityLangId;

          await supabase.from("ActividadProgramaLenguaje").update(fromProgramActivityLangSupabaseToDocumentData(programActivityLang)).match({ actividadId: programActivityId, lenguajeId: programActivityLangId });
        } else {
          await supabase.from("ActividadProgramaLenguaje").insert(fromProgramActivityLangSupabaseToDocumentData(programActivityLang));
        }
       
        return programActivityLang;
    } catch (error) { 
      const exception = error as any;
      return new ProgramActivityFailure(programActivityFailuresEnum.serverError);
    }
  }
}
