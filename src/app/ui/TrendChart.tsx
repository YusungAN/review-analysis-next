import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    stacked: false,
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            min: 0,
            max: 100,
        },
    },
};

const TrendChart = (args: { frequency: number[][], x: string[], label: string, forecastCheck: boolean }) => {
    const { frequency, x, label, forecastCheck } = args;
    // console.log(frequency);
    const [data, setData] = useState<{labels: string[], datasets: {label: string, data: number[], borderColor: string, backgroundColor: string, yAxisID: string}[]}>({
        labels: forecastCheck ? x : x.slice(0, 157),
        datasets: [
            {
                label: label,
                data: forecastCheck ? frequency[0] : frequency[0].slice(0, 157),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y',
            },
        ],
    });
    useEffect(() => {
        console.log(data);
        setData({
            labels: forecastCheck ? x : x.slice(0, 157),
            datasets: [
                {
                    label: label,
                    data: forecastCheck ? frequency[0] : frequency[0].slice(0, 157),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y',
                },
            ],
        });
    }, [frequency, x, forecastCheck]);

    return <Line options={options} data={data} />;
};

export default TrendChart;