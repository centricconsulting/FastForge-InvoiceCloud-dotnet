import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyBillingHistory: React.FC = () => {
  const data = {
    labels: [
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
    ],
    datasets: [
      {
        label: "2022",
        data: [50, 60, 70, 40, 90, 110, 150, 130, 40, 20],
        backgroundColor: "#60A5FA", // Blue
      },
      {
        label: "2023",
        data: [45, 55, 75, 35, 100, 120, 160, 140, 30, 25],
        backgroundColor: "#F87171", // Red
      },
    ],
  };

  const options: ChartJS.ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#6B7280", // Gray-500
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
          color: "#6B7280", // Gray-500
        },
      },
      y: {
        title: {
          display: true,
          text: "Monthly Service Cost in dollars",
          color: "#6B7280", // Gray-500
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Monthly Billing History
          </h2>
          <p className="text-gray-600 font-medium">Year by Year Comparison</p>
          <div className="w-16 h-1 bg-yellow-400 mt-2"></div>
        </div>
        <div>
          <button className="p-2 rounded-full bg-purple-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-5 4a5 5 0 00-5 5v7h14v-7a5 5 0 00-5-5z"
              />
            </svg>
          </button>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyBillingHistory;
