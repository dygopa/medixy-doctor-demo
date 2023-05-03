import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import { ScheduleRoutesEnum } from "(presentation)/(routes)/scheduleRoutes";
import AccountIndex from "(presentation)/components/Account/AccountIndex";
import ScheduleIndex from "(presentation)/components/Schedule/ScheduleIndex";

export default async function SchedulePage() {
  return (
    <AppLayout title="Agenda" pathname={ScheduleRoutesEnum.Schedule}>
      <ScheduleIndex/>
    </AppLayout>
  );
}
