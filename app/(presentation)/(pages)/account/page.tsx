import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { AccountRoutesEnum } from "(presentation)/(routes)/accountRoutes";
import AccountIndex from "(presentation)/components/Account/AccountIndex";

export default async function AccountPage() {
  return (
    <AppLayout title="Mi cuenta" pathname={AccountRoutesEnum.Account}>
      <AccountIndex/>
    </AppLayout>
  );
}
