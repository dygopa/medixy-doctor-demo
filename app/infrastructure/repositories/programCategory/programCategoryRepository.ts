import { IProgramCategory } from 'domain/core/entities/programCategoryEntity';
import { programActivityFailuresEnum } from 'domain/core/failures/programActivity/programActivityFailure';
import { ProgramCategoryFailure } from 'domain/core/failures/programCategory/programCategoryFailure';
import { IGetProgramCategoriesResponse } from 'domain/core/response/programsResponse';
import { programCategorySupabaseToMap } from 'domain/mappers/programCategory/supabase/programCategoryMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface IProgramCategoryRepository {
    getMainProgramCategories(obj: { skip?: number | undefined; sort?: any | undefined; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramCategoriesResponse | ProgramCategoryFailure>;
    getProgramCategoriesByMain(obj: { parentId: string; skip?: number | undefined; sort?: any | undefined; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramCategoriesResponse | ProgramCategoryFailure>;
}

export class ProgramCategoryRepository implements IProgramCategoryRepository {
  async getMainProgramCategories(obj: { skip?: number | undefined; sort?: any | undefined; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramCategoriesResponse | ProgramCategoryFailure> {
    try {
        let query = supabase.from("CategoriaPrograma").select().eq("nivel", 1);

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

        const programsCategories: IProgramCategory[] = [];

        if (snapshots.data && snapshots.data.length > 0) {
          snapshots.data.forEach((snapshot: any) => {
            const programCategoryMap: IProgramCategory = programCategorySupabaseToMap(snapshot);
            
            if (programCategoryMap.programCategoryId.length > 0 && programCategoryMap.level > 0) programsCategories.push(programCategoryMap);
          });
        }

        const response: IGetProgramCategoriesResponse = {
            data: programsCategories,
            metadata: {
              total: 0,
              limit: obj.limit ?? null,
            }
        }
  
        return JSON.parse(JSON.stringify(response));
    } catch (error) { 
      const exception = error as any;
      return new ProgramCategoryFailure(programActivityFailuresEnum.serverError);
    }
  }

  async getProgramCategoriesByMain(obj: { parentId: string; skip?: number | undefined; sort?: any | undefined; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramCategoriesResponse | ProgramCategoryFailure> {
    try {
        let query = supabase.from("CategoriaPrograma").select().eq("padreCategoriaId", obj.parentId);

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

        const programsCategories: IProgramCategory[] = [];

        if (snapshots.data && snapshots.data.length > 0) {
          snapshots.data.forEach((snapshot: any) => {
            const programCategoryMap: IProgramCategory = programCategorySupabaseToMap(snapshot);
            
            if (programCategoryMap.programCategoryId.length > 0 && programCategoryMap.level > 0) programsCategories.push(programCategoryMap);
          });
        }

        const response: IGetProgramCategoriesResponse = {
            data: programsCategories,
            metadata: {
              total: 0,
              limit: obj.limit ?? null,
            }
        }
  
        return JSON.parse(JSON.stringify(response));
    } catch (error) { 
      const exception = error as any;
      return new ProgramCategoryFailure(programActivityFailuresEnum.serverError);
    }
  }
}
