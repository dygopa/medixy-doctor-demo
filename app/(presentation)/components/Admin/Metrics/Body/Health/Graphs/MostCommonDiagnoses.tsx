import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const MostCommonDiagnoses = () => {

    const data = [
        { name: 'Anema', value: 400 },
        { name: 'Angina de pecho', value: 300 },
        { name: 'Artritis', value: 300 },
        { name: 'Asma', value: 200 },
        { name: 'Colesterol elevado', value: 400 },
        { name: 'Diabetes', value: 500 },
        { name: 'Glaucoma', value: 100 },
        { name: 'Obesidad', value: 50 },
        { name: 'Problemas gástricos', value: 300 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }: {
        cx: number;
        cy: number;
        midAngle: number;
        innerRadius: number;
        outerRadius: number;
        percent: number;
        index: number;
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend 
                    verticalAlign='middle' 
                    layout='vertical' 
                    align='right'
                    width={200}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default MostCommonDiagnoses