import Appointments from "./Appointments/Appointments";
import Doctors from "./Doctors/Doctors";
import Patients from "./Patients/Patients";

export default function Summary() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Doctors />
      </div>

      <div>
        <Patients />
      </div>

      <div>
        <Appointments />
      </div>
    </div>
  );
}
