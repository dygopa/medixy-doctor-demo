import { FormInput, FormTextarea } from "(presentation)/components/core/BaseComponents/Form";
import { ClassicEditor } from "(presentation)/components/core/BaseComponents/Ckeditor";
import { IUser } from "domain/core/entities/userEntity";

interface IFormularyProps {
  doctor: IUser | null,
}

export default function AboutMe ({doctor}: IFormularyProps){
  return(
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-base text-slate-900 pb-2">Sobre mí y mis servicios</p>
        </div>
        <div className="w-full">
          {doctor?.aboutMe}
        </div> 
      </div>
    </div>
  )
}