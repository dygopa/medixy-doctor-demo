import { VALIDATE_NUMBERS } from "(presentation)/(utils)/errors-validation";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Table from "(presentation)/components/core/BaseComponents/Table";
import { ISpecialty } from "domain/core/entities/specialtyEntity";
import { IUser } from "domain/core/entities/userEntity";
import { useState } from "react";
import IntlTelInput from "react-intl-tel-input";
import 'react-intl-tel-input/dist/main.css';
import { twMerge } from "tailwind-merge";

interface IFormularyProps {
  specialities: Array<any>,
}

export default function Credentials({ specialities }: IFormularyProps) {
  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b">
          <p className="font-medium text-base text-slate-900 pb-2">
            Credenciales
          </p>
        </div>
        <Table className="border-separate">
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="border-b-0 whitespace-nowrap text-semibold">
                Especialidad
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-semibold">
                Codigo
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-semibold">
                Institucion
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody className="z-0">
          {specialities?.length > 0 &&
            specialities.map((speciality: any) => (
              <Table.Tr key={speciality.id}>
                <Table.Td className="">
                    {speciality.name}
                </Table.Td>
                <Table.Td className="">
                    {speciality.code}
                </Table.Td>
                <Table.Td className="">
                    {speciality.institution_name}
                </Table.Td>
              </Table.Tr>
            ))
          }
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
