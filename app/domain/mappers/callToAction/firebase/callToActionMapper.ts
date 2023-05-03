import firebase from "firebase/app";
import { ICallToAction } from "domain/core/entities/callToActionEntity";

export function fromCallToActionFirebaseMap(data: any): ICallToAction {
  return {
    ctaId: data?.ctaId ?? "",
    name: data?.nombre ?? "",
    type: data?.tipo ?? "",
    data: data?.data ?? "",
    target: data?.objetivo ?? [],
  } as ICallToAction;
}

export function fromCallToActionFirebaseToDocumentData(callToAction: ICallToAction): firebase.firestore.DocumentData {
  const callToActionDocumentData = {
    ctaId: callToAction?.ctaId,
    nombre: callToAction?.name,
    tipo: callToAction?.type,
    data: callToAction?.data,
    objetivo: callToAction?.target,
  } as firebase.firestore.DocumentData;

  return callToActionDocumentData;
}
