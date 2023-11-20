import React from 'react'
import Table from "(presentation)/components/core/BaseComponents/Table";
import { twMerge } from 'tailwind-merge';

const List = () => {

    let data:any[] = [
        {
            title: "Imagenología",
            total: "24%",
            byService: 100000,
            quantityOrder: 200,
            percentage: "40%",
            averagePriceService: 10000,
            amountIssuedDoctors: 1000
        },
        {
            title: "Imagenología",
            total: "24%",
            byService: 100000,
            quantityOrder: 200,
            percentage: "40%",
            averagePriceService: 10000,
            amountIssuedDoctors: 1000
        },
        {
            title: "Imagenología",
            total: "24%",
            byService: 100000,
            quantityOrder: 200,
            percentage: "40%",
            averagePriceService: 10000,
            amountIssuedDoctors: 1000
        },
    ]

    return (
        <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
                <Table.Tr>
                    <Table.Th className="border-b-0 whitespace-nowrap text-base">
                        Servicio
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap text-base">
                        % en los ingresos totales
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap text-base">
                        Total acumulado por servicio
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap text-base">
                        Cantidad órdenes contratados en la clínica
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap text-base">
                        % realizado en la clínica
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap text-base">
                        Precio promedio servicio
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap text-base">
                        Cantidad emitidas por médicos
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
                        <Table.Td>
                            <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                                {elem["byService"]}
                            </p>
                        </Table.Td>
                        <Table.Td>
                            <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                                {elem["quantityOrder"]}
                            </p>
                        </Table.Td>
                        <Table.Td>
                            <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                                {elem["percentage"]}
                            </p>
                        </Table.Td>
                        <Table.Td>
                            <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                                {elem["averagePriceService"]}
                            </p>
                        </Table.Td>
                        <Table.Td>
                            <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                                {elem["amountIssuedDoctors"]}
                            </p>
                        </Table.Td>

                    </Table.Tr>
                ))
            }
            </Table.Tbody>
        </Table>
    )
}

export default List