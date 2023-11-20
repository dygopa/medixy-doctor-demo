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
        {
            name: 'Enero',
            amt: 2400,
        },
        {
            name: 'Febrero',
            amt: 2210,
        },
        {
            name: 'Marzo',
            amt: 2290,
        },
        {
            name: 'Abril',
            amt: 2000,
        },
        {
            name: 'Mayo',
            amt: 2181,
        },
        {
            name: 'Junio',
            amt: 2500,
        },
        {
            name: 'Julio',
            amt: 2100,
        },
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
                <Bar dataKey="amt" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default DistributionLastMonths