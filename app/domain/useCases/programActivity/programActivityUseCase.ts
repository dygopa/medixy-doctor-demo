import { IProgramActivity, IProgramActivityLang } from "domain/core/entities/programActivityEntity";
import { ProgramActivityFailure } from "domain/core/failures/programActivity/programActivityFailure";
import { IGetProgramsActivitiesResponse } from "domain/core/response/programsResponse";
import { ProgramActivityRepository } from "infrastructure/repositories/programActivity/programActivityRepository";

export default class ProgramActivityUseCase {
  private _repository: ProgramActivityRepository = new ProgramActivityRepository();

  async getProgramActivities(obj: { programId: string; skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, status?: string | undefined, isDelete?: boolean | undefined; minIndex?: number | undefined; maxIndex?: number | undefined; startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetProgramsActivitiesResponse> {
    try {
      const response = await this._repository.getProgramActivities({ programId: obj.programId, skip: obj.skip, sort: obj.sort, searchQuery: obj.searchQuery, limit: obj.limit, country: obj.country, status: obj.status, startDate: obj.startDate, endDate: obj.endDate, isDelete: obj.isDelete, minIndex: obj.minIndex, maxIndex: obj.maxIndex });

      if (response instanceof ProgramActivityFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createProgramActivity(programId: string, programActivity: IProgramActivity): Promise<IProgramActivity> {
    try {
      const response = await this._repository.createProgramActivity(programId, programActivity);

      if (response instanceof ProgramActivityFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editProgramActivity(programActivity: IProgramActivity): Promise<IProgramActivity> {
    try {
      const response = await this._repository.editProgramActivity(programActivity);

      if (response instanceof ProgramActivityFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProgramActivityById(programId: string, programActivityId: string): Promise<IProgramActivity> {
    try {
      const response = await this._repository.getProgramActivityById(programId, programActivityId);

      if (response instanceof ProgramActivityFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteProgramActivity(programId: string, programActivityId: string): Promise<string> {
    try {
      const response = await this._repository.deleteProgramActivity(programId, programActivityId);

      if (response instanceof ProgramActivityFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editProgramActivityStatus(programId: string, programActivityId: string, status: string): Promise<string> {
    try {
      const response = await this._repository.editProgramActivityStatus(programId, programActivityId, status);

      if (response instanceof ProgramActivityFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProgramLangActivityById(programId: string, programActivityId: string, langCode: string): Promise<IProgramActivityLang> {
    try {
      const response = await this._repository.getProgramActivityLangById(programId, programActivityId, langCode);

      if (response instanceof ProgramActivityFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createProgramLangActivity(programId: string, programActivityId: string, programActivityLang: IProgramActivityLang): Promise<IProgramActivityLang> {
    try {
      const response = await this._repository.createProgramActivityLang(programId, programActivityId, programActivityLang);

      if (response instanceof ProgramActivityFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
