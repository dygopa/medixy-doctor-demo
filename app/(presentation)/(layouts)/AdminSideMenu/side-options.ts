import { FormattedMenu } from "./side-menu";
import { AdminAccountRoutesEnum } from "(presentation)/(routes)/admin/accountRoutes";
import { AdminDashboardRoutesEnum } from "(presentation)/(routes)/admin/dashboardRoutes";
import { AdminDoctorsRoutesEnum } from "(presentation)/(routes)/admin/doctorsRoutes";
import { AdminMetricsRoutesEnum } from "(presentation)/(routes)/admin/metricsRoutes";

export const navigationOptions: FormattedMenu[] = [
    {
        active: true,
        subMenu: undefined,
        title: "Tablero",
        pathname: AdminDashboardRoutesEnum.Dashboard,
        icon: "LayoutDashboard",
        ignore: false,
    },
    {
        active: true,
        subMenu: undefined,
        title: "Métricas",
        pathname: AdminMetricsRoutesEnum.Metrics,
        icon: "BarChart4",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Doctores",
        pathname: AdminDoctorsRoutesEnum.DoctorsList,
        icon: "HeartPulse",
        ignore: false,
    },
]


export const endNavigationOptions: FormattedMenu[] = [
    {
        active: false,
        subMenu: undefined,
        title: "Salir",
        pathname: AdminAccountRoutesEnum.Logout,
        icon: "LogOut",
        ignore: false,
    },
]