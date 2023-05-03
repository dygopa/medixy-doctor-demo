import { IProgram, IProgramLang } from "domain/core/entities/programEntity";
import { ProgramFailure } from "domain/core/failures/program/programFailure";
import { IGetProgramsResponse } from "domain/core/response/programsResponse";
import { ProgramRepository } from "infrastructure/repositories/program/programRepository";

export default class ProgramUseCase {
  private _repository: ProgramRepository = new ProgramRepository();

  async getPrograms(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; isDelete?: boolean | undefined; searchQuery?: string | undefined; country?: string | undefined, status?: string | undefined, programCategory?: string | undefined, isDefault?: boolean | undefined; startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramsResponse> {
    try {
      const response = await this._repository.getPrograms({ skip: obj.skip, sort: obj.sort, searchQuery: obj.searchQuery, isDelete: obj.isDelete, limit: obj.limit, country: obj.country, status: obj.status, isDefault: obj.isDefault, programCategory: obj.programCategory, startDate: obj.startDate, endDate: obj.endDate });

      if (response instanceof ProgramFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProgramById(programId: string): Promise<IProgram> {
    try {
      const response = await this._repository.getProgramById(programId);

      if (response instanceof ProgramFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProgramLangById(programId: string, langCode: string): Promise<IProgramLang> {
    try {
      const response = await this._repository.getProgramLangById(programId, langCode);

      if (response instanceof ProgramFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createProgram(program: IProgram): Promise<IProgram> {
    try {
      const response = await this._repository.createProgram(program);

      if (response instanceof ProgramFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createProgramLang(programId: string, programLang: IProgramLang): Promise<IProgramLang> {
    try {
      const response = await this._repository.createProgramLang(programId, programLang);

      if (response instanceof ProgramFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createProgramWithExcel(programs: IProgram[]): Promise<boolean> {
    try {
      const response = await this._repository.createProgramsWithExcel(programs);

      if (response instanceof ProgramFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editProgram(program: IProgram): Promise<IProgram> {
    try {
      const response = await this._repository.editProgram(program);

      if (response instanceof ProgramFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteProgram(programId: string): Promise<string> {
    try {
      const response = await this._repository.deleteProgram(programId);

      if (response instanceof ProgramFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editProgramStatus(programId: string, status: string): Promise<string> {
    try {
      const response = await this._repository.editProgramStatus(programId, status);

      if (response instanceof ProgramFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
