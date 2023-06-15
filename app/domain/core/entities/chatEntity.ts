import { IAlly } from "./allyEntity";
import { ISubject } from "./subjectEntity";
import { IUser } from "./userEntity";

export interface IChat {
    chatId: string;
    userId: string;
    user?: IUser;
    adminId: string;
    admin?: IUser;
    allyId: string;
    ally?: IAlly;
    subjectId: string;
    subject?: ISubject;
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
    subjectId: string;
    subject?: ISubject;
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
