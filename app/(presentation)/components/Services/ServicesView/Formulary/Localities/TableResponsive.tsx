import Image from "next/image"
import { Dispatch, SetStateAction, useContext, useMemo } from "react"
import { AiFillBuild } from "react-icons/ai"
import { NumericFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";
import { IServicesContext, ServicesContext } from "../../../context/ServicesContext";


interface ITableProps {
  services: any[], 
  setServices: Dispatch<SetStateAction<any[]>>
}

export default function TableResponsive ({services, setServices} : ITableProps) {
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

  const LocalityComponent = ({ data, index }: { data: any; index: any; }) => {
    return (
      <div className="bg-white border rounded-lg cursor-pointer">
        <div className="w-full h-40 bg-primary/40 text-primary flex justify-center items-center text-3xl">
          {data?.image_url?.length > 0 ? (
            <Image
              src={data?.image_url}
              alt=""
              width={400}
              height={400}
              className="w-full h-full object-fill"
            />
          ) : (
            <AiFillBuild />
          )}
        </div>
        <div className="p-4 flex flex-col justify-start items-start gap-2">
          <div className="relative flex flex-col justify-center items-start">
            <p className="font-semibold text-xl text-gray-950">{data.name}</p>
          </div>
          <div className="text-left w-full">
            <p className="font-light text-gray-500 text-sm">Dirección</p>
            <p className="font-normal w-full text-gray-950 text-base truncate">
              {data.address.postal_code ? data.address.postal_code : "No especificado"}
            </p>
          </div>
          <div className="text-left w-full">
            <p className="font-light text-gray-500 text-sm">Precio</p>
            <div className="relative w-full mt-1">
              <div className="w-full">
                <NumericFormat
                  value={
                    services[index]?.base_price > 0
                      ? services[index]?.base_price
                      : undefined
                  }
                  decimalScale={2}
                  prefix={""}
                  placeholder="Precio"
                  thousandSeparator="."
                  decimalSeparator=","
                  onValueChange={(values, sourceInfo) => {
                    const newList: any[] = []
                    
                    services.map((elem, i) => {
                      if(i === index) {
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
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando las localidades.
        </p>
      </div>
    );
  }

  if (successful && [...(localities as Array<any>)].length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no tienes Localidades aún
        </p>
        <p className="font-light text-slate-500 text-base">
          Aún no tienes prestas este servicio en ninguna localidad.
        </p>
      </div>
    );
  }

  return(
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 overflow-auto lg:overflow-visible z-0">
      {localities?.length > 0 &&
        localities.map((center, i) => (
          <LocalityComponent data={center} index={i} />
      ))}
    </div>
  )
}