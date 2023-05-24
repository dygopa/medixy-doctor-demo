import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import Index from "(presentation)/components/Index/Index";

export default async function Home() {
  return (
    <AppLayout title="Prosit" pathname={"/"}>
      <Index/>
    </AppLayout>
  )
}
