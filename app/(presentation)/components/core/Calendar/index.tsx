import FullCalendar from "@fullcalendar/react";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import {
  EventChangeArg,
  EventClickArg,
  ViewMountArg,
} from "@fullcalendar/core";
import { useState } from "react";

function Calendar({
  initialEvent,
  handleClick,
  handleChangeInWeek,
  events,
}: {
  initialEvent: string;
  handleClick: Function;
  handleChangeInWeek: Function;
  events?: any[];
}) {
  const [showWeek, setShowWeek] = useState(false);

  const handleChangeView = (view: string) => setShowWeek(view === "dayGridDay");

  return (
    <FullCalendar
      viewDidMount={(mountArg: ViewMountArg) =>
        handleChangeView(mountArg.view.type)
      }
      navLinks={true}
      plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
      locale={esLocale}
      datesSet={(dateInfo) => {
        handleChangeInWeek(dateInfo);
      }}
      eventClick={(arg: EventClickArg) => handleClick(arg)}
      initialDate={new Date()}
      editable={false}
      height="100%"
      slotDuration={"00:15:00"}
      headerToolbar={{
        start: "prev,next today",
        center: "title",
        end: showWeek ? "timeGridWeek" : "",
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
      events={events}
    />
  );
}

export default Calendar;
