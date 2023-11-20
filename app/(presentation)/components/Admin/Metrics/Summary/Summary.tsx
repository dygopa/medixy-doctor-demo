import Appointments from "./Appointments/Appointments";
import Doctors from "./Doctors/Doctors";
import Patients from "./Patients/Patients";

export default function Summary() {
  return (
    <div className="md:grid grid-cols-3 gap-4">
      <div className="my-6 md:my-0">
        <Doctors />
      </div>

      <div className="my-6 md:my-0">
        <Patients />
      </div>

      <div className="my-6 md:my-0">
        <Appointments />
      </div>
    </div>
  );
}
