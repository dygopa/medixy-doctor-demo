import MedicalConsultationNext from "./MedicalConsultationNext/MedicalConsultationNext";
import MedicalConsultationCalendar from "./MedicalConsultationCalendar/MedicalConsultationCalendar";
import MedicalConsultationList from "./MedicalConsultationList/MedicalConsultationList";
import MedicalConsultationListProvider from "./MedicalConsultationList/context/MedicalConsultationListContext";
import { IUser } from "domain/core/entities/userEntity";
import { useContext, useMemo } from "react";
import moment from "moment";
import { DashboardContext, IDashboardContext } from "./context/DashboardContext";

function DoctorsCase({ account }: { account: IUser }) {
  
  const { actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);
  const { getPendingAppointments, getCompletedAppointments, getSubject, getLatestAppointment} = actions;

  useMemo(() => {
    if (account){
      getLatestAppointment(account.userId)(dispatch)
      getCompletedAppointments()(dispatch);
      getSubject({})(dispatch);
      getPendingAppointments(account.userId, moment().format("YYYY-MM-DD"))(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <div className="w-full h-auto relative lg:flex justify-between  gap-7">
        <div className="lg:w-[60%] lg:h-[200px] w-full h-full py-5 lg:flex md:flex sm:flex justify-between bg-white rounded-md px-5 shadow-md">
          <div className="lg:w-3/5 md:w-3/5 sm:w-3/5 w-full h-full flex flex-col justify-center items-start gap-2">
            <p className="font-medium text-base text-slate-900">Tablero</p>
            <p className="font-light text-xl text-slate-900">
              Bienvenido a Prosit,{" "}
              <b className="font-bold capitalize">
                {account.names} {account.firstName}
              </b>
            </p>
            <p className="font-light text-sm text-slate-500">
              Mantén un seguimiento de tus citas médicos y asegúrate de estar
              preparado para cada consulta
            </p>
          </div>
          <div className="w-[10rem] h-[10rem]">
            <img
              className="w-full h-full object-cover"
              src="./images/capsule.png"
              alt=""
            />
          </div>
        </div>

        <div className="lg:w-[40%] lg:h-[200px] w-full h-full relative lg:mt-0 mt-8">
          <MedicalConsultationNext user={account}/>
        </div>
      </div>

      <div className="w-full relative lg:flex justify-between  gap-6 mt-8">
        <div className="lg:w-[60%] lg:mb-0 mb-8">
          <MedicalConsultationCalendar user={account}/>
        </div>
        <div className="lg:w-[40%] relative">
          <MedicalConsultationList user={account}/>
        </div>
      </div>
    </div>
  );
}

export default DoctorsCase;
