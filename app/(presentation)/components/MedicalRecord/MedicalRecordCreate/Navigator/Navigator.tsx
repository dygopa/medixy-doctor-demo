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
    <div className="w-full md:flex justify-between sticky top-[67px] z-[69]  bg-slate-100 lg:pb-0 md:pb-0 pb-4">
      <div className="md:w-[50%] lg:mb-0 mb-4">
        <h2 className="lg:mr-5 text-[22px] font-bold truncate mb-1">
          Nueva consulta
        </h2>
        <p className="font-normal text-slate-500 text-[16px]">
          Doctor {user?.names} {user?.firstName}
        </p>
      </div>
      <div className="lg:flex md:flex sm:flex flex items-center justify-center md:justify-end sm:justify-start">
        <Button
          variant="outline-primary"
          disabled={loading || successful}
          onClick={() => {
            setPopupSectionActive(0);
            setIsOpen(true);
          }}
          className="xl:mr-4 lg:mr-4 md:mr-4 sm:mr-4 mr-4 px-5 lg:w-[150px] md:w-[150px] sm:w-[150px] w-[50px]"
        >
          <div className="flex items-center">
            <div className="lg:mr-2 md:mr-2 sm:mr-2 mr-0">
              <i className="fa-solid fa-user text-md" />
            </div>

            <div className="lg:block md:block sm:block hidden">Paciente</div>
          </div>
        </Button>

        <Button
          variant="outline-primary"
          disabled={loading || successful}
          onClick={() => {
            setPopupSectionActive(1);
            setIsOpen(true);
          }}
          className="lg:w-[200px] md:w-[200px] sm:w-[200px] w-full"
        >
          <div className="flex items-center">
            <div className="mr-2">
              <i className="fa-solid fa-address-book text-md" />
            </div>

            <div>Antecedentes</div>
          </div>
        </Button>
      </div>
    </div>
  );
}
