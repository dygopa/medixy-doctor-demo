import { IProgramActivity } from "domain/core/entities/programActivityEntity";
import { IProgram, IProgramFeatures, IProgramLang, IProgramPrice } from "domain/core/entities/programEntity";
import firebase from "firebase/app";

export function fromProgramPriceFirebaseMap(data: any): IProgramPrice {
  return {
    price: data?.price ?? 0,
    currency: data?.currency ?? "$",
    country: data?.country ?? "",
  } as IProgramPrice;
}

export function fromFirebaseMap(data: any, programActivities?: IProgramActivity[] | null): IProgram {
  const programFeatures: IProgramFeatures = {}

  const programPrices: IProgramPrice[] = [];

  if (data?.prices?.length > 0) {
    data.prices.forEach((price: any) => {
      const priceMap: IProgramPrice = fromProgramPriceFirebaseMap(price);
      programPrices.push(priceMap);
    });
  }

  return {
    programId: data?.programId ?? "",
    programCategoryId: data?.programCategoryId ?? "",
    name: data?.name ?? "",
    programActivities: programActivities ?? [],
    status: data?.status ?? "",
    description: data?.description ?? "",
    isDefault: data?.isDefault ?? false,
    isThereValidityConstraint: data?.isThereValidityConstraint ?? false,
    validityStartDate: data?.validityStartDate ?? null,
    validityEndDate: data?.validityEndDate ?? null,
    contractType: data?.contractType ?? "",
    videoUrl: data?.videoUrl ?? "",
    prices: programPrices,
    tags: data?.tags ?? [],
    features: programFeatures,
    isDelete: data?.isDelete ?? false,
    createdOn: data?.createdOn ?? null,
    updatedOn: data?.updatedOn ?? null,
  } as IProgram;
}

export function fromFirebaseToDocumentData(program: IProgram): firebase.firestore.DocumentData {
  const programJSON = {
    programId: program.programId,
    programCategoryId: program.programCategoryId,
    name: program.name,
    status: program.status,
    description: program.description,
    isThereValidityConstraint: program.isThereValidityConstraint,
    validityStartDate: program.validityStartDate,
    validityEndDate: program.validityEndDate,
    contractType: program.contractType,
    isDefault: program.isDefault,
    videoUrl: program.videoUrl,
    prices: program.prices,
    tags: program.tags ?? [],
    features: {},
    isDelete: program.isDelete,
    createdOn: program.createdOn,
    updatedOn: program.updatedOn,
  } as firebase.firestore.DocumentData;

  return programJSON;
}


export function fromProgramLangFirebaseMap(data: any): IProgramLang {
  return {
    langId: data?.langId ?? "",
    langCode: data?.langCode ?? "",
    name: data?.name ?? "",
    description: data?.description ?? "",
    createdAt: data?.createdAt ?? null,
  } as IProgramLang;
}

export function fromProgramLangFirebaseToDocumentData(programLang: IProgramLang): firebase.firestore.DocumentData {
  const documentData = {
    langId: programLang.langId,
    langCode: programLang.langCode,
    name: programLang.name,
    description: programLang.description,
    createdAt: programLang.createdAt,
  } as firebase.firestore.DocumentData;

  return documentData;
}

