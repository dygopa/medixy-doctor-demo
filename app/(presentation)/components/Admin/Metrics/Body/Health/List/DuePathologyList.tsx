import React from 'react'
import Table from "(presentation)/components/core/BaseComponents/Table";
import { twMerge } from 'tailwind-merge';

const DuePathologyList = () => {

    let data:any[] = [
        {
            title: "Enero",
            total: "73.8"
        },
        {
            title: "Febrero",
            total: "43.05"
        },
        {
            title: "Marzo",
            total: "49.2"
        },
        {
            title: "Abril",
            total: "24.6"
        },
        {
            title: "Abril",
            total: "18.45"
        },
    ]

    return (
        <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
                <Table.Tr>
                    <Table.Th className="border-b-0 whitespace-nowrap text-base">
                        Meses
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap text-base">
                        Casos
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
            {
                data.map((elem, i:number) => (
                    <Table.Tr
                        key={i}
                        onClick={()=>{}}
                        className="bg-white cursor-pointer"
                    >
                        <Table.Td>
                            <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                                {elem["title"]}
                            </p>
                        </Table.Td>
                        <Table.Td>
                            <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                                {elem["total"]}
                            </p>
                        </Table.Td>
                    </Table.Tr>
                ))
            }
            </Table.Tbody>
        </Table>
    )
}

export default DuePathologyList