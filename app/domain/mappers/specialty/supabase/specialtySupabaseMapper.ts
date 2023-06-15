import { ISpecialty } from "domain/core/entities/specialtyEntity";

export function specialtySupabaseToMap(data: any): ISpecialty {
    return {
      id: data?.id ?? 0,
      name: data?.nombre ?? "",
    } as ISpecialty;
}
  