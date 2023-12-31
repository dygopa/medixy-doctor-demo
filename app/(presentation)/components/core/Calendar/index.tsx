import FullCalendar from "@fullcalendar/react";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
//import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
//import listPlugin from "@fullcalendar/list";
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
  navLinkDayClick,
  events,
}: {
  initialEvent: string;
  handleClick: Function;
  handleChangeInWeek: Function;
  navLinkDayClick: Function;
  events?: any[];
}) {
  const [showWeek, setShowWeek] = useState(false);

  const handleChangeView = (view: string) => setShowWeek(view === "dayGridDay");

  return (
    <FullCalendar
      scrollTime={"08:00:00"}
      viewDidMount={(mountArg: ViewMountArg) =>
        handleChangeView(mountArg.view.type)
      }
      navLinks={true}
      plugins={[interactionPlugin, timeGridPlugin]}
      locale={esLocale}
      datesSet={(dateInfo) => {
        handleChangeInWeek(dateInfo);
      }}
      eventClick={(arg: EventClickArg) => handleClick(arg)}
      navLinkDayClick={(date: Date, jsEvent: UIEvent) =>
        navLinkDayClick(date, jsEvent)
      }
      initialDate={new Date()}
      editable={false}
      height="100%"
      slotDuration={"00:15:00"}
      headerToolbar={{
        start: "prev,next today",
        center: "title",
        end: showWeek ? "timeGridWeek" : "",
      }}
      allDayClassNames="hidden"
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
