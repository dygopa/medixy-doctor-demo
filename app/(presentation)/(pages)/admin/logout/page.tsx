
import LogoutIndex from "(presentation)/components/Admin/Logout/LogoutIndex";
import Providers from "./providers";

export default async function AdminLogoutPage() {
  return (
    <Providers>
      <LogoutIndex />
    </Providers>
  );
}
