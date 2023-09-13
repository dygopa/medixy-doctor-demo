export interface INotification {
    id: string | number;
    title: string;
    body: string;
    topic: string;
    read: boolean;
    data?: any | null;
    date: string;
    notification_type_id: number;
    notification_type: ITypeNotification;
    user_id: string | number;
}

interface ITypeNotification {
    id: number;
    type: string;
}

export interface INotificationLang {
    langId: string;
    notificationId: string;
    langCode: string;
    message: string;
    createdAt: any | null;
}
