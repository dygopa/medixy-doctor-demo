import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IUser } from "domain/core/entities/userEntity";
import Image from "next/image";

interface IBasicDataProps {
  doctor: IUser | null;
}

export default function BasicData({ doctor }: IBasicDataProps) {
  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-base text-slate-900 pb-2">
            Datos generales
          </p>
        </div>
        <div className="w-full lg:flex justify-between items-center gap-4">
          <div className="lg:w-[30%] flex flex-col justify-center items-center text-center gap-3">
            <input
              accept="image/png, image/jpeg, application/pdf"
              type="file"
              className="hidden"
            />
            <div className="transition w-[10rem] h-[10rem] rounded-full border flex flex-col justify-center items-center">
              {doctor?.avatar && doctor?.avatar.length > 0 ? (
                <div className="w-[10rem] h-[10rem] relative flex justify-center rounded-full">
                  <Image
                    className="object-cover rounded-full "
                    src={doctor?.avatar}
                    alt=""
                    fill
                  />
                </div>
              ) : (
                <Lucide icon="image" size={60} color="#216AD9" />
              )}
            </div>
          </div>
          <div className="lg:w-[70%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-start items-center gap-3 lg:mt-0 mt-6">
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Nombre(s)
              </p>
              {doctor?.names && doctor?.names.length > 0
                ? doctor?.names
                : "No especificado"}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Apellido paterno
              </p>
              {doctor?.firstName && doctor?.firstName.length > 0
                ? doctor?.firstName
                : "No especificado"}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Apellido materno
              </p>
              {doctor?.lastName && doctor?.lastName.length > 0
                ? doctor?.lastName
                : "No especificado"}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                CURP
              </p>
              {doctor?.curp && doctor?.curp.length > 0
                ? doctor?.curp
                : "No especificado"}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Fecha de nacimiento
              </p>
              {doctor?.birthDate && doctor?.birthDate.length > 0
                ? doctor?.birthDate
                : "No especificado"}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Sexo
              </p>
              {doctor?.sex && doctor?.sex > 0 ? doctor?.sex : "No especificado"}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                País nacimiento
              </p>
              {doctor?.country && doctor?.country.length > 0
                ? doctor?.country
                : "No especificado"}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Email
              </p>
              {doctor?.email && doctor?.email.length > 0
                ? doctor?.email
                : "No especificado"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
