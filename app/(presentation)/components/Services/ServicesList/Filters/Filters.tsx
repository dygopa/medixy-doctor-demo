import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import { TreatmentsRoutesEnum } from "(presentation)/(routes)/treatmentsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IUser } from "domain/core/entities/userEntity";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Filters() {
  const [showFilters, setShowFilters] = useState(false);

  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search_query");
  const operator = searchParams.get("operator");
  const diagnostic = searchParams.get("diagnostic");
  const medicalUnit = searchParams.get("medicalUnit");

  const router = useRouter();

  const [values, setValues] = useState({
    query: searchQuery ?? "",
    diagnostic: diagnostic ?? "",
    medicalUnit: medicalUnit ?? "",
    operator: operator ?? "",
  });

  const handleSearch = () => {
    const query = `?search_query=${values.query}&page=1`;

    router.replace(TreatmentsRoutesEnum.Treatments + query);
  };

  return (
    <div>
      <div className="flex justify-between items-start">
        <div className="flex">
          <div className="relative w-56 text-slate-500 mr-6">
            <FormInput
              type="text"
              className="w-56 pr-10 !box"
              placeholder="Buscar reporte"
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

        <div className="flex">
          <div className="mr-3">
            <Link href={ServicesRoutesEnum.ServicesCreate}>
              <Button variant="primary">
                <Lucide icon="Plus" className="mr-2" />
                Nuevo servicio
              </Button>
            </Link>
          </div>
        </div>

      </div>

      {showFilters && (
        <div className="mt-4">
          <div className="flex justify-between align-middle">
            <div className="grid lg:grid-cols-5 grid-cols-1 gap-5">
              <div className="mb-3">
                <div className="font-medium text-left mb-3">Diagnostico</div>

                <FormInput
                  type="text"
                  className="w-full !box"
                  placeholder="Diagnostico"
                />
              </div>

              <div className="mb-3">
                <div className="font-medium text-left mb-3">Unidad médica</div>

                <FormSelect
                  value={values.operator}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      medicalUnit: e.target.value,
                    })
                  }
                  className="w-full"
                  aria-label=".form-select-lg example"
                >
                  <option value="" disabled>
                    Todos
                  </option>
                </FormSelect>
              </div>

              <div className="mb-3">
                <div className="font-medium text-left mb-3">Operador</div>

                <FormSelect
                  value={values.operator}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      operator: e.target.value,
                    })
                  }
                  className="w-full"
                  aria-label=".form-select-lg example"
                >
                  <option value="" disabled>
                    Todos
                  </option>
                </FormSelect>
              </div>

              <div className="mb-3">
                <div className="font-medium text-left mb-3">Desde</div>

                <FormInput
                  type="date"
                  className="w-full"
                  aria-label=".form-select-lg example"
                />
              </div>

              <div className="mb-3">
                <div className="font-medium text-left mb-3">Hasta</div>

                <FormInput
                  type="date"
                  className="w-full"
                  aria-label=".form-select-lg example"
                />
              </div>
            </div>

            <div className="flex items-center text-end mt-6 ml-5">
              <Button
                variant="primary"
                onClick={() => {
                  handleSearch();
                  close();
                }}
                className="w-32 mr-3"
              >
                Filtrar
              </Button>

              <Button
                variant="outline-primary"
                onClick={() => {
                  setValues({
                    query: searchQuery ?? "",
                    diagnostic: diagnostic ?? "",
                    medicalUnit: medicalUnit ?? "",
                    operator: operator ?? "",
                  });
                  router.replace(TreatmentsRoutesEnum.Treatments);
                  close();
                }}
                className="w-32 ml-auto"
              >
                Limpiar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
