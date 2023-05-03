import { ICallToAction } from "../entities/callToActionEntity";

export interface IGetCallToActionsResponse {
    data: ICallToAction[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
