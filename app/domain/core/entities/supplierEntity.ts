import { IUser } from "./userEntity";

export interface ISupplier {
    supplierId: number;
    name: string;
    email: string;
    typeSupplierId: number;
    phoneNumber?: string | null;
    pictureUrl?: string | null;
    doctor?: IUser | null;
    createdOn: Date;
    updatedOn: Date | null;
    deletedOn: Date | null;
}

export interface ICreateSupplier {
    name: string;
    email: string;
    typeSupplierId: number;
    phoneNumber?: string | null;
    pictureUrl?: string | null;
    doctor_name: string;
    doctor_email: string;
    password: string
    picture?: IPictureSupplier | null;
}

export interface IUpdateSupplier {
    name: string;
    email: string;
    typeSupplierId: number;
    phoneNumber?: string | null;
    picture?: IPictureSupplier | null;
}

export interface IPictureSupplier {
    type: string;
    data: string;
}