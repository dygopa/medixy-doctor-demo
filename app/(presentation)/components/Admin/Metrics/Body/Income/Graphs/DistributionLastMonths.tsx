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

const DistributionLastMonths = () => {

    const data = [
        {name: 'Enero', value: 2400 },
        {name: 'Febrero', value: 2210 },
        {name: 'Marzo', value: 2290 },
        {name: 'Abril', value: 2000 },
        {name: 'Mayo', value: 2181 },
        {name: 'Junio', value: 2500 },
        {name: 'Julio', value: 2100 },
        {name: 'Agosto', value: 800 },
        {name: 'Septiembre', value: 1800 },
        {name: 'Octubre', value: 1800 },
        {name: 'Noviembre', value: 2400 },
        {name: 'Diciembre', value: 3500 },
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

export default DistributionLastMonths