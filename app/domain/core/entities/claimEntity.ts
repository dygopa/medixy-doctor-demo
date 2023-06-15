import { IAlly } from "./allyEntity";
import { IOrder } from "./orderEntity";
import { ISubject } from "./subjectEntity";

export interface IClaim {
    claimId: string;
    claimNumber: string;
    subjectId: string;
    subject?: ISubject | null;
    allyId: string;
    ally?: IAlly | null;
    orderId: string;
    order?: IOrder | null;
    orderNumber: string;
    action: string;
    description: string;
    reason: string;
    claim: string;
    solution: string;
    status: string;
    type: string;
    country: string;
    adminAttented: string;
    closeDate: any | null;
    date: any | null;
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}

