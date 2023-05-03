import Button from "(presentation)/components/core/BaseComponents/Button";
import {HiOutlineBell} from "react-icons/hi";

export default function MedicalConsultationNext() {
  return (
    <div className="w-full h-full flex justify-between items-start gap-4 p-5 bg-white rounded-md shadow-md">
      <div className="w-[10%] flex flex-col justify-start items-start">
        <span className="w-[2.5rem] h-[2.5rem] bg-yellow-200 text-yellow-500 rounded-md flex flex-col justify-center items-center text-xl">
          <HiOutlineBell/>
        </span>
      </div>
      <div className="w-[90%] h-full flex flex-col justify-between items-start">
        <div className="w-full flex justify-start items-center gap-1">
          <p className="font-light text-sm text-slate-500">Próxima Consulta</p>
          <p className="font-light text-sm text-slate-500">-</p>
          <p className="font-medium text-base text-slate-900">10:00 am</p>
        </div>
        <div className="mb-4 mt-2">
          <p className="font-medium text-lg text-slate-900">Fernando Suarez</p>
          <p className="font-light text-sm text-slate-500"> Dolor de Hombro Izquierdo</p>
        </div>
        <Button className="w-full" variant="primary">Atender</Button>
      </div>
    </div>
  );
}
