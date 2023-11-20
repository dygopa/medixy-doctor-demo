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

const Diabetes = () => {

    const data = [
        {name: 'Enero', value: 400 },
        {name: 'Febrero', value: 210 },
        {name: 'Marzo', value: 290 },
        {name: 'Abril', value: 200 },
        {name: 'Mayo', value: 181 },
        {name: 'Junio', value: 500 },
        {name: 'Julio', value: 100 },
        {name: 'Agosto', value: 800 },
        {name: 'Septiembre', value: 800 },
        {name: 'Octubre', value: 800 },
        {name: 'Noviembre', value: 400 },
        {name: 'Diciembre', value: 500 },
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

export default Diabetes