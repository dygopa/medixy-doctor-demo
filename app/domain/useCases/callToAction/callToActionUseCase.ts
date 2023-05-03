import { CallToActionFailure } from "domain/core/failures/callToAction/callToActionFailure";
import { IGetCallToActionsResponse } from "domain/core/response/callToActionsResponse";
import { CallToActionRepository } from "infrastructure/repositories/callToAction/callToActionRepository";

export default class CallToActionUseCase {
  private _repository: CallToActionRepository = new CallToActionRepository();

  async getCallToActions(obj: { skip?: number | undefined; sort?: any | undefined; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetCallToActionsResponse> {
    try {
      const response = await this._repository.getCallToActions({ skip: obj.skip, sort: obj.sort, searchQuery: obj.searchQuery, limit: obj.limit, country: obj.country, startDate: obj.startDate, endDate: obj.endDate });

      if (response instanceof CallToActionFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
