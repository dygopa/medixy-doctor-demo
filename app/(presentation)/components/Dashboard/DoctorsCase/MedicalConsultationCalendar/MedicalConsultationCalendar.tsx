import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Calendar from "(presentation)/components/core/Calendar";
import { DateClickArg } from "@fullcalendar/interaction";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

export default function MedicalConsultationCalendar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const date = searchParams.get("date") ?? new Date();

  const handleClick = (arg: DateClickArg) => {
    router.push(DashboardRoutesEnum.Dashboard + `?date=${arg.dateStr}`);
  };

  return (
    <div
      className={clsx([
        "relative",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-5 box w-full">
        <div className="mb-16">
          <Calendar initialEvent={date.toString()} handleClick={handleClick} />
        </div>

        <div>
          <Button variant="primary" className="w-full">
            Nueva consulta
          </Button>
        </div>
      </div>
    </div>
  );
}
