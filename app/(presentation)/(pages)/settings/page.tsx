import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import AccountIndex from "(presentation)/components/Account/AccountIndex";
import LocalitiesListIndex from "(presentation)/components/Localities/LocalitiesListIndex";

export default async function LocalitiesPage() {
  return (
    <AppLayout title="Configuración" pathname={"/settings"}>
      <div></div>
    </AppLayout>
  );
}
