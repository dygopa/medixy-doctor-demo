import { IProgram, IProgramLang } from 'domain/core/entities/programEntity';
import { ProgramFailure, programFailuresEnum } from 'domain/core/failures/program/programFailure';
import { IProgramActivity } from 'domain/core/entities/programActivityEntity';
import { fromProgramLangSupabaseMap, fromProgramLangSupabaseToDocumentData, fromSupabaseMap, fromSupabaseToDocumentData } from 'domain/mappers/program/supabase/programMapper';
import { programCategorySupabaseToMap } from 'domain/mappers/programCategory/supabase/programCategoryMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import { IGetProgramsResponse } from 'domain/core/response/programsResponse';

export default interface IProgramRespository {
    getPrograms(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; isDelete?: boolean | undefined; searchQuery?: string | undefined; country?: string | undefined, status?: string | undefined, programCategory?: string | undefined, isDefault?: boolean | undefined; startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramsResponse | ProgramFailure>;
    getProgramById(programId: string): Promise<IProgram | ProgramFailure>;
    createProgram(program: IProgram): Promise<IProgram | ProgramFailure>;
    getProgramLangById(programId: string, langCode: string): Promise<IProgramLang | ProgramFailure>;
    createProgramLang(programId: string, programLang: IProgramLang): Promise<IProgramLang | ProgramFailure>;
    editProgram(program: IProgram): Promise<IProgram | ProgramFailure>;
    deleteProgram(programId: string): Promise<string | ProgramFailure>;
    editProgramStatus(programId: string, status: string): Promise<string | ProgramFailure>;
    createProgramsWithExcel(programs: IProgram[]): Promise<boolean | ProgramFailure>;
}

export class ProgramRepository implements IProgramRespository {
  async getPrograms(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; isDelete?: boolean | undefined; searchQuery?: string | undefined; country?: string | undefined, status?: string | undefined, programCategory?: string | undefined, isDefault?: boolean | undefined; startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramsResponse | ProgramFailure> {
    try {
        let query = supabase.from("Programa").select().eq("eliminado", false);

        if (obj.status) {
          query = query.eq('estado', obj.status);
        }

        if (obj.programCategory) {
          query = query.eq("categoriaId", obj.programCategory);
        }

        if (obj.sort) {
            query = query.order(obj.sort.field, {
              ascending: obj.sort.ascending
            });
          }
  
          if (obj.searchQuery) {
            query = query.textSearch("nombre", obj.searchQuery);
          }

          if (typeof obj.isDelete === "boolean") {
            query = query.eq('eliminado', obj.isDelete);
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

        const programs: IProgram[] = [];

        if (snapshots.data && snapshots.data.length > 0) {
          snapshots.data.forEach((snapshot: any) => {
            const programMap: IProgram = fromSupabaseMap(snapshot);
            programs.push(programMap);
          });
        }

        const response: IGetProgramsResponse = {
            data: programs,
            metadata: {
              total: 0,
              limit: obj.limit ?? null,
            }
        }
  
        return JSON.parse(JSON.stringify(response));
    } catch (error) { 
      const exception = error as any;
      return new ProgramFailure(programFailuresEnum.serverError);
    }
  }

  async getProgramById(programId: string): Promise<IProgram | ProgramFailure> {
    try {
        const snapshots = await supabase.from("Programa").select().eq("programaId", programId);

        let program: IProgram = {} as IProgram;

        if (snapshots.data && snapshots.data.length > 0) {
          program = fromSupabaseMap(snapshots.data[0]);

          if (program.programCategoryId) {
            const snapshot = await supabase.from("CategoriaPrograma").select().eq("categoriaId", program.programCategoryId).limit(1);

            if (snapshot.count && snapshot.count > 0) program.programCategory = programCategorySupabaseToMap(snapshot.data[0]);
          }
        }

        return program;
    } catch (error) { 
      const exception = error as any;
      return new ProgramFailure(programFailuresEnum.serverError);
    }
  }

  async createProgram(program: IProgram): Promise<IProgram | ProgramFailure> {
    try {
        if (program.isDefault) {
          const snapshot = await supabase.from("Programa").select().eq("eliminado", false).eq("categoriaId", program.programCategoryId).eq("porDefecto", true).limit(1);

          if (snapshot.count && snapshot.count === 1) {
            await supabase.from("Programa").update({ porDefecto: false }).match({ programaId: snapshot.data[0].programId });
          }
        }

        program.validityStartDate = program.isThereValidityConstraint ? program.validityStartDate as Date ?? new Date() : null;
        program.validityEndDate = program.isThereValidityConstraint ? program.validityEndDate as Date ?? new Date() : null;
        program.createdOn =  new Date();

        const programData = await supabase.from("Programa").insert(fromSupabaseToDocumentData(program)).select();

        program.programId = programData?.data && programData.data[0]?.programaId ? programData.data[0].programaId : "";

        const programLang: IProgramLang = {
            langCode: "es",
            programId: program.programId,
            name: program.name,
            description: program.description,
            createdAt: new Date(),
            langId: ''
        }

        await supabase.from("ProgramaLenguaje").insert(fromProgramLangSupabaseToDocumentData(programLang));

        return program;
    } catch (error) { 
      const exception = error as any;
      return new ProgramFailure(programFailuresEnum.serverError);
    }
  }

  async getProgramLangById(programId: string, langCode: string): Promise<IProgramLang | ProgramFailure> {
    try {
        const snapshots = await supabase.from("ProgramaLenguaje").select().eq("programaId", programId).eq("lenguajeCodigo", langCode).limit(1);

        let programLang: IProgramLang = {} as IProgramLang;

        if (snapshots.data && snapshots.data.length > 0) programLang = fromProgramLangSupabaseMap(snapshots.data[0]);

        return programLang;
    } catch (error) { 
      const exception = error as any;
      return new ProgramFailure(programFailuresEnum.serverError);
    }
  }

  async createProgramLang(programId: string, programLang: IProgramLang): Promise<IProgramLang | ProgramFailure> {
    try {
        const snapshots = await supabase.from("ProgramaLenguaje").select().eq("programaId", programId).eq("lenguajeCodigo", programLang.langCode).limit(1);

        programLang.createdAt = new Date();

        if (snapshots.data && snapshots.data.length > 0) {
          const programLangId = snapshots.data[0].lenguajeId;

          programLang.langId = programLangId;

          await supabase.from("ProgramaLenguaje").update(fromProgramLangSupabaseToDocumentData(programLang)).match({ programId: programId, langId: programLang.langId });
        } else {
          await supabase.from("ProgramaLenguaje").insert(fromProgramLangSupabaseToDocumentData(programLang));
        }
       
        return programLang;
    } catch (error) { 
      const exception = error as any;
      return new ProgramFailure(programFailuresEnum.serverError);
    }
  }

  async createProgramsWithExcel(programs: IProgram[]): Promise<boolean | ProgramFailure> {
    try {
      await Promise.all(programs.map(async (program: IProgram) => {
        await supabase.from("Programa").insert({
          categoriaId: program.programCategoryId,
          caracteristicas: program.features,
          estado: "draft",
          elimiando: false,
          fechaCreacion: new Date()
        });

        if (program.programActivities.length > 0) {
            await Promise.all(program.programActivities.map(async (programActivity: IProgramActivity) => {
              supabase.from("ActividadPrograma").insert({
                programaId: program.programId,
                tipo: programActivity.type,
                titulo: programActivity.name,
                descripcion: programActivity.description,
                generar: programActivity.trigger,
                generarMedida: programActivity.triggerMeasure,
                generarValor: programActivity.triggerValue,
                mensajeActividadRetrasada: programActivity.delayedActivityMessage,
                estado: "draft",
                elimiando: false,
                fechaCreacion: new Date()
            });
          }));
        }
      }));

      return true;
    } catch (error) { 
      const exception = error as any;
      return new ProgramFailure(programFailuresEnum.serverError);
    }
  }

  async editProgram(program: IProgram): Promise<IProgram | ProgramFailure> {
    try {
      if (program.isDefault) {
        const snapshot = await supabase.from("Programa").select().eq("eliminado", false).eq("categoriaId", program.programCategoryId).eq("porDefecto", true).limit(1);

        if (snapshot.count && snapshot.count === 1) {
          await supabase.from("Programa").update({ porDefecto: false }).match({ programaId: snapshot.data[0].programId });
        }
      }

      program.validityStartDate = program.isThereValidityConstraint ? program.validityStartDate as Date ?? new Date() : null;
      program.validityEndDate = program.isThereValidityConstraint ? program.validityEndDate as Date ?? new Date() : null;
      program.updatedOn = new Date();

      await supabase.from("Programa").update(fromSupabaseToDocumentData(program)).match({ programaId: program.programId });

      return program;
    } catch (error) { 
      const exception = error as any;
      return new ProgramFailure(programFailuresEnum.serverError);
    }
  }

  async deleteProgram(programId: string): Promise<string | ProgramFailure> {
    try {
        await supabase.from("Programa").update({
          eliminado: true,
          fechaEliminacion: new Date()
        }).match({ programaId: programId });

        return programId;
    } catch (error) { 
      const exception = error as any;
      return new ProgramFailure(programFailuresEnum.serverError);
    }
  }

  async editProgramStatus(programId: string, status: string): Promise<string | ProgramFailure> {
    try {
        await supabase.from("Programa").update({
          estado: status,
          fechaActualizacion: new Date()
        }).match({ programaId: programId });

        return programId;
    } catch (error) { 
      const exception = error as any;
      return new ProgramFailure(programFailuresEnum.serverError);
    }
  }
}
