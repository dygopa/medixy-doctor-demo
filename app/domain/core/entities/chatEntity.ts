import { IAlly } from "./allyEntity";
import { IPatient } from "./patientEntity";
import { IUser } from "./userEntity";

export interface IChat {
    chatId: string;
    userId: string;
    user?: IUser;
    adminId: string;
    admin?: IUser;
    allyId: string;
    ally?: IAlly;
    patientId: string;
    patient?: IPatient;
    messagesForRead: number;
    chatType: string;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}

export interface IFile {
    url: string;
    file: any;
    name: string;
    type: string;
    extension: string;
}

export interface IMessage {
    messageId: string;
    userId: string;
    user?: IUser;
    adminId: string;
    admin?: IUser;
    allyId: string;
    ally?: IAlly;
    patientId: string;
    patient?: IPatient;
    userDestId: string;
    text: string;
    file: IFile;
    isLoading: boolean;
    hasError: boolean;
    createdOn: any | null;
    readOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}
