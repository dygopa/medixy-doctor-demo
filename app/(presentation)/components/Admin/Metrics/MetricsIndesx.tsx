"use client";

import { useState } from "react";
import HealthBody from "./Body/Health/HealthBody";
import IncomeBody from "./Body/Income/IncomeBody";
import PatientesBody from "./Body/Patients/PatientesBody";
import ServicesBody from "./Body/Services/ServicesBody";
import Summary from "./Summary/Summary";

export default function MetricsIndex() {

  const [steps, setSteps] = useState(0);

  const showMetrics = () => { 
    switch(steps) {
      case 0: return <IncomeBody />;
      case 1: return <ServicesBody />;
      case 2: return <HealthBody />;
      case 3: return <PatientesBody />;

      default: return <div></div>;
    }
  }

  return (
    <div className="py-5">
      <div className="mb-8">
        <p className="font-medium text-xl text-slate-900">Métricas</p>
      </div>

      <div className="mb-5">
        <Summary steps={steps} setSteps={setSteps} />
      </div>

      <div className="">
        {showMetrics()}
      </div>
    </div>
  )
}