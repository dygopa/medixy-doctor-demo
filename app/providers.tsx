"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Providers({ children }: { children: any }) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#fff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
