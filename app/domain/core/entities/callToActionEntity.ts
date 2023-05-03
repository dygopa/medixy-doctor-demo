export interface ICallToActionData {
    programActivityId?: string | null;
    tipId?: string | null;
}

export interface ICallToAction {
    ctaId: string;
    index: number;
    name: string;
    type: string;
    data: ICallToActionData;
    target?: string[] | null,
}