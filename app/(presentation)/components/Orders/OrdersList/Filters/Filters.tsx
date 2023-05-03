import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IUser } from "domain/core/entities/userEntity";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ExportToExcel from "./ExportToExcel/ExportToExcel";
import ImportToExcel from "./ImportToExcel/ImportToExcel";

export default function Filters() {
  const [showFilters, setShowFilters] = useState(false);

  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search_query");
  const status = searchParams.get("status");
  const operator = searchParams.get("operator");
  const curp = searchParams.get("curp");
  const identity = searchParams.get("identity");
  const medicalUnit = searchParams.get("medicalUnit");

  const router = useRouter();

  const [values, setValues] = useState({
    query: searchQuery ?? "",
    status: status ?? "",
    curp: curp ?? "",
    identity: identity ?? "",
    medicalUnit: medicalUnit ?? "",
    operator: operator ?? "",
  });

  const handleSearch = () => {
    const query = `?search_query=${values.query}&status=${values.status}&page=1`;

    router.replace(OrdersRoutesEnum.OrdersList + query);
  };

  return (
    <div>
      <div className="lg:flex justify-between">
        <div className="flex mb-8">
          <div className="relative w-56 text-slate-500 mr-6">
            <FormInput
              type="text"
              className="w-56 pr-10 !box"
              placeholder="Buscar citas"
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
            <ExportToExcel />
          </div>

          <div className="mr-3">
            <ImportToExcel />
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4">
          <div className="lg:flex justify-between align-middle">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
              <div className="mb-3">
                <div className="font-medium text-left mb-3">CURP</div>

                <FormInput
                  type="text"
                  className="w-full !box"
                  placeholder="CURP"
                />
              </div>

              <div className="mb-3">
                <div className="font-medium text-left mb-3">Identificación</div>

                <FormInput
                  type="text"
                  className="w-full !box"
                  placeholder="Identificación"
                />
              </div>

              <div className="mb-3">
                <div className="font-medium text-left mb-3">Estado</div>

                <FormSelect
                  value={values.status}
                  onChange={(e) =>
                    setValues({ ...values, status: e.target.value })
                  }
                  className="w-full"
                  aria-label=".form-select-lg example"
                >
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="">Todos</option>
                  <option value="enabled">Confirmada</option>
                  <option value="pending">Por confirmar</option>
                  <option value="cancel">Cancelada</option>
                  <option value="disabled">Deshabilitada</option>
                </FormSelect>
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

            <div className="flex items-center justify-end text-end mt-6 ml-5">
              <div>
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
              </div>

              <div>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setValues({
                      query: searchQuery ?? "",
                      status: status ?? "",
                      curp: curp ?? "",
                      identity: identity ?? "",
                      medicalUnit: medicalUnit ?? "",
                      operator: operator ?? "",
                    });
                    router.replace(OrdersRoutesEnum.OrdersList);
                    close();
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
