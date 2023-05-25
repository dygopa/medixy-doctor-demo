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

export const navigationOptions: FormattedMenu[] = [
    {
        active: true,
        subMenu: undefined,
        title: "Tablero",
        pathname: DashboardRoutesEnum.Dashboard,
        icon: "LayoutDashboard",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Citas",
        pathname: OrdersRoutesEnum.OrdersList,
        icon: "Banknote",
        ignore: true,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Agenda",
        pathname: ScheduleRoutesEnum.Schedule,
        icon: "Calendar",
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
    {
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
    },
    {
        active: false,
        subMenu: undefined,
        title: "Mis pacientes",
        pathname: PatientsRoutesEnum.PatientsList,
        icon: "Contact",
        ignore: false,
    },
]


export const endNavigationOptions: FormattedMenu[] = [
    {
        active: true,
        subMenu: undefined,
        title: "Configuración",
        pathname: SettingsRoutesEnum.Settings,
        icon: "Settings",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Salir",
        pathname: AccountRoutesEnum.SignIn,
        icon: "LogOut",
        ignore: false,
    },
]