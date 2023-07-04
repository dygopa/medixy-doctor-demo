"use client";

import { useEffect } from "react";
import BackButton from "./BackButton/BackButton";
import QrScan from "./QrScan/QrScan";

export default function MedicalRecordScanIndex() {
  useEffect(() => {
    document.body.classList.add("p-0");
  }, []);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <BackButton />

      <QrScan />
    </div>
  );
}
