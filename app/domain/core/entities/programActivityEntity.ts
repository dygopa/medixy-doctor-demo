import { ICallToAction } from "./callToActionEntity";

export interface IProgramActivityLangCallToActions {
    name: string;
}

export interface IProgramActivityLang {
    langId: string;
    programActivityId: string;
    langCode: string;
    name: string;
    description: string;
    callToActions: IProgramActivityLangCallToActions[],
    createdAt: any | null;
}


export interface IProgramActivity {
    programId: string;
    programActivityId: string;
    name: string;
    status: string;
    index: number;
    trigger: string;
    triggerMeasure: string;
    triggerValue: number;
    startTrigger: string;
    startTriggerMeasure: string;
    startTriggerValue: number;
    untilTrigger: string;
    untilTriggerMeasure: string;
    untilTriggerValue: number;
    type: string;
    callToActions: ICallToAction[];
    gamificationPoints: number;
    marketPoints: number;
    description: string;
    isCritique: boolean;
    priority: string;
    programActivityPriorityId: string;
    videoUrl: string;
    delayedActivityMessage: string;
    isDelete: boolean;
    createdOn: any | null;
    updatedOn: any | null;
}

