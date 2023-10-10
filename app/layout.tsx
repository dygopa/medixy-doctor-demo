import { Poppins } from "@next/font/google";
import Script from "next/script";

import "(presentation)/(styles)/css/app.css";
import Providers from "providers";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={poppins.className}>
      <head />

      <body cz-shortcut-listen="true">
        <Providers>{children}</Providers>
      </body>

      <Script
        src="https://kit.fontawesome.com/b96c8160f9.js"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </html>
  );
}
