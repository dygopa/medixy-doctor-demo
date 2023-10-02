import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import AttenionIndex from "(presentation)/components/Attention/AttenionIndex";
import Head from "./head";

export default async function LocalitiesPage() {
  return (
    <AppLayout title="Atención" pathname={"/attentions"}>
      <Head />
      <AttenionIndex />
    </AppLayout>
  );
}
