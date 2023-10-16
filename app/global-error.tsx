"use client";

import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  console.log(error);

  return (
    <html>
      <body>
        <div className="flex w-full h-screen text-center justify-center items-center">
          <Image
            src="/images/logo.png"
            width={250}
            height={250}
            alt="App logo"
          />
          <h2 className="text-3xl font-bold py-10">
            Ha ocurrido un error al intentar ejecutar esta acción
          </h2>
          <div className="flex justify-center gap-5 items-center">
            <Button variant="primary" onClick={() => reset()}>
              Volver a intentar
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push(DashboardRoutesEnum.Dashboard)}
            >
              Volver a Mi Tablero
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
