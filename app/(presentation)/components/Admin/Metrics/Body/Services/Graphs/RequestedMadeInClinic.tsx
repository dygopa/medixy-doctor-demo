import React from 'react'
import {
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    Rectangle,
    BarChart
} from 'recharts';

const RequestedMadeInClinic = () => {

    const data = [
        {name: 'Cantidad órdenes contratadas en la clínica', value: 2780},
        {name: 'Cantidad emitidas por médicos', value: 2420}
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default RequestedMadeInClinic