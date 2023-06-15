import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Table from "./Table/Table";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import CompanionsListProvider, { ICompanionsListContext } from "./context/companionListContext";
import { ISubject } from "domain/core/entities/subjectEntity";

interface ITableProps {
  setCompanionEdit: Dispatch<SetStateAction<ISubject | null>>;
  idPatient: number | undefined
}

export default function CompanionsList ({idPatient, setCompanionEdit} : ITableProps) {

  const [values, setValues] = useState("")

  setCompanionEdit(null);

  return (
    <CompanionsListProvider>
      <div className="w-full flex justify-between">
        <h2 className="mr-5 text-xl font-bold">Acompañantes</h2>
        <div className="w-56 text-slate-500">
          <FormInput
            type="text"
            className="w-56 pr-10 !box"
            placeholder="Buscar acompañante"
            value={values}
            onChange={(e) => setValues(e.target.value)}
            /*onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}*/
          />
          <Lucide
            icon="Search"
            className="absolute -mt-6 right-0 w-4 h-4 my-auto mr-3"
          />
        </div>
      </div>
      <Table idPatient={idPatient} setCompanionEdit={setCompanionEdit} />
    </CompanionsListProvider>
  )
}