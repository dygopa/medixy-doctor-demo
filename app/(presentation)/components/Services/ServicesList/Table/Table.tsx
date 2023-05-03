import { IOrder } from "domain/core/entities/orderEntity";
import { IUser } from "domain/core/entities/userEntity";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import Link from "next/link";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext, useMemo } from "react";
import { IServicesContext, ServicesContext } from "../../context/ServicesContext";
import { IService } from "domain/core/entities/serviceEntity";

export default function Table({user}:{
  user: IUser;
}){

  const { state, actions, dispatch } = useContext<IServicesContext>(ServicesContext);
  const { 
      data, 
      loading, 
      successful, 
      error 
  } = state.getUserServices;
  const { getUserServices } = actions
  

  const TableData = ({data}:{data:IService}) => {
    return(
      <Link 
      href={`/services/${data.id}`}
      className="cursor-pointer w-full grid grid-cols-4 items-center justify-items-start bg-white px-3 py-4 border rounded-lg">
        <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">{data.name}</p>
        <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">{data.service_category.name}</p>
        <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
          <div className="w-full flex justify-start items-center gap-2">
            <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
            <p className="text-sm font-medium text-slate-900">Activo</p>
          </div>
        </p>
        <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">${data.base_price}</p>
      </Link>
    )
  }

  useMemo(()=>{
    if(user.userId) getUserServices(user.userId)(dispatch)
  },[user.userId])

  return (
    <div>
      <div className="w-full grid grid-cols-4 items-center justify-items-start pb-3 mb-3 border-b border-slate-200 p-3">
        <p className="border-b-0 whitespace-nowrap text-sm font-light text-slate-500">Servicio</p>
        <p className="border-b-0 whitespace-nowrap text-sm font-light text-slate-500">Categoría</p>
        <p className="border-b-0 whitespace-nowrap text-sm font-light text-slate-500">Estatus</p>
        <p className="border-b-0 whitespace-nowrap text-sm font-light text-slate-500">Precio base</p>
      </div>
      {loading &&
        <div className="w-full flex flex-col justify-center items-center">
          <p className="font-bold text-slate-900 text-lg">Un momento...</p>
          <p className="font-light text-slate-500 text-base">Cargando tus servicios.</p>
        </div>
      }
          
      {(successful && [...data as Array<IService>].length > 0) && 
        [...data as Array<IService>].map((service, i)=> <TableData data={service} key={i} />)
      }
      
      {(successful && [...data as Array<IService>].length === 0) && 
        <div className="w-full flex flex-col justify-center items-center">
          <p className="font-bold text-slate-900 text-lg">Vaya, no tienes servicios aún</p>
          <p className="font-light text-slate-500 text-base">Lo sentimos, pero no tienes servicios agregados todavia.</p>
        </div>
      }
    </div>
  );
}
