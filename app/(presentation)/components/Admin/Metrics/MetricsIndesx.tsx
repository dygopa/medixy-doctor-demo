"use client";

import { useState } from "react";
import Summary from "./Summary/Summary";

export default function MetricsIndex() {

  const [steps, setSteps] = useState(0);

  const showMetrics = () => { 
    switch(steps) {
      default: return <div></div>
    }
  }

  return (
    <div className="py-5">
      <div className="mb-8">
        <p className="font-medium text-xl text-slate-900">Métricas</p>
      </div>

      <div className="mb-14">
        <Summary steps={steps} setSteps={setSteps} />
      </div>

      <div className="md:grid grid-cols-2 gap-4">
        {showMetrics()}
      </div>
    </div>
  )
}