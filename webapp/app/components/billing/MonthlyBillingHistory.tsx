"use client";
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
  ChartOptions,
  ChartData,
} from "chart.js";
import Image from "next/image";
import { DictionaryType } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyBillingHistory = ({
  dictionary,
  billHistoryData,
}: {
  dictionary: DictionaryType;
  billHistoryData: any;
}) => {
  const months = billHistoryData.map((yearData: any) =>
    yearData.data.map((monthData: any) => monthData.month)
  );
  const uniqueMonths = [...new Set(months.flat())];

  const data: ChartData<"bar"> = {
    labels: uniqueMonths,
    datasets: billHistoryData.map((yearData: any) => ({
      label: yearData.year.toString(),
      data: yearData.data.map((monthData: any) => monthData.amount),
      backgroundColor: yearData.year === 2022 ? "#00A3FF" : "#CA0000",
      barPercentage: 0.6,
    })),
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: dictionary.billings.month,
          color: "#9C9C9C",
          font: {
            weight: 500,
          },
          padding: { top: 10 },
        },
        ticks: {
          color: "#9C9C9C",
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white shadow-[2px_2px_18px_0px_#00000014] p-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3 mb-3">
          <h5 className="text-2xl tracking-[0.5px] font-bold text-[#333333] font-poppins">
            {dictionary.billings.monthly_billing_history}
          </h5>
          <p className="text-[#333333] font-bold font-poppins">
            {dictionary.billings.year_by_year_comparison}
          </p>
          <div className="w-12 h-1 bg-[#FDB825] mt-2" />
        </div>
        <div>
          <Image
            src="/images/calendar.svg"
            alt="calendar"
            width={21}
            height={21}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mb-6 mr-6">
        <p className="text-[#9C9C9C] text-xs font-semibold tracking-wide">
          {dictionary.billings.monthly_service_cost_in_dollars}
        </p>
        <div className="flex gap-6">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#00A3FF]" />
            <p className="text-[#9C9C9C] text-xs font-semibold">2022</p>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#CA0000]" />
            <p className="text-[#9C9C9C] text-xs font-semibold">2023</p>
          </div>
        </div>
      </div>
      <Bar data={data} options={options} width={"450px"} height={"200px"} />
    </div>
  );
};

export default MonthlyBillingHistory;
