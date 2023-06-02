import FullCalendar from "@fullcalendar/react";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";

function Calendar({
  initialEvent,
  handleClick,
}: {
  initialEvent: string;
  handleClick: Function;
}) {

  return (
    <FullCalendar 
      plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
      locale={esLocale}
      dateClick={(arg: DateClickArg) => handleClick(arg)}
      initialDate={new Date()}
      editable={false}
      height="100%"
      headerToolbar={{
        start: "prev,next today",
        center: "title",
        end: "",
      }}
      buttonText={{
        today: "Hoy",
      }} 
      initialView="timeGridWeek"
      views={{ 
        timeGridWeek: {
          titleFormat: { month: "long", year: "numeric" },
        },
      }}
      events={[
        {
          title: "",
          start: initialEvent,
          end: initialEvent,
          textColor: "#fff",
          backgroundColor: "#000000",
        },
      ]}
    />
  );
}

export default Calendar;
