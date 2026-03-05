import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

type DataPoint = {
    hour: string;
    collections: number;
};

const data: DataPoint[] = [
    { hour: "08", collections: 4 },
    { hour: "09", collections: 7 },
    { hour: "10", collections: 11 },
    { hour: "11", collections: 8 },
    { hour: "12", collections: 5 },
    { hour: "13", collections: 6 },
    { hour: "14", collections: 9 },
    { hour: "15", collections: 7 },
];

export default function CollectionsPerHourChart() {
    return (
        <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                        dataKey="collections"
                        fill="#143757"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};