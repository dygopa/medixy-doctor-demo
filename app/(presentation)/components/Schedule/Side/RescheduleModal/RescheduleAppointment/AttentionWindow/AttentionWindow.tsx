import moment from "moment";
import { FiCheck } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

export default function AttentionWindow({
  data,
  formData,
  setFormData,
  setNewAppointment,
}: {
  data: any;
  formData: any;
  setFormData: any;
  setNewAppointment: any;
}) {
  function formatHour(value: number) {
    let h: string = value.toString();
    let divided = h.split("");

    let hours =
      divided.length > 3 ? `${divided[0]}${divided[1]}` : `0${divided[0]}`;
    let minutes =
      divided.length > 3
        ? `${divided[2]}${divided[3]}`
        : `${divided[1]}${divided[2]}`;

    return { hours, minutes };
  }

  let isSelected = formData["windowId"] === data["id"];
  let date = moment(data["fechaInicio"]).locale("es").format("dddd");
  let normalDate = moment(data["fechaInicio"]).format("DD-MM-YYYY");

  let { hours: startHour, minutes: startMinutes } = formatHour(
    data["horaInicio"]
  );
  let { hours: endHour, minutes: endMinutes } = formatHour(data["horaFin"]);
  let isActualHour = data["tipo"] === 2;

  if (!data.disponible) return <div />;

  return (
    <div
      onClick={() => {
        setFormData({ ...formData, windowId: data["id"] });
        setNewAppointment(data);
      }}
      className={twMerge([
        "transition cursor-pointer w-full border rounded-md p-3 flex flex-col justify-between items-start h-fit gap-3 relative",
        isSelected ? "border-green-500" : "border-slate-300",
      ])}
    >
      <div className="w-full flex justify-between items-center">
        <p className="text-sm font-medium text-slate-900 capitalize">
          {date} - {normalDate}
        </p>
        <span
          className={twMerge([
            "transition w-6 h-6  rounded-full flex justify-center items-center text-white text-sm relative border",
            isSelected
              ? "bg-green-500 border-green-500"
              : "bg-transparent border-slate-300",
          ])}
        >
          {isSelected && <FiCheck />}
        </span>
      </div>
      <div className="w-full flex justify-between items-center">
        {isActualHour ? (
          <p>
            {`${moment(data["fechaInicio"]).utc().format("hh:mm a")}`} -{" "}
            {`${moment(data["fechaFin"]).utc().format("hh:mm a")}`}
          </p>
        ) : (
          <p>
            {`${startHour}:${startMinutes}`} - {`${endHour}:${endMinutes}`}
          </p>
        )}
        <span
          className={twMerge([
            "w-fit h-fit px-5 py-1 rounded font-medium text-xs",
            data["tipo"] === 2
              ? "bg-yellow-400/30 text-yellow-800"
              : "bg-green-400/30 text-green-800",
          ])}
        >
          {data["tipo"] === 2 ? "Por espacios" : "Libre"}
        </span>
      </div>
    </div>
  );
}
