import { ITip, ITipFeatures } from "domain/core/entities/tipEntity";
import { TipFailure } from "domain/core/failures/tip/tipFailure";
import { IGetTipsResponse } from "domain/core/response/tipsResponse";
import { TipRepository } from "infrastructure/repositories/tip/tipRepository";

export default class TipUseCase {
  private _repository: TipRepository = new TipRepository();

  async getTips(obj: { limit?: number; skip?: number | string; sort?: any; searchQuery?: string; isDelete?: boolean; country?: string; status?: string,  startDate?: Date; endDate?: Date }): Promise<IGetTipsResponse> {
    try {
      const response = await this._repository.getTips({ skip: obj.skip, sort: obj.sort, isDelete: obj.isDelete, searchQuery: obj.searchQuery, limit: obj.limit, country: obj.country, status: obj.status, startDate: obj.startDate, endDate: obj.endDate });

      if (response instanceof TipFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTipById(tipId: string): Promise<ITip> {
    try {
      const response = await this._repository.getTipById(tipId);

      if (response instanceof TipFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createTip(tip: ITip): Promise<ITip> {
    try {
      const response = await this._repository.createTip(tip);

      if (response instanceof TipFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editTip(tip: ITip): Promise<ITip> {
    try {
      const response = await this._repository.editTip(tip);

      if (response instanceof TipFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteTip(tipId: string): Promise<string> {
    try {
      const response = await this._repository.deleteTip(tipId);

      if (response instanceof TipFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editTipStatus(tipId: string, status: string): Promise<string> {
    try {
      const response = await this._repository.editTipStatus(tipId, status);

      if (response instanceof TipFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
