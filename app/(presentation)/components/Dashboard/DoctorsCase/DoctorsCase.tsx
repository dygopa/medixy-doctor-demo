import MedicalConsultationNext from "./MedicalConsultationNext/MedicalConsultationNext";
import MedicalConsultationCalendar from "./MedicalConsultationCalendar/MedicalConsultationCalendar";
import MedicalConsultationList from "./MedicalConsultationList/MedicalConsultationList";
import MedicalConsultationListProvider from "./MedicalConsultationList/context/MedicalConsultationListContext";
import { IUser } from "domain/core/entities/userEntity";
import { useContext, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { DashboardContext, IDashboardContext } from "./context/DashboardContext";
import { IStepByStepContext, StepByStepContext } from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";

function DoctorsCase({ account }: { account: IUser }) {

  const { actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);
  const { getPendingAppointments, getCompletedAppointments, getSubject, getLatestAppointment} = actions;

  const { actions: actionsStep, state: stateSteps, dispatch: dispatchStep } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { changeOpenPopup } = actionsStep;

  useMemo(() => {
    if (account){
      getLatestAppointment(account.userId)(dispatch)
      getCompletedAppointments(account.userId)(dispatch);
      getSubject({
        userId: account.userId
      })(dispatch);
      getPendingAppointments(account.userId)(dispatch)
      changeOpenPopup(true)(dispatchStep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <div className="w-full h-auto relative lg:flex justify-between  gap-7">
        <div className="lg:w-[60%] lg:h-[200px] w-full h-full py-2 lg:flex md:flex sm:flex justify-between bg-white rounded-md px-5 shadow-md">
          <div className="md:w-4/5 sm:w-3/5 w-full h-full flex flex-col items-start gap-2">
            <p className="font-medium text-base text-slate-900">Tablero</p>
            <p className="font-light text-xl text-slate-900">
              Bienvenido a Prosit,<br/>
              { account.sex === 1 ?
                <b className="font-bold capitalize">
                  Dra. {account.names} {account.firstName} {account.lastName}
                </b>
                :
                <b className="font-bold capitalize">
                  Dr. {account.names} {account.firstName} {account.lastName}
                </b>
              }
            </p>
            <p className="font-light text-sm text-slate-500">
              Mantén un seguimiento de tus citas médicas y asegúrate de estar
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
