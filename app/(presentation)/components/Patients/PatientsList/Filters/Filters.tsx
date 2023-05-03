import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IUser } from "domain/core/entities/userEntity";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ExportToExcel from "./ExportToExcel/ExportToExcel";
import ImportToExcel from "./ImportToExcel/ImportToExcel";

export default function Filters() {
  const [showFilters, setShowFilters] = useState(false);

  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search_query");
  const curp = searchParams.get("curp");

  const router = useRouter();

  const [values, setValues] = useState({
    query: searchQuery ?? "",
    curp: curp ?? "",
  });

  const handleSearch = () => {
    const query = `?search_query=${values.query}&curp=${curp}&page=1`;

    router.replace(PatientsRoutesEnum.PatientsList + query);
  };

  return (
    <div>
      <div className="lg:flex justify-between align-middle">
        <div className="flex mb-8">
          <div className="relative w-56 text-slate-500 mr-6">
            <FormInput
              type="text"
              className="w-56 pr-10 !box"
              placeholder="Buscar pacientes"
              value={values.query}
              onChange={(e) => setValues({ ...values, query: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Lucide
              icon="Search"
              className="absolute -top-3 inset-y-0 right-0 w-4 h-4 my-auto mr-3"
            />
          </div>

          <div>
            <Button
              variant={showFilters ? "primary" : "outline-primary"}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Lucide icon="Filter" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="lg:flex md:flex sm:flex">
          <div className="lg:mr-3 md:mr-3 sm:mr-3 mb-3">
            <Link href={PatientsRoutesEnum.PatientsCreate}>
              <Button variant="primary" className="w-full">
                Nuevo paciente
              </Button>
            </Link>
          </div>

          <div className="lg:mr-3 md:mr-3 sm:mr-3 mb-3">
            <ExportToExcel/>
          </div>

          <div>
            <ImportToExcel/>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4">
          <div className="lg:flex justify-between align-middle">
            <div className="grid lg:grid-cols-4 sm:grid-cols-6 grid-cols-1 gap-7">
              <div className="mb-3">
                <div className="font-medium text-left mb-3">CURP</div>

                <FormInput
                  type="text"
                  className="w-56 pr-10 !box"
                  placeholder="CURP"
                  value={values.curp}
                  onChange={(e) =>
                    setValues({ ...values, curp: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-end text-end mt-6 ml-5">
              <div>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleSearch();
                  }}
                  className="w-32 mr-3"
                >
                  Filtrar
                </Button>
              </div>

              <div>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setValues({
                      query: "",
                      curp: "",
                    });
                    router.replace(PatientsRoutesEnum.PatientsList);
                  }}
                  className="w-32 ml-auto"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
