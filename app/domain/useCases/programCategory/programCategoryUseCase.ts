import { ProgramCategoryFailure } from "domain/core/failures/programCategory/programCategoryFailure";
import { IGetProgramCategoriesResponse } from "domain/core/response/programsResponse";
import { ProgramCategoryRepository } from "infrastructure/repositories/programCategory/programCategoryRepository";

export default class ProgramCategoryUseCase {
  private _repository: ProgramCategoryRepository = new ProgramCategoryRepository();

  async getMainProgramCategories(obj: { skip?: number | undefined; sort?: any | undefined; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramCategoriesResponse> {
    try {
      const response = await this._repository.getMainProgramCategories({ skip: obj.skip, sort: obj.sort, searchQuery: obj.searchQuery, limit: obj.limit, country: obj.country, startDate: obj.startDate, endDate: obj.endDate });

      if (response instanceof ProgramCategoryFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProgramCategoriesByMain(obj: { parentId: string; skip?: number | undefined; sort?: any | undefined; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramCategoriesResponse> {
    try {
      const response = await this._repository.getProgramCategoriesByMain({ parentId: obj.parentId, skip: obj.skip, sort: obj.sort, searchQuery: obj.searchQuery, limit: obj.limit, country: obj.country, startDate: obj.startDate, endDate: obj.endDate });

      if (response instanceof ProgramCategoryFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
