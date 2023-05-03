import { ICallToAction } from "domain/core/entities/callToActionEntity";

export function fromCallToActionSupabaseMap(data: any): ICallToAction {
  return {
    ctaId: data?.ctaId ?? "",
    name: data?.nombre ?? "",
    type: data?.tipo ?? "",
    data: data?.data ?? "",
    target: data?.objetivo ?? [],
  } as ICallToAction;
}

export function fromCallToActionSupabaseToDocumentData(callToAction: ICallToAction): any {
  const callToActionDocumentData = {
    nombre: callToAction?.name,
    tipo: callToAction?.type,
    data: callToAction?.data,
    objetivo: callToAction?.target,
  } as any;

  return callToActionDocumentData;
}
