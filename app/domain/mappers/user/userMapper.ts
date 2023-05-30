import { IUser } from "domain/core/entities/userEntity";

export function userAPIToMap(data: any): IUser {
  return {
    userId: data?.id ?? "",
    accountId: data?.user_id ?? "",
    names: data?.names ?? "",
    firstName: data?.first_lastname ?? "",
    lastName: data?.second_lastname ?? "",
    status: data?.status ?? 0,
    email: data?.email ?? "",
    curp: data?.curp ?? "",
    birthDate: data?.birth_date ?? "",
    avatar: data?.avatar_url ?? "",
    address: data?.address ?? "",
    aboutMe: data?.about_me ?? "",
    country: data?.birth_country ?? "",
    role: data?.role ?? "",
    createdOn: data?.creation_date ?? null,
    phone: data?.phone_number ?? "",
    //sex: data?.sex ?? "",
  } as IUser;
}
