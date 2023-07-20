import { IOrder } from "domain/core/entities/orderEntity";
import { IUser } from "domain/core/entities/userEntity";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import Link from "next/link";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext, useMemo, useState } from "react";
import {
  ILocalitiesContext,
  LocalitiesContext,
} from "../context/LocalitiesContext";
import { ILocality } from "domain/core/entities/localityEntity";
import { AiFillBuild } from "react-icons/ai";
import Image from "next/image";

export default function Table({ user }: { user: IUser }) {
  const { state, actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);
  const { data, loading, successful, error } = state.getUserLocalities;
  const { getUserLocalities } = actions;
  console.log(data)

  const LocalityComponent = ({ data }: { data: ILocality }) => {
    return (
      <Link
        href={`/localities/${data.id}`}
        className="bg-white border rounded-lg p-4 flex flex-col justify-between items-start gap-4 cursor-pointer"
      >
        <div className="w-full flex justify-start items-center gap-4">
          <div className="w-10 h-10 bg-primary/40 text-primary flex justify-center items-center rounded-md text-xl">
            {data?.image_url?.length > 0 ? (
              <Image
                src={data?.image_url}
                alt=""
                width={200}
                height={200}
                className="w-[3rem] h-[2.5rem] rounded-md"
              />
            ) : (
              <AiFillBuild />
            )}
          </div>
          <div className="relative flex flex-col justify-center items-start">
            <p className="font-semibold text-xl text-gray-950">{data.name}</p>
            <p className="font-light text-sm text-slate-500">
              Número: {data.code}
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-1">
          <div className="flex flex-col justify-start items-start gap-2 text-left">
            <p className="font-light text-gray-500 text-sm">Estado</p>
            <p className="font-normal text-gray-950 text-base">
              {data.state.name}
            </p>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 text-left">
            <p className="font-light text-gray-500 text-sm">Ciudad</p>
            <p className="font-normal text-gray-950 text-base">{data.city}</p>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 text-left">
            <p className="font-light text-gray-500 text-sm">Cod. postal</p>
            <p className="font-normal text-gray-950 text-base">
              {data.postal_code}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  useMemo(() => {
    if (user.userId) getUserLocalities(user.userId)(dispatch);
  }, [user.userId]);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando tus consultorios.
        </p>
      </div>
    );
  }

  if (successful && [...(data as Array<ILocality>)].length > 0) {
    return (
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 overflow-auto lg:overflow-visible z-0">
        {[...(data as Array<ILocality>)].map((center, i) => (
          <LocalityComponent data={center} key={i} />
        ))}
      </div>
    );
  }

  if (successful && [...(data as Array<ILocality>)].length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no tienes consultorios aún
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero en la plataforma no hay centros médicos todavia.
        </p>
      </div>
    );
  }

  return <div></div>;
}
