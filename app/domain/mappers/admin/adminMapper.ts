import { IAdmin } from "domain/core/entities/adminEntity";


export function adminAPIToMap(data: any): IAdmin {
  return {
    id: data?.id ?? "",
    userId: data?.user_id ?? "",
    names: data?.names ?? "",
    lastname: data?.first_lastname ?? "",
    phoneNumber: data?.phone_number ?? "",
    email: data?.email ?? "",
    avatar: data?.avatar_url ?? "",
    role: data?.role ?? "",
    createdOn: data?.creation_date ?? null,
  } as IAdmin;
}