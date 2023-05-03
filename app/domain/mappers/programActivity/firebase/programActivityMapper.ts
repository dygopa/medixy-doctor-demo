import { IProgramActivity, IProgramActivityLang } from "domain/core/entities/programActivityEntity";
import firebase from "firebase/app";

export function fromFirebaseMap(data: any): IProgramActivity {
  return {
    programActivityId: data?.programActivityId ?? "",
    programId: data?.programId ?? "",
    name: data?.title ?? "",
    index: data?.index ?? 0,
    trigger: data?.trigger ?? "",
    triggerMeasure: data?.triggerMeasure ?? "",
    triggerValue: data?.triggerValue ?? 0,
    startTrigger: data?.startTrigger ?? "",
    startTriggerMeasure: data?.startTriggerMeasure ?? "",
    startTriggerValue: data?.startTriggerValue ?? 0,
    untilTrigger: data?.untilTrigger ?? "",
    untilTriggerMeasure: data?.untilTriggerMeasure ?? "",
    untilTriggerValue: data?.untilTriggerValue ?? 0,
    type: data?.type ?? "",
    callToActions: data?.callToActions ?? [],
    gamificationPoints: data?.gamificationPoints ?? 0,
    marketPoints: data?.marketPoints ?? 0,
    status: data?.status ?? "",
    description: data?.description ?? "",
    videoUrl: data?.videoUrl ?? "",
    priority: data?.priority ?? "",
    isCritique: data?.isCritique ?? false,
    programActivityPriorityId: data?.programActivityPriorityId ?? 0,
    delayedActivityMessage: data?.delayedActivityMessage ?? "",
    isDelete: data?.isDelete ?? false,
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
  } as IProgramActivity;
}

export function formFirebaseToDocumentData(programActivity: IProgramActivity): firebase.firestore.DocumentData {
  const programActivityDocumentData = {
    programId: programActivity?.programId,
    programActivityId: programActivity?.programActivityId,
    title: programActivity?.name,
    index: programActivity?.index,
    trigger: programActivity?.trigger,
    triggerMeasure: programActivity?.triggerMeasure,
    triggerValue: programActivity?.triggerValue,
    startTrigger: programActivity?.startTrigger,
    startTriggerMeasure: programActivity?.startTriggerMeasure,
    startTriggerValue: programActivity?.startTriggerValue,
    untilTrigger: programActivity?.untilTrigger,
    untilTriggerMeasure: programActivity?.untilTriggerMeasure,
    untilTriggerValue: programActivity?.untilTriggerValue,
    type: programActivity?.type,
    callToActions: programActivity?.callToActions,
    gamificationPoints: programActivity?.gamificationPoints,
    marketPoints: programActivity?.marketPoints,
    status: programActivity?.status,
    description: programActivity?.description,
    videoUrl: programActivity?.videoUrl,
    isCritique: programActivity?.isCritique,
    priority: programActivity?.priority,
    programActivityPriorityId: programActivity?.programActivityPriorityId,
    isDelete: programActivity?.isDelete,
    createdOn: programActivity?.createdOn,
    updatedOn: programActivity?.updatedOn,
  } as firebase.firestore.DocumentData;

  return programActivityDocumentData;
}


export function fromProgramActivityLangFirebaseMap(data: any): IProgramActivityLang {
  return {
    langId: data?.langId ?? "",
    langCode: data?.langCode ?? "",
    name: data?.name ?? "",
    description: data?.description ?? "",
    callToActions: data?.callToActions ?? [],
    createdAt: data?.createdAt ?? null,
  } as IProgramActivityLang;
}

export function fromProgramActivityLangFirebaseToDocumentData(programActivityLang: IProgramActivityLang): firebase.firestore.DocumentData {
  const documentData = {
    langId: programActivityLang.langId,
    langCode: programActivityLang.langCode,
    name: programActivityLang.name,
    description: programActivityLang.description,
    callToActions: programActivityLang.callToActions,
    createdAt: programActivityLang.createdAt,
  } as firebase.firestore.DocumentData;

  return documentData;
}

