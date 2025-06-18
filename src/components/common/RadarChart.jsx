import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ data, theme }) => {
  const chartData = {
    labels: ['IDEATION', 'EXPERIENCING', 'EVALUATION', 'THINKING'],
    datasets: [
      {
        label: 'Profile',
        data: [
          data.ideation || 0,
          data.experiencing || 0,
          data.evaluation || 0,
          data.thinking || 0
        ],
        backgroundColor: `${theme.bright}40`, // 25% opacity
        borderColor: theme.bright,
        borderWidth: 3,
        pointBackgroundColor: theme.bright,
        pointBorderColor: theme.dark,
        pointHoverBackgroundColor: theme.dark,
        pointHoverBorderColor: theme.bright,
        pointRadius: 5,
        pointHoverRadius: 7,
        cursor: 'pointer',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.dark,
        titleColor: theme.bright,
        bodyColor: theme.bright,
        borderColor: theme.bright,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.parsed.r}%`;
          }
        }
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 50,
        min: 0,
        ticks: {
          stepSize: 10,
          color: theme.bright,
          font: {
            size: 10,
            family: 'IBM Plex Sans'
          },
          backdropColor: 'transparent',
          callback: function(value) {
            return value;
          }
        },
        grid: {
          color: theme.bright,
          lineWidth: 1,
        },
        angleLines: {
          color: theme.bright,
          lineWidth: 0.6,
        },
        pointLabels: {
          color: theme.bright,
          font: {
            size: 12,
            weight: 350,
            family: 'IBM Plex Sans'
          },
          
          padding: 5,
        },
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
    },
  };

  return (
    <div style={{
      width: '100%',
      height: '250px',
      position: 'relative'
    }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart; 