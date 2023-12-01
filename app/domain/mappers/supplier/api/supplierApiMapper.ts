import { ICreateSupplier, IPictureSupplier, ISupplier, IUpdateSupplier } from "domain/core/entities/supplierEntity";

export function supplierApiToEntity(data: any): ISupplier {
  return {
    supplierId: data?.id ?? 0,
    name: data?.name ?? "",
    email: data?.email ?? "",
    phoneNumber: data?.phone_number,
    typeSupplierId: data?.type_supplier_id ?? 1,
    pictureUrl: data?.avatar_url,
    createdOn: data?.creation_date ?? new Date()
  } as ISupplier;
}

export function supplierCreateEntityToMap(data: ICreateSupplier): any {
  return {
    name: data.doctor_name,
    supplier_name: data.name,
    supplier_email: data.email,
    phone_number: data.phoneNumber,
    email: data.doctor_email,
    type_supplier: data.typeSupplierId ?? 1,
    password: data.password,
  } as any;
}

export function supplierUpdateEntityToMap(data: IUpdateSupplier): any {
    return {
      name: data.name,
      email: data.email,
      phone_number: data.phoneNumber,
      type_supplier: data.typeSupplierId ?? 1,
    } as any;
}

export function supplierUpdatePictureEntityToMap(data: IPictureSupplier): any {
    return {
      data: data.data,
      type: data.type,
    } as any;
}