import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FiUser } from "react-icons/fi";

interface ICompanionDetailProps {
  setShowEditCompanion: Dispatch<SetStateAction<boolean>>;
}

export default function CompanionDetail({
  setShowEditCompanion,
}: ICompanionDetailProps) {
  return (
    <div className="mt-6">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          className="hover:bg-dark hover:bg-opacity-10 p-2 rounded-md"
          onClick={() => setShowEditCompanion(true)}
        >
          <div className="flex items-center">
            <div className="mr-3">
              <i className="fa-solid fa-pen text-lg" />
            </div>

            <div>
              <p>Editar acompañante</p>
            </div>
          </div>
        </button>
      </div>

      <div className="lg:flex block">
        <div className="text-center lg:border-r border-grey">
          <div className="flex w-full justify-center mb-4 mr-24">
            <FiUser size={80} />
          </div>
        </div>

        <div className="lg:pl-8 w-full flex justify-between xl:mt-0 mt-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
            <div>
              <p className="font-normal text-slate-500 mb-1">Nombre(s)</p>

              <span className="font-medium text-[16px]">Joseph Huizi</span>
            </div>

            <div>
              <p className="font-normal text-slate-500 mb-1">Apellido(s)</p>

              <span className="font-medium text-[16px]">Huizi Martinez</span>
            </div>

            <div>
              <p className="font-normal text-slate-500 mb-1">Edad</p>

              <span className="font-medium text-[16px]">30 años</span>
            </div>

            <div>
              <p className="font-normal text-slate-500 mb-1">CURP</p>

              <span className="font-medium text-[16px]">No especificado</span>
            </div>

            <div>
              <p className="font-normal text-slate-500 mb-1">Teléfono</p>

              <span className="font-medium text-[16px]">No especificado</span>
            </div>

            <div>
              <p className="font-normal text-slate-500 mb-1">
                Correo electrónico
              </p>

              <span className="font-medium text-[16px]">No especificado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
