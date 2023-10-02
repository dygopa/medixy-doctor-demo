import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import AttentionManagementIndex from "(presentation)/components/Attention/AttentionManagement/AttentionManagementIndex";
import Head from "./head";
import Providers from "./providers";

export default async function AttentionManagementPage({
  params,
}: {
  params: { appointmentId: string };
}) {
  return (
    <AppLayout
      title="Atención del servicio"
      pathname={"/attention/attention-management"}
    >
      <Providers>
        <Head />
        <AttentionManagementIndex id={params.appointmentId} />
      </Providers>
    </AppLayout>
  );
}
