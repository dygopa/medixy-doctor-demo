import { IProgramActivity } from "domain/core/entities/programActivityEntity";
import { IProgram, IProgramFeatures, IProgramLang, IProgramPrice } from "domain/core/entities/programEntity";

export function fromProgramPriceSupabaseMap(data: any): IProgramPrice {
  return {
    price: data?.precio ?? 0,
    currency: data?.moneda ?? "$",
    country: data?.pais ?? "",
  } as IProgramPrice;
}

export function fromSupabaseMap(data: any, programActivities?: IProgramActivity[] | null): IProgram {
  const programFeatures: IProgramFeatures = {}

  const programPrices: IProgramPrice[] = [];

  if (data?.prices?.length > 0) {
    data.prices.forEach((price: any) => {
      const priceMap: IProgramPrice = fromProgramPriceSupabaseMap(price);
      programPrices.push(priceMap);
    });
  }

  return {
    programId: data?.programaId ?? "",
    programCategoryId: data?.categoriaId ?? "",
    name: data?.nombre ?? "",
    programActivities: programActivities ?? [],
    status: data?.estado ?? "",
    description: data?.descripcion ?? "",
    isDefault: data?.porDefecto ?? false,
    isThereValidityConstraint: data?.hayRestriccionValidez ?? false,
    validityStartDate: data?.restriccionFechaInicial ?? null,
    validityEndDate: data?.restriccionFechaFinal ?? null,
    contractType: data?.tipoContrato ?? "",
    videoUrl: data?.urlVideo ?? "",
    prices: programPrices,
    tags: data?.etiquetas ?? [],
    features: programFeatures,
    isDelete: data?.eliminado ?? false,
    createdOn: data?.fechaCreacion ?? null,
    updatedOn: data?.fechaActualizacion ?? null,
  } as IProgram;
}

export function fromSupabaseToDocumentData(program: IProgram): any {
  const programJSON = {
    categoriaId: program.programCategoryId,
    nombre: program.name,
    estado: program.status,
    descripcion: program.description,
    hayRestriccionValidez: program.isThereValidityConstraint,
    restriccionFechaInicial: program.validityStartDate,
    restriccionFechaFinal: program.validityEndDate,
    tipoContrato: program.contractType,
    porDefecto: program.isDefault,
    urlVideo: program.videoUrl,
    precios: program.prices,
    tipo: "general",
    etiquetas: program.tags ?? [],
    caracteristicas: {},
    eliminado: program.isDelete,
    fechaCreacion: program.createdOn,
    fechaActualizacion: program.updatedOn,
  } as any;

  return programJSON;
}


export function fromProgramLangSupabaseMap(data: any): IProgramLang {
  return {
    langCode: data?.lenguajeCodigo ?? "",
    name: data?.nombre ?? "",
    description: data?.descripcion ?? "",
    createdAt: data?.fechaCreacion ?? null,
  } as IProgramLang;
}

export function fromProgramLangSupabaseToDocumentData(programLang: IProgramLang): any {
  const documentData = {
    lenguajeCodigo: programLang.langCode,
    programaId: programLang.programId,
    nombre: programLang.name,
    descripcion: programLang.description,
    fechaCreacion: programLang.createdAt,
  } as any;

  return documentData;
}

