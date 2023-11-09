import { Dispatch, SetStateAction, useContext, useMemo } from "react";
import { IServicesContext, ServicesContext } from "../../../context/ServicesContext";
import Table from "./Table";
import TableResponsive from "./TableResponsive";

interface ILocalitiesListProps {
  serviceId: number; 
  userId: number | string,
  services: any[], 
  setServices: Dispatch<SetStateAction<any[]>>
}

export default function LocalitiesList({serviceId, userId, services, setServices}: ILocalitiesListProps) {
  const { state, actions, dispatch } =
    useContext<IServicesContext>(ServicesContext);
  const { getLocalitiesToService } = actions;

  useMemo(() => {
    if(serviceId) {
      getLocalitiesToService(serviceId, userId)(dispatch);
    }
  }, [serviceId]);

  return(
    <div>
      <div className="lg:block md:block hidden">
        <Table services={services} setServices={setServices} />
      </div>

      <div className="lg:hidden md:hidden block mt-5">
        <TableResponsive services={services} setServices={setServices} />
      </div>
    </div>
  )
}