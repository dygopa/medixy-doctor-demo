import Table from "(presentation)/components/core/BaseComponents/Table";
import { Dispatch, SetStateAction, useContext, useMemo, useState } from "react";
import { IServicesContext, ServicesContext } from "../../../context/ServicesContext";
import { NumericFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";

interface ITableProps {
  services: any[], 
  setServices: Dispatch<SetStateAction<any[]>>
}

export default function TableLocalities({services, setServices} : ITableProps) {
  const { state, actions, dispatch } =
    useContext<IServicesContext>(ServicesContext);
  
  const { data: localities, loading, successful } = state.getLocalitiesToService
  
  useMemo(() => {
    if(localities) {
      let listServices: any[] = []
      localities.map((elem) => {
        elem.service && listServices.push(elem.service)
      })

      setServices(listServices)
    }
  }, [localities, successful])

  return(
    <div>
      <div className="col-span-12 overflow-auto lg:overflow-visible z-0 w-full">
        <Table className="border-spacing-y-[10px] border-separate max-w-screen-xl">
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Localidad
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Codigo Postal
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Ciudad
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Precio del Servicio
              </Table.Th>

              {/*<Table.Th className="text-center border-b-0 whitespace-nowrap">
                Opciones
              </Table.Th>*/}
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody className="z-0">
            {localities?.length > 0 &&
              localities.map((locality: any, i) => (
                <Table.Tr key={locality.id} className="">
                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 truncate bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                  >
                    {locality.name}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                  >
                    {locality.address.postal_code.length > 0 ? locality.address.postal_code : "No especificado"}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                  >
                    {locality.address.city.length > 0 ? locality.address.city : "No especificado"}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                  >
                    <div className="relative w-full">
                      <div className="w-full">
                        <NumericFormat
                          value={
                            services[i]?.base_price > 0
                              ? services[i]?.base_price
                              : undefined
                          }
                          decimalScale={2}
                          prefix={""}
                          placeholder="Precio"
                          thousandSeparator="."
                          decimalSeparator=","
                          onValueChange={(values, sourceInfo) => {
                            const newList: any[] = []
                            
                            services.map((elem, index) => {
                              if(index === i) {
                                newList.push({
                                  ...elem,
                                  base_price: values.floatValue
                                  ? values.floatValue
                                  : 0,
                                })
                              } else {
                                newList.push(elem)
                              }
                            },

                            setServices(newList)
                          )}}
                          className={twMerge([
                            "disabled:bg-gray-300 text-left pl-5 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900 w-full",
                            "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                            "transition duration-200 ease-in-out w-full bg-gray-100 text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80",
                          ])}
                        />
                      </div>
                      <div className="absolute left-2 top-2 text-md text-gray-400">
                        $
                      </div>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>

        {loading && (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="font-bold text-slate-900 text-lg text-center">
              Un momento...
            </p>
            <p className="font-light text-slate-500 text-base text-center">
              Cargando las localidades.
            </p>
          </div>
        )}

        {successful &&
          localities &&
          [...(localities as Array<any>)].length === 0 && (
            <div className="w-full flex flex-col justify-center items-center text-center">
              <p className="font-bold text-slate-900 text-lg">
                Vaya, no tienes Localidades aún
              </p>
              <p className="font-light text-slate-500 text-base text-center">
                Aún no prestas este servicio en ninguna localidad.
              </p>
            </div>
          )}
      </div>
    </div>
  )
}