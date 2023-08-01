import { ISpecialty } from "domain/core/entities/specialtyEntity";

export function specialtySupabaseToMap(data: any): ISpecialty {
    return {
      id: data?.id ?? 0,
      name: data?.nombre ?? "",
      doctorId: data?.doctorId ?? 0,
    } as ISpecialty;
}
  
export function fromSpecialtySupabaseDocumentData(specialty: ISpecialty): any {
  return {
    nombre: specialty.name,
    doctorId: specialty.doctorId,
  } as any;
}