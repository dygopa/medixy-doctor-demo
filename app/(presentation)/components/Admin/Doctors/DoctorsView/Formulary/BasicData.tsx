import { IUser } from "domain/core/entities/userEntity";
import Image from "next/image";
import { FiUser } from "react-icons/fi";

interface IBasicDataProps {
  doctor: IUser | null;
}

export default function BasicData({
  doctor
}: IBasicDataProps) {

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
            <div
              className="transition w-[10rem] h-[10rem] rounded-full border flex flex-col justify-center items-center"
            >
              { doctor?.avatar && doctor?.avatar.length > 0 ? 
                <div
                  className="w-[10rem] h-[10rem] relative flex justify-center rounded-full"
                >
                  <Image
                  className="object-cover rounded-full "
                  src={doctor?.avatar}
                  alt=""
                  fill
                  />
                </div>
              :
                <FiUser size={60} />
              }
            </div>
          </div>
          <div className="lg:w-[70%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-start items-center gap-3 lg:mt-0 mt-6">
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Nombre(s)
              </p>
              {doctor?.names}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Apellido paterno
              </p>
              {doctor?.firstName}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Apellido materno
              </p>
              {doctor?.lastName}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                CURP
              </p>
              {doctor?.curp}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Fecha de nacimiento
              </p>
              {doctor?.birthDate}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Sexo
              </p>
              {doctor?.sex}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                País nacimiento
              </p>
              {doctor?.country}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Email
              </p>
              {doctor?.email}
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1 mb-2">
              <p className="text-[13px] w-fit text-slate-900 font-semibold">
                Teléfono
              </p>
              {doctor?.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
