import { IProgramActivity, IProgramActivityLang } from "domain/core/entities/programActivityEntity";

export function fromSupabaseMap(data: any): IProgramActivity {
  return {
    programId: data?.programaId ?? "",
    programActivityId: data?.actividadId ?? "",
    name: data?.titulo ?? "",
    index: data?.indice ?? 0,
    trigger: data?.generar ?? "",
    triggerMeasure: data?.generarMedida ?? "",
    triggerValue: data?.generarValor ?? 0,
    startTrigger: data?.generarInicio ?? "",
    startTriggerMeasure: data?.generarMedidaInicio ?? "",
    startTriggerValue: data?.generarValorInicio ?? 0,
    untilTrigger: data?.generarFinal ?? "",
    untilTriggerMeasure: data?.generarMedidaFinal ?? "",
    untilTriggerValue: data?.generarValorFinal ?? 0,
    type: data?.tipo ?? "",
    callToActions: data?.acciones ?? [],
    gamificationPoints: data?.puntosGamificacion ?? 0,
    marketPoints: data?.puntosMercado ?? 0,
    status: data?.estado ?? "",
    description: data?.descripcion ?? "",
    videoUrl: data?.urlVideo ?? "",
    priority: data?.prioridad ?? "",
    isCritique: data?.critico ?? false,
    programActivityPriorityId: data?.actividadPrioridadId ?? 0,
    delayedActivityMessage: data?.mensajeActividadRetrasada ?? "",
    isDelete: data?.eliminado ?? false,
    createdOn: data?.fechaCreacion ?? new Date(),
    updatedOn: data?.fechaActualizacion ?? new Date(),
  } as IProgramActivity;
}

export function formSupabaseToDocumentData(programActivity: IProgramActivity): any {
  const programActivityDocumentData = {
    programaId: programActivity?.programId,
    titulo: programActivity?.name,
    indice: programActivity?.index,
    generar: programActivity?.trigger,
    generarMedida: programActivity?.triggerMeasure,
    generarValor: programActivity?.triggerValue,
    generarInicio: programActivity?.startTrigger,
    generarMedidaInicio: programActivity?.startTriggerMeasure,
    generarValorInicio: programActivity?.startTriggerValue,
    generarFinal: programActivity?.untilTrigger,
    generarMedidaFinal: programActivity?.untilTriggerMeasure,
    generarValorFinal: programActivity?.untilTriggerValue,
    tipo: programActivity?.type,
    acciones: programActivity?.callToActions,
    puntosGamificacion: programActivity?.gamificationPoints,
    puntosMercado: programActivity?.marketPoints,
    estado: programActivity?.status,
    descripcion: programActivity?.description,
    urlVideo: programActivity?.videoUrl,
    critico: programActivity?.isCritique,
    prioridad: programActivity?.priority,
    actividadPrioridadId: programActivity?.programActivityPriorityId?.length > 0 ? programActivity?.programActivityPriorityId : null,
    eliminado: programActivity?.isDelete,
    fechaCreacion: programActivity?.createdOn,
    fechaActualizacion: programActivity?.updatedOn,
  } as any;

  return programActivityDocumentData;
}


export function fromProgramActivityLangSupabaseMap(data: any): IProgramActivityLang {
  return {
    langId: data?.lenguajeId ?? "",
    programActivityId: data?.actividadId ?? "",
    langCode: data?.lenguajeCodigo ?? "",
    name: data?.nombre ?? "",
    description: data?.descripcion ?? "",
    callToActions: data?.acciones ?? [],
    createdAt: data?.fechaCreacion ?? null,
  } as IProgramActivityLang;
}

export function fromProgramActivityLangSupabaseToDocumentData(programActivityLang: IProgramActivityLang): any {
  const documentData = {
    lenguajeCodigo: programActivityLang.langCode,
    actividadId: programActivityLang.programActivityId,
    nombre: programActivityLang.name,
    descripcion: programActivityLang.description,
    acciones: programActivityLang.callToActions,
    fechaCreacion: programActivityLang.createdAt,
  } as any;

  return documentData;
}

