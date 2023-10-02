"use client";

import AttentionProvider from "(presentation)/components/Attention/AttentionManagement/context/AttentionContext";

export default function Providers({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return <AttentionProvider>{children}</AttentionProvider>;
}
