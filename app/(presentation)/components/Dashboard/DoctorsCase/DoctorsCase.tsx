import MedicalConsultationNext from "./MedicalConsultationNext/MedicalConsultationNext";
import MedicalConsultationCalendar from "./MedicalConsultationCalendar/MedicalConsultationCalendar";
import MedicalConsultationList from "./MedicalConsultationList/MedicalConsultationList";
import MedicalConsultationListProvider from "./MedicalConsultationList/context/MedicalConsultationListContext";

function DoctorsCase() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      
      <div className="w-full h-[22.5vh] relative flex justify-between items-center gap-7">

        <div className="w-[60%] h-full flex justify-between items-center bg-white rounded-md px-5 shadow-md">
          <div className="w-3/5 h-full flex flex-col justify-center items-start gap-2">
            <p className='font-medium text-base text-slate-900'>Tablero</p>
            <p className='font-light text-xl text-slate-900'>Bienvenido a Prosit, <b className='font-bold'>Dylan González</b></p>
            <p className='font-light text-sm text-slate-500'>Mantén un seguimiento de tus citas médicos y asegúrate de estar preparado para cada consulta</p>
          </div>
          <div className="w-[10rem] h-[10rem]">
            <img className='w-full h-full object-cover' src="./images/capsule.png" alt="" />
          </div>
        </div>

        <div className="w-[40%] h-full relative">
          <MedicalConsultationNext />
        </div>
      </div>

      <div className="w-full relative flex justify-between items-center gap-7">
        
        <div className="w-[60%]">
          <MedicalConsultationCalendar />
        </div>
        
        <div className="w-[40%] relative">
          <MedicalConsultationListProvider>
            <MedicalConsultationList />
          </MedicalConsultationListProvider>
        </div>
      </div>

      
    </div>
  );
}

export default DoctorsCase;
