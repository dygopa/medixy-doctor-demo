import { IUser } from "domain/core/entities/userEntity";

export function userAPIToMap(data: any, type?: number): IUser {
  return {
    userId: data?.id ?? "",
    accountId: data?.user_id ?? "",
    names: data?.names ?? "",
    firstName: data?.first_lastname ?? "",
    lastName: data?.second_lastname ?? "",
    phone: data?.phone_number ?? "",
    status: data?.status ?? 0,
    email: data?.email ?? "",
    curp: data?.curp ?? "",
    birthDate: data?.birth_date ?? "",
    sex: data?.sex ?? 0,
    websiteUrl: data?.website_url ?? "",
    avatar: data?.avatar_url ?? "",
    address: data?.address ?? "",
    aboutMe: data?.about_me ?? "",
    shortDescription: data?.short_description ?? null,
    country: data?.birth_country ?? "",
    personType: data?.person_type ?? 0,
    role: data?.role ?? "",
    createdOn: data?.creation_date ?? null,
    professionPQA: data?.pwa_profession ?? {name: "Sin profesión", id: 0},
    pwaProfressionId: data?.pwa_profession_id ?? 0,
    pwaProfression: "",
    professionalLicense: data?.professional_license ?? "",
    professionalLicenseInstitution: data?.professional_license_institution ?? "",
    typeUser: type ?? 1,
  } as IUser;
}

export function userSupabaseToMap(data: any): IUser {
  return {
    userId: data?.id ?? "",
    accountId: data?.usuarioId ?? "",
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
    address: data?.direccion ?? "",
    aboutMe: data?.acerca ?? "",
    country: data?.paisNacimiento ?? "",
    personType: data?.tipoPersona ?? 0,
    role: data?.role ?? "",
    createdOn: data?.fechaRegistro ?? null,
    pwaProfressionId: data?.profesionPQAId ?? 0,
    professionalLicense: data?.cedulaProfecional ?? "",
    professionalLicenseInstitution: data?.institucionCedulaProfecional ?? "",
  } as IUser;
}