import { ITip, ITipAnalytic, ITipFeatures } from "domain/core/entities/tipEntity";
import firebase from "firebase/app";

export function fromTipFirebaseMap(data: any): ITip {
  const features: ITipFeatures = {
    species: data?.features?.species ?? "",
    breed: data?.features?.breed ?? "",
  }

  return {
    tipId: data?.tipId ?? "",
    index: data?.index ?? 0,
    status: data?.status ?? "",
    description: data?.description ?? "",
    type: data?.type ?? "",
    title: data?.title ?? "",
    action: data?.action ?? "",
    repeatPost: data?.repeatPost ?? false,
    features: features,
    callToActions: data?.callToActions ?? [],
    mainProgramCategoryId: data?.mainProgramCategoryId ?? "",
    programCategoryId: data?.programCategoryId ?? "",
    isDelete: data?.isDelete ?? false,
    date: data?.date ?? null,
    createdOn: data?.createdOn ?? null,
    updatedOn: data?.updatedOn ?? null,
  } as ITip;
}

export function fromTipAnalyticFirebaseMap(data: any): ITipAnalytic {
  const features: ITipFeatures = {
    species: data?.features?.species ?? "",
    breed: data?.features?.breed ?? "",
  }

  return {
    tipAnalyticId: data?.tipAnalyticId ?? "",
    tipsCount: data?.tipsCount ?? 0,
    features: features,
    createdOn: data?.createdOn ?? null,
    updatedOn: data?.updatedOn ?? null,
  } as ITipAnalytic;
}

export function fromTipFirebaseToDocumentData(tip: ITip): firebase.firestore.DocumentData {
  const documentData = {
    tipId: tip.tipId,
    index: tip.index,
    status: tip.status,
    title: tip.title,
    description: tip.description,
    type: tip.type,
    callToActions: tip.callToActions,
    mainProgramCategoryId: tip.mainProgramCategoryId,
    programCategoryId: tip.programCategoryId,
    repeatPost: tip.repeatPost,
    features: tip.features,
    isDelete: tip.isDelete,
    date: tip.date,
    createdOn: tip.createdOn,
    updatedOn: tip.updatedOn,
  } as firebase.firestore.DocumentData;

  return documentData;
}

export function fromTipAnalyticFirebaseToDocumentData(tipAnalytic: ITipAnalytic): firebase.firestore.DocumentData {
  const documentData = {
    tipAnalyticId: tipAnalytic.tipAnalyticId,
    tipsCount: tipAnalytic.tipsCount,
    features: tipAnalytic.features,
    createdOn: tipAnalytic.createdOn,
    updatedOn: tipAnalytic.updatedOn,
  } as firebase.firestore.DocumentData;

  return documentData;
}
