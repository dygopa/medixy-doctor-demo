export interface INotification {
    notificationId: string;
    action: string;
    message: string;
    source: string;
    sourceId: string;
    whom: string;
    status: string;
    trigger: string;
    triggerValue: number;
    triggerMeasure: string;
    type: string;
    fromWhere: string;
    endPoints: string[];
    isDelete: boolean;
    createdOn: any | null;
    updatedOn: any | null;
}

export interface INotificationLang {
    langId: string;
    notificationId: string;
    langCode: string;
    message: string;
    createdAt: any | null;
}
