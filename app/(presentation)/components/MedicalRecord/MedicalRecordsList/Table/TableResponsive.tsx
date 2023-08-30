import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Link from "next/link";
import { useContext, useEffect } from "react";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import { useSearchParams } from "next/navigation";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import {
  IMedicalRecordsListContext,
  MedicalRecordsListContext,
} from "../context/MedicalRecordsListContext";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";

export default function TableResponsive() {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: user } = authState.getUserAuthenticated;

  const { state, actions, dispatch } = useContext<IMedicalRecordsListContext>(
    MedicalRecordsListContext
  );
  const {
    data: medicalConsulties,
    loading,
    successful,
    error,
  } = state.medicalConsulties;
  const { getMedicalConsulties } = actions;

  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const searchQuery = searchParams.get("search_query");
  const sinceAt = searchParams.get("since_at");
  const untilAt = searchParams.get("until_at");

  useEffect(() => {
    getMedicalConsulties({
      doctorId: user.userId ? parseInt(user.userId, 10) : 0,
      searchQuery: searchQuery && searchQuery.length > 0 ? searchQuery : null,
      sinceAt: sinceAt ? new Date(sinceAt) : null,
      untilAt: untilAt ? new Date(untilAt) : null,
      page: page && page?.length > 0 ? parseInt(page.toString(), 10) : 1,
      limit: 10,
    })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sinceAt, untilAt, searchQuery]);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-6">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando tus consultas médicas.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-6">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo no ha salido como se esperaba
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, algo no ha salido bien. Vuelve a intentarlo
        </p>
      </div>
    );
  }

  if (
    successful &&
    medicalConsulties.data &&
    medicalConsulties.data?.length === 0
  ) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-6">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no tienes consultas médicas aún
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no tienes consultas médicas realizadas todavia.
        </p>
      </div>
    );
  }

  return (
    <>
      {medicalConsulties.data?.length > 0 &&
        medicalConsulties.data.map((medicalConsulty: IMedicalConsulty) => (
          <div
            key={medicalConsulty.subjectId}
            className="mt-2 overflow-auto bg-white border rounded-lg p-4 flex flex-col justify-between items-start gap-4"
          >
            <div className="w-full flex justify-between items-center gap-4">
              <Link
                href={{
                  pathname:
                    MedicalRecordRoutesEnum.MedicalRecord +
                    medicalConsulty.id +
                    MedicalRecordRoutesEnum.MedicalRecordSummary,
                }}
                className="w-full flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/40 text-primary flex justify-center items-center rounded-md text-xl">
                  <Lucide icon="FileText" size={25} />
                </div>

                <div className="relative flex flex-col justify-center items-start">
                  <p
                    className="font-semibold text-md text-gray-950"
                    style={{
                      display: "block",
                      textOverflow: "ellipsis",
                      wordWrap: "break-word",
                      overflow: "hidden",
                      maxHeight: "3.6em",
                      lineHeight: "1.8em",
                    }}
                  >
                    {medicalConsulty.diagnose &&
                    medicalConsulty.diagnose?.length > 0
                      ? medicalConsulty.diagnose[0].description
                      : ""}
                  </p>
                  <p className="font-light text-sm text-slate-500">
                    {new Date(medicalConsulty.consultationDate).getDate()}/
                    {new Date(medicalConsulty.consultationDate).getMonth()}/
                    {new Date(medicalConsulty.consultationDate).getFullYear()}
                  </p>
                </div>
              </Link>
            </div>
            <div className="w-full grid grid-cols-2 gap-1">
              <div className="flex flex-col justify-start items-start gap-2 text-left">
                <p className="font-light text-gray-500 text-sm">Paciente</p>
                <p className="font-normal text-gray-950 text-md">
                  {medicalConsulty.subject.name}{" "}
                  {medicalConsulty.subject.lastName}
                </p>
              </div>
              <div className="flex flex-col justify-start items-center gap-2 text-left">
                <p className="font-light text-gray-500 text-sm">CURP</p>
                <p className="font-normal text-gray-950 text-md">
                  {medicalConsulty.subject.curp &&
                  medicalConsulty.subject.curp.length > 0
                    ? medicalConsulty.subject.curp
                    : "No especificado"}
                </p>
              </div>
            </div>
          </div>
        ))}

      <div className="flex justify-center mt-8 overflow-x-hidden">
        <Paginate
          page={page ? page.toString() : "1"}
          limit={medicalConsulties.metadata?.limit ?? 0}
          total={medicalConsulties.metadata?.total}
        />
      </div>
    </>
  );
}
