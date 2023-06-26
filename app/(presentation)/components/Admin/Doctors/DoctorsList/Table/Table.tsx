import Table from "(presentation)/components/core/BaseComponents/Table";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Link from "next/link";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { useContext, useEffect } from "react";
import {
  IDoctorsListContext,
  DoctorsListContext,
} from "../context/DoctorsListContext";
import { useRouter, useSearchParams } from "next/navigation";
import { ISubject } from "domain/core/entities/subjectEntity";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import { AdminDoctorsRoutesEnum } from "(presentation)/(routes)/admin/doctorsRoutes";
import { IUser } from "domain/core/entities/userEntity";

export default function DoctorsTable() {
  const { state, actions, dispatch } =
    useContext<IDoctorsListContext>(DoctorsListContext);
  const { data: doctors, loading, successful, error } = state.getDoctors;
  const { getDoctors } = actions;

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const searchQuery = searchParams.get("search_query");

  useEffect(() => {
    getDoctors({
      page: page && page?.length > 0 ? parseInt(page.toString(), 10) : "1",
      searchQuery: searchQuery,
      limit: 10,
    })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const toDateString = (date: Date) => {
    const stringDate: string = new Date(date).toLocaleDateString();

    return stringDate;
  };

  return (
    <>
      <div className="col-span-12 overflow-auto lg:overflow-visible z-0 ">
        <Table className="border-spacing-y-[10px] border-separate">
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Doctor
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                CURP
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Teléfono
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Fecha de Registro
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody className="z-0">
            {doctors.data?.length > 0 &&
              doctors.data.map((doctor: IUser) => (
                <Table.Tr key={doctor.userId} className="hover:cursor-pointer">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                    <Link
                      href={{
                        pathname:
                          AdminDoctorsRoutesEnum.DoctorsView + doctor.userId,
                      }}
                    >
                      {doctor.names} {doctor.lastName}
                    </Link>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                    {doctor.curp}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    onClick={() =>
                      router.push(
                        AdminDoctorsRoutesEnum.DoctorsView + doctor.userId
                      )
                    }
                  >
                    {doctor.phone}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    onClick={() =>
                      router.push(
                        AdminDoctorsRoutesEnum.DoctorsView + doctor.userId
                      )
                    }
                  >
                    {toDateString(doctor.createdOn)}
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
              Cargando tus servicios.
            </p>
          </div>
        )}

        {successful && [...(doctors.data as Array<IUser>)].length === 0 && (
          <div className="w-full flex flex-col justify-center items-center text-center">
            <p className="font-bold text-slate-900 text-lg">
              Vaya, no tienes servicios aún
            </p>
            <p className="font-light text-slate-500 text-base text-center">
              Lo sentimos, pero no tienes servicios agregados todavia.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8 overflow-x-hidden">
        <Paginate
          page={page ? page.toString() : "1"}
          limit={doctors.metadata?.limit ?? 0}
          total={doctors.metadata?.total}
        />
      </div>
    </>
  );
}
