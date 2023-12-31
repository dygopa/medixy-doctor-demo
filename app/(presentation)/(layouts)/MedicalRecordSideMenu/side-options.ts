import { AccountRoutesEnum } from "(presentation)/(routes)/accountRoutes";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import { ScheduleRoutesEnum } from "(presentation)/(routes)/scheduleRoutes";
import { SettingsRoutesEnum } from "(presentation)/(routes)/settingsRoutes";
import { TreatmentsRoutesEnum } from "(presentation)/(routes)/treatmentsRoutes";
import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import { FormattedMenu } from "./side-menu";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";

export const navigationOptions: FormattedMenu[] = [
    {
        active: true,
        subMenu: undefined,
        title: "Mi Tablero",
        pathname: DashboardRoutesEnum.Dashboard,
        icon: "home",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Citas",
        pathname: OrdersRoutesEnum.OrdersList,
        icon: "calendar-blank",
        ignore: true,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Mi Agenda",
        pathname: ScheduleRoutesEnum.Schedule,
        icon: "calendar-blank",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Mis Consultas",
        pathname: MedicalRecordRoutesEnum.MedicalRecordList,
        icon: "medical-bag",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Mis Pacientes",
        pathname: PatientsRoutesEnum.PatientsList,
        icon: "account-group",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Reportes",
        pathname: TreatmentsRoutesEnum.Treatments,
        icon: "Book",
        ignore: true,
    },
    /*{
        active: false,
        subMenu: undefined,
        title: "Mis consultorios",
        pathname: LocalitiesRoutesEnum.Localities,
        icon: "Building",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Mis servicios",
        pathname: ServicesRoutesEnum.Services,
        icon: "Briefcase",
        ignore: false,
    },*/
]


export const endNavigationOptions: FormattedMenu[] = [
    {
        active: true,
        subMenu: undefined,
        title: "Configuración",
        pathname: SettingsRoutesEnum.Settings,
        icon: "cog",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Salir",
        pathname: AccountRoutesEnum.Logout,
        icon: "logout",
        ignore: false,
    },
]