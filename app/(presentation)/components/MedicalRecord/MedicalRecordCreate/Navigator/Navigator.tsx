import Button from "(presentation)/components/core/BaseComponents/Button";
import { IUser } from "domain/core/entities/userEntity";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../context/MedicalRecordCreateContext";

interface INavigatorProps {
  user: IUser;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

export default function Navigator({
  user,
  setIsOpen,
  setPopupSectionActive,
}: INavigatorProps) {
  const { state } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { loading, successful } = state.createMedicalConsulty;

  return (
    <div className="w-full md:flex justify-between items-center sticky top-[67px] z-[69]  bg-slate-100 py-2 md:pb-0">
      <div className="md:w-[50%] lg:mb-0 mb-4">
        <h2 className="lg:mr-5 text-2xl font-bold truncate mb-2">
          Nueva Consulta
        </h2>
        <p className="font-normal text-slate-500 text-lg">
          Doctor {user?.names} {user?.firstName}
        </p>
      </div>
      <div className="flex items-center justify-center md:justify-end">
        <Button
          variant="outline-primary"
          disabled={loading || successful}
          onClick={() => {
            setPopupSectionActive(0);
            setIsOpen(true);
          }}
          className="mr-4  px-5"
        >
          <div className="flex items-center">
            <div className="mr-2">
              <i className="fa-solid fa-user text-xl" />
            </div>

            <div>Paciente</div>
          </div>
        </Button>

        <Button
          variant="outline-primary"
          disabled={loading || successful}
          onClick={() => {
            setPopupSectionActive(6);
            setIsOpen(true);
          }}
        >
          <div className="flex items-center">
            <div className="mr-2">
              <i className="fa-solid fa-address-book text-xl" />
            </div>

            <div>Antecedentes</div>
          </div>
        </Button>
      </div>
    </div>
  );
}
