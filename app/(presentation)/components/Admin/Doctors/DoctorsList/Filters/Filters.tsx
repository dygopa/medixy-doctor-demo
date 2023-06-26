import { DoctorsRoutesEnum } from "(presentation)/(routes)/admin/doctorsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
    const query = `?search_query=${values.query}&page=1`;

    router.replace(DoctorsRoutesEnum.DoctorsList + query);
  };

  return (
    <div>
      <div className="md:flex justify-between align-middle">
        <div className="flex mb-4">
          <div className="relative w-full lg:w-56 text-slate-500">
            <FormInput
              type="text"
              className="w-full md:w-56 pr-10 !box"
              placeholder="Buscar doctores"
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
              className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
            />
          </div>

          {/*<div className="lg:mr-3">
            <Button
              variant={showFilters ? "primary" : "outline-primary"}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Lucide icon="Filter" className="w-4 h-5" />
            </Button>
            </div>*/}
        </div>

        <div className="flex justify-between">
          {/* <div className="w-full mb-3">
            <Link href={PatientsRoutesEnum.PatientsCreate}>
              <Button variant="primary" className="w-full">
                <Lucide icon="Plus" className="mr-2" />
                Nuevo paciente
              </Button>
            </Link>
          </div>

          <div className="ml-3">
            <Button
              variant={showFilters ? "primary" : "outline-primary"}
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 -py-2"
            >
              <Lucide icon="MoreHorizontal" className="w-full h-10" />
            </Button>
          </div> */}
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
                    router.replace(DoctorsRoutesEnum.DoctorsList);
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
