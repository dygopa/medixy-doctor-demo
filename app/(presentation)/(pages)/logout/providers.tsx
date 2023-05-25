"use client";

import SignOutProvider from "(presentation)/components/Logout/context/SignOutContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return <SignOutProvider>{children}</SignOutProvider>;
}
