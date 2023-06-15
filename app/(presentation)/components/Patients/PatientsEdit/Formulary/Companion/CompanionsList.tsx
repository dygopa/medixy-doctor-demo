import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Table from "./Table/Table";
import { useContext, useState } from "react";
import CompanionsListProvider, { ICompanionsListContext } from "./context/companionListContext";



export default function CompanionsList ({idPatient} : {idPatient : number | undefined}) {

  const [values, setValues] = useState("")

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
      <Table patientId={idPatient} />
    </CompanionsListProvider>
  )
}