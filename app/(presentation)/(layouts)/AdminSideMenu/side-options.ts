import { FormattedMenu } from "./side-menu";
import { AdminAccountRoutesEnum } from "(presentation)/(routes)/admin/accountRoutes";
import { AdminDashboardRoutesEnum } from "(presentation)/(routes)/admin/dashboardRoutes";
import { AdminDoctorsRoutesEnum } from "(presentation)/(routes)/admin/doctorsRoutes";
import { AdminMetricsRoutesEnum } from "(presentation)/(routes)/admin/metricsRoutes";
import { AdminMedicalCentersRoutesEnum } from "(presentation)/(routes)/admin/medicalCentersRoutes";

export const navigationOptions: FormattedMenu[] = [
    {
        active: true,
        subMenu: undefined,
        title: "Tablero",
        pathname: AdminDashboardRoutesEnum.Dashboard,
        icon: "home",
        ignore: false,
    },
    {
        active: true,
        subMenu: undefined,
        title: "Métricas",
        pathname: AdminMetricsRoutesEnum.Metrics,
        icon: "chart-tree",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Doctores",
        pathname: AdminDoctorsRoutesEnum.DoctorsList,
        icon: "medical-bag",
        ignore: false,
    },
    {
        active: false,
        subMenu: undefined,
        title: "Centros",
        pathname: AdminMedicalCentersRoutesEnum.MedicalCentersList,
        icon: "office-building-outline",
        ignore: false,
    },
]


export const endNavigationOptions: FormattedMenu[] = [
    {
        active: false,
        subMenu: undefined,
        title: "Salir",
        pathname: AdminAccountRoutesEnum.Logout,
        icon: "logout",
        ignore: false,
    },
]