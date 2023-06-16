import FullCalendar from "@fullcalendar/react";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import { EventClickArg } from "@fullcalendar/core";

function Calendar({
  initialEvent,
  handleClick,
  handleChangeInWeek,
  events
}: {
  initialEvent: string;
  handleClick: Function;
  handleChangeInWeek: Function;
  events?: any[];
}) {

  return (
    <FullCalendar
      navLinks={true}
      plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
      locale={esLocale}
      datesSet={(dateInfo) => {
        handleChangeInWeek(dateInfo)
      }}
      eventClick={(arg: EventClickArg) => handleClick(arg)}
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
      duration={"00:15"}
      initialView="timeGridWeek"
      views={{ 
        timeGridWeek: {
          titleFormat: { month: "long", year: "numeric" },
        },
      }}
      events={events}
    />
  );
}

export default Calendar;
