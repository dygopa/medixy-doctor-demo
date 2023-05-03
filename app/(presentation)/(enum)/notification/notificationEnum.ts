/* export class Failure {
    public code: string = "";

    constructor(code: string) {
        this.code = code
    }
}

class AuthFailure extends Failure {}

const enum authFailuresEnum {
   serverError = "SERVER_ERROR"
}


const failure = new AuthFailure(authFailuresEnum.serverError);

if (failure instanceof AuthFailure) {
    if (failure.code === authFailuresEnum.serverError)
} */

type TSourceEnum = {
    [key: string]: string
}

export const sourceEnum: TSourceEnum = {
    activity: "Actividad",
    register: "Registro",
    shopping: "Compras",
    membership: "Afiliación",
    treatments: "Tratamientos",
    promotions: "Promociones",
    campaign: "Campañas",
    reminders: "Recordatorios",
    productInShoppingCart: "Producto en carrito",
    pendingChallenges: "Desafios pendientes",
    overdueActivity: "Actividad vencida",
    programPost: "Publicación programa",
    eventPost: "Publicación evento",
}

type TTriggerMeasureEnum = {
    [key: string]: string
}

export const triggerMeasureEnum: TTriggerMeasureEnum = {
    current: "Cuando ocurra",
    hours: "Horas",
    days: "Dias",
    weeks: "Dias",
    months: "Meses",
    years: "Años",
}

type TTriggerEnum = {
    [key: string]: string
}

export const triggerEnum: TTriggerEnum = {
    current: "Cuando ocurra",
    after: "Después",
    before: "Antes",
}

type TWhomEnum = {
    [key: string]: string
}

export const whomEnum: TWhomEnum = {
    patient: "Usuario",
    supplier: "Proveedor",
    AC: "Usuario AC",
}

type TFromWhereEnum = {
    [key: string]: string
}

export const fromWhereEnum: TFromWhereEnum = {
    controlPanel: "Panel de control",
    supplierPanel: "Panel de Proveedor",
    automatic: "Automático",
    programs: "Programas",
}

type TNotificationTypes = {
    [key: string]: string
}

export const notificationTypesEnum: TNotificationTypes = {
    push: "Notificación push",
    email: "Notificación por correo electrónico",
    pushAndEmail: "Notificación push y por correo electrónico",
    sendWhatsappMessage: "Notificación por Whatsapp",
    sendSMSMessage: "Notificación por SMS",
    sendApi: "Notificación por vía API",
}
