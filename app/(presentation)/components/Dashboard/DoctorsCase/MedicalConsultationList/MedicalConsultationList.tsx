import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import ErrorMessage from "(presentation)/components/core/Error/ErrorMessage/ErrorMessage";
import Loading from "(presentation)/components/core/Loading/Loading";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import {
  IMedicalConsultationListContext,
  MedicalConsultationListContext,
} from "./context/MedicalConsultationListContext";
import Consultation from "./Consultation/Consultation";
import Link from "next/link";

export default function MedicalConsultationList() {
  const { state, actions, dispatch } =
    useContext<IMedicalConsultationListContext>(MedicalConsultationListContext);
  const { getMedicalConsultation } = actions;
  const {
    data: consultations,
    loading,
    error,
    sucessful,
  } = state.consultations;

  // Obtienes el parámetro "date" del query param en la URL (La fecha llega como string se parsea a un Date)
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  // Se hace el dispatch
  const getMedicalConsultationDispatch = () => {
    // Si el date es null, recibe como parametro la fecha actual, caso contrario, la fecha que se selecciono
    getMedicalConsultation({ date: date ? new Date(date) : new Date() })(
      dispatch
    );
  };

  const DateComponent = ({ data }: { data: any }) => {
    return (
      <div className="w-full h-[25%] cursor-pointer bg-white border border-slate-200 flex justify-between items-center gap-4 rounded-md p-4 overflow-hidden">
        <div className="rounded-md w-[42px] h-[42px] block overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={data["pic_profile"]}
            alt="profile-picture"
          />
        </div>
        <div className="relative w-[83%] h-full flex flex-col justify-center items-start">
          <div className="flex justify-between items-center w-full">
            <p className="font-medium text-md text-slate-900">{data["user"]}</p>
            <p className="font-light text-sm text-slate-900">
              {data["date"] + " - " + data["hour"]}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="font-light text-sm text-slate-400">
              {data["service"]}
            </p>
            <div className="flex justify-start items-center gap-2">
              <span className="rounded-full w-[12px] h-[12px] bg-warning"></span>
              <p className="text-sm font-medium text-slate-900">Por atender</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // El useEffect ejecuta el dispatch cuando se renderiza el componente y cuando la constante "date" cambia
  useEffect(() => {
    getMedicalConsultationDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage />;

  if (consultations.length === 0 && sucessful)
    return (
      <div className="w-full h-fit flex flex-col justify-between items-center bg-white rounded-md shadow-md p-4">
        <div className="w-full h-[6vh] border-b flex justify-between items-center pb-1">
          <p className="font-semibold text-lg text-slate-900">
            Citas pendientes
          </p>
        </div>
        <div className="w-full h-[30vh] flex flex-col justify-center items-center gap-2 rounded-md overflow-y-auto text-center">
          <p className="font-medium text-lg text-slate-900">
            Nada por aquí aún
          </p>
          <p className="font-light text-sm text-slate-500">
            No tienes citas para esta fecha aún en la plataforma, te
            recomendamos crear{" "}
            <Link href="/services" className="font-semibold text-primary">
              servicios
            </Link>{" "}
            para exponerte a los pacientes
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full h-[58vh] flex flex-col justify-between items-center bg-white rounded-md shadow-md p-4">
      <div className="w-full h-[6vh] border-b flex justify-between items-center pb-1">
        <p className="font-semibold text-lg text-slate-900">Citas pendientes</p>
      </div>
      <div className="w-full h-[40vh] flex flex-col justify-between items-center gap-4 rounded-md overflow-y-auto">
        {consultations.map((date, i) => (
          <DateComponent data={date} key={i} />
        ))}
      </div>
      <Link
        href={"/dashboard"}
        className="w-full transition p-[10px_50px] rounded cursor-pointer text-[13px] text-center bg-white font-semibold text-primary hover:bg-primary hover:text-white"
      >
        Ver todo
      </Link>
    </div>
  );
}
