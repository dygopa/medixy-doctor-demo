import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext, useEffect } from "react";
import {
  IPatientsListContext,
  PatientsListContext,
} from "../context/PatientsListContext";
import { ISubject } from "domain/core/entities/subjectEntity";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import { useRouter, useSearchParams } from "next/navigation";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import { IUser } from "domain/core/entities/userEntity";

interface ITableResponsiveProps {
  user: IUser;
}

export default function TableResponsive({ user }: ITableResponsiveProps) {
  const { state, actions, dispatch } =
    useContext<IPatientsListContext>(PatientsListContext);
  const { data: patients, loading, successful, error } = state.getSubjects;
  const { getSubjects } = actions;

  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const searchQuery = searchParams.get("search_query");

  useEffect(() => {
    getSubjects({
      userId: user.userId,
      page: page && page?.length > 0 ? parseInt(page.toString(), 10) : "1",
      searchQuery: searchQuery,
      limit: 10,
    })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const router = useRouter();

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando tus Pacientes.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo no ha salido como se esperaba
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, algo no ha salido bien. Vuelve a intentarlo
        </p>
      </div>
    );
  }

  if (successful && patients.data && patients.data?.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no tienes pacientes aún
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no tienes pacientes agregados todavia.
        </p>
      </div>
    );
  }

  return (
    <>
      {patients.data?.length > 0 &&
        patients.data.map((patient: ISubject) => (
          <div
            key={patient.subjectId}
            className="mt-2 overflow-auto bg-white border rounded-lg p-4 flex flex-col justify-between items-start gap-4"
            onClick={() =>
              router.push(
                MedicalRecordRoutesEnum.MedicalRecord + patient.subjectId
              )
            }
          >
            <div className="w-full flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/40 text-primary flex justify-center items-center rounded-md text-xl">
                <Lucide icon="account" />
              </div>

              <div className="relative flex flex-col justify-center items-start">
                <p className="font-semibold text-xl text-gray-950">
                  {patient.name} {patient.lastName}
                </p>
                <p className="font-light text-sm text-slate-500">
                  {patient.curp}
                </p>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-1">
              <div className="flex flex-col justify-start items-start gap-2 text-left">
                <p className="font-light text-gray-500 text-sm">Teléfono</p>
                <p className="font-normal text-gray-950 text-base">
                  {patient.phoneNumber}
                </p>
              </div>
              <div className="flex flex-col justify-start items-center gap-2 text-left">
                <p className="font-light text-gray-500 text-sm">Estatus</p>
                <p className="font-normal text-gray-950 text-base">
                  <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
                  <p className="text-sm font-medium text-slate-900">Activo</p>
                </p>
              </div>
            </div>
          </div>
        ))}

      <div className="flex justify-center mt-8 overflow-x-hidden">
        <Paginate
          page={page ? page.toString() : "1"}
          limit={patients.metadata?.limit ?? 0}
          total={patients.metadata?.total}
        />
      </div>
    </>
  );
}
