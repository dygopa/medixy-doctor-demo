import { Specialist } from "domain/core/entities/specialists/specialist";
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

export function specialistDBToMap(data: any): Specialist {
  return {
    userId: data?.usuarioId ?? "",
    accountId: data?.id ?? "",
    names: data?.nombres ?? "",
    firstName: data?.primerApellido ?? "",
    lastName: data?.segundoApellido ?? "",
    phone: data?.telefono ?? "",
    status: data?.estado ?? 0,
    email: data?.email ?? "",
    curp: data?.curp ?? "",
    birthDate: data?.fechaNacimiento ?? "",
    sex: data?.sexo ?? 0,
    websiteUrl: data?.sitioWeb ?? "",
    avatar: data?.avatar ?? "",
    aboutMe: data?.acerca ?? "",
    shortDescription: data?.descripcionCorta ?? "",
    country: data?.paisNacimiento ?? "",
    personType: data?.tipoPersona ?? 0,
    pwaProfressionId: data?.profesionPQAId ?? 0,
    completedProfile: data?.perfilCompletado ?? false,
    professionalLicense: data?.cedulaProfesional ?? "",
    professionalLicenseInstitution: data?.institucionCedulaProfesional ?? "",
    specialities: data?.EspecialidadesDoctores ?? "",
  } as Specialist;
}