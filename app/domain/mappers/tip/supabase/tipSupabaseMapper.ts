import { ITip, ITipAnalytic, ITipFeatures } from "domain/core/entities/tipEntity";

export function fromTipSupabaseMap(data: any): ITip {
  const features: ITipFeatures = {
    species: data?.features?.species ?? "",
    breed: data?.features?.breed ?? "",
  }

  return {
    tipId: data?.consejoId ?? "",
    index: data?.indice ?? 0,
    status: data?.estado ?? "",
    description: data?.descripcion ?? "",
    type: data?.tipo ?? "",
    title: data?.titulo ?? "",
    action: data?.accion ?? "",
    repeatPost: data?.repetirConsejo ?? false,
    features: features,
    callToActions: data?.acciones ?? [],
    mainProgramCategoryId: data?.padreCategoriaId ?? "",
    programCategoryId: data?.categoriaId ?? "",
    isDelete: data?.eliminacion ?? false,
    date: data?.fecha ? new Date(data.fecha) : null,
    createdOn: data?.fechaCreacion ? new Date(data.fechaCreacion) : null,
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : null,
  } as ITip;
}

export function fromTipAnalyticSupabaseMap(data: any): ITipAnalytic {
  const features: ITipFeatures = {
    species: data?.features?.species ?? "",
    breed: data?.features?.breed ?? "",
  }

  return {
    tipAnalyticId: data?.consejoAnaliticaId ?? "",
    tipsCount: data?.cantidadConsejos ?? 0,
    features: features,
    createdOn: data?.fechaCreacion ? new Date(data.fechaCreacion) : null,
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : null,
  } as ITipAnalytic;
}

export function fromTipSupabaseToDocumentData(tip: ITip): any {
  const documentData = {
    indice: tip.index,
    estado: tip.status,
    titulo: tip.title,
    descripcion: tip.description,
    tipo: tip.type,
    acciones: tip.callToActions,
    categoriaPadreId: tip.mainProgramCategoryId,
    categoriaId: tip.programCategoryId,
    repetirConsejo: tip.repeatPost,
    caracteristicas: tip.features,
    eliminado: tip.isDelete,
    fecha: tip.date,
    fechaCreacion: tip.createdOn,
    fechaActualizacion: tip.updatedOn,
  } as any;

  return documentData;
}

export function fromTipAnalyticSupabaseToDocumentData(tipAnalytic: ITipAnalytic): any {
  const documentData = {
    cantidadConsejos: tipAnalytic.tipsCount,
    caracteristicas: tipAnalytic.features,
    fechaCreacion: tipAnalytic.createdOn,
    fechaActualizacion: tipAnalytic.updatedOn,
  } as any;

  return documentData;
}
