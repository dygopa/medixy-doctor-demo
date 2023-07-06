import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Filters() {
  const [showFilters, setShowFilters] = useState(false);

  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search_query");
  const sinceAt = searchParams.get("since_at");
  const untilAt = searchParams.get("until_at");

  const router = useRouter();

  const [values, setValues] = useState({
    query: searchQuery ?? "",
    sinceAt: sinceAt ?? "",
    untilAt: untilAt ?? "",
  });

  const handleSearch = () => {
    const query = `?search_query=${values.query}&since_at=${values.sinceAt}&until_at=${values.untilAt}&page=1`;

    router.replace(MedicalRecordRoutesEnum.MedicalRecordList + query);
  };

  return (
    <div className="w-full">
      <div className="md:flex justify-between align-middle w-full">
        <div className="flex justify-between mb-4 w-full">
          <div className="relative lg:w-60 text-slate-500">
            <FormInput
              type="text"
              className="w-full md:w-60 pr-10 !box"
              placeholder="Buscar por nombre o curp"
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

          <div className="lg:mr-3 ml-2">
            <Button
              variant={showFilters ? "primary" : "outline-primary"}
              onClick={() => setShowFilters(!showFilters)}
              className="px-4"
            >
              <Lucide icon="Filter" className="w-4 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4">
          <div className="lg:flex justify-between align-middle">
            <div className="grid lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
              <div className="mb-3">
                <div className="font-medium text-left mb-3">Fecha desde</div>

                <FormInput
                  type="date"
                  className="w-56 pr-10 !box"
                  placeholder="Desde"
                  value={values.sinceAt}
                  onChange={(e) =>
                    setValues({ ...values, sinceAt: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <div className="font-medium text-left mb-3">Fecha hasta</div>

                <FormInput
                  type="date"
                  className="w-56 pr-10 !box"
                  placeholder="Hasta"
                  value={values.untilAt}
                  onChange={(e) =>
                    setValues({ ...values, untilAt: e.target.value })
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
                      sinceAt: "",
                      untilAt: "",
                    });
                    router.replace(MedicalRecordRoutesEnum.MedicalRecordList);
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
