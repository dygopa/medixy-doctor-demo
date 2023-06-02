import { IUser } from "domain/core/entities/userEntity";

export function userAPIToMap(data: any): IUser {
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
    country: data?.birth_country ?? "",
    personType: data?.person_type ?? 0,
    role: data?.role ?? "",
    createdOn: data?.creation_date ?? null,
  } as IUser;
}
