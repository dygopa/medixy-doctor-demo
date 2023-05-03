import { IAlly } from "./allyEntity";

export interface IContent {
    contentId: string;
    allyId: string;
    ally?: IAlly | null;
    comment: string;
    description: string;
    category: string;
    price: number | null;
    isApproved: boolean;
    likes: number;
    country: string;
    status: string;
    title: string;
    imageUrl: string;
    adminAttended: string;
    closeDate: any | null;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}

