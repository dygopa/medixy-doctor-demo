import LogoutIndex from "(presentation)/components/Logout/LogoutIndex";
import Providers from "./providers";

export default async function LogoutPage() {
  return (
    <Providers>
      <LogoutIndex />
    </Providers>
  );
}
