"use client";

import RegisterProvider from "(presentation)/components/Register/context/RegisterContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return <RegisterProvider>{children}</RegisterProvider>;
}
