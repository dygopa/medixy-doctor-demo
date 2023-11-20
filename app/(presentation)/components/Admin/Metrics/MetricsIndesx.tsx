"use client";

import Summary from "./Summary/Summary";

export default function MetricsIndex() {
  return (
    <div className="py-5">
      <div className="mb-8">
        <p className="font-medium text-xl text-slate-900">Métricas</p>
      </div>

      <div className="mb-14">
        <Summary />
      </div>

      <div className="md:grid grid-cols-2 gap-4">
        
      </div>
    </div>
  )
}