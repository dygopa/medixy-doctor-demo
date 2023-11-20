import { Dispatch, SetStateAction } from "react";
import Health from "./Health/Health";
import Income from "./Income/Income";
import Patients from "./Patients/Patients";
import Services from "./Services/Services";

interface ISummaryProps {
  steps: number;
  setSteps: Dispatch<SetStateAction<number>>
}

export default function Summary({steps, setSteps}: ISummaryProps) {

  return (
    <div className="md:grid grid-cols-4 gap-4">
      <div className="my-6 md:my-0" onClick={() => setSteps(0)}>
        <Income steps={steps} />  
      </div>

      <div className="my-6 md:my-0" onClick={() => setSteps(1)}>
        <Services steps={steps} />
      </div>

      <div className="my-6 md:my-0" onClick={() => setSteps(2)}>
        <Health steps={steps} />
      </div>

      <div className="my-6 md:my-0" onClick={() => setSteps(3)}>
        <Patients steps={steps} />
      </div>
    </div>
  );
}
