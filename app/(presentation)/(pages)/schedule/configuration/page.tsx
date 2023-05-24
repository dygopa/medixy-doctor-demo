import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import { ScheduleRoutesEnum } from "(presentation)/(routes)/scheduleRoutes";
import AccountIndex from "(presentation)/components/Account/AccountIndex";
import ConfigurationIndex from "(presentation)/components/Schedule/Configuration/ConfigurationIndex";

export default async function ConfigurationPage() {
  return (
    <AppLayout title="Configuración de la agenda" pathname={ScheduleRoutesEnum.Configuration}>
      <ConfigurationIndex/>
    </AppLayout>
  );
}
