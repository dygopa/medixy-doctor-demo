"use client";

import SpecialistsProvider from "(presentation)/components/Discover/Specialists/context/SpecialistsContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return <SpecialistsProvider>{children}</SpecialistsProvider>;
}
