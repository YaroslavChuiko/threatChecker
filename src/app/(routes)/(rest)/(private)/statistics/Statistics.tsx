"use client";

import ProtocolIcon from "~/components/icons/ProtocolIcon";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type ChartData,
} from "chart.js";
import { type ComponentProps } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export const options: ComponentProps<typeof Bar>["options"] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Sites scanned by month",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data: ChartData<"bar", number[], string> = {
  labels,
  datasets: [
    {
      label: "Sites scanned",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgba(169, 215, 164, 0.3)",
      borderColor: "rgba(169, 215, 164, 1)",
      // borderRadius: 5,
      borderWidth: 2,
      hoverBackgroundColor: "rgba(169, 215, 164, 1)",
      hoverBorderColor: "rgba(169, 215, 164, 1)",
      hoverBorderWidth: 2,
    },
    {
      label: "High risk sites",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgba(255, 56, 69, 0.3)",
      borderColor: "rgba(255, 56, 69, 1)",
      // borderRadius: 5,
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255, 56, 69, 1)",
      hoverBorderColor: "rgba(255, 56, 69, 1)",
      hoverBorderWidth: 2,
    },
  ],
};

export const optionsDoughnut: ComponentProps<typeof Doughnut>["options"] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "All sites scanned by risk level",
    },
  },
};

export const dataDoughnut: ChartData<"doughnut", number[], unknown> = {
  labels: ["Low", "Medium", "High"],
  datasets: [
    {
      label: "# detected by Vendors",
      data: [19, 5, 3],
      backgroundColor: [
        "rgba(29, 237, 131, 0.3)",
        "rgba(241, 181, 55, 0.3)",
        "rgba(255, 56, 69, 0.3)",
      ],
      borderColor: [
        "rgba(29, 237, 131, 1)",
        "rgba(241, 181, 55, 1)",
        "rgba(255, 56, 69, 1)",
      ],
      hoverBackgroundColor: [
        "rgba(29, 237, 131, 1)",
        "rgba(241, 181, 55, 1)",
        "rgba(255, 56, 69, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

export const Statistics = () => {
  return (
    <section className="flex grow content-start items-center justify-center">
      <div className="w-full max-w-7xl">
        <div className="relative flex h-10 w-[calc(100%-1px)] select-none items-center justify-between bg-primary px-5 text-lg font-medium leading-none text-secondary/90 shadow-[0px_0px_10px_3px] shadow-primary/20 before:absolute before:inset-x-4 before:bottom-0 before:z-10 before:block before:h-[1px] before:bg-secondary/90 before:content-['']">
          <span aria-hidden="true">CYBERSPACE SCANNING STATISTICS CONSOLE</span>
          <div
            className="flex select-none flex-col items-start gap-[3px] text-[5px] font-semibold text-secondary/90"
            aria-hidden="true"
          >
            <span>IMAGE TYPE: ARM SILVER KERNEL IMAGE</span>
            <span>(LZO COMPRESSED)</span>
            <span>LOAD ADDRESS: 0000020010000</span>
          </div>
        </div>
        <div className="flex flex-col items-start border border-primary bg-primary/5 px-6 py-8 shadow-[0px_0px_5px_2px] shadow-primary/20">
          <div className="grid grid-cols-[1fr_400px] gap-16 w-full">
            <div>
              <Bar
                options={options}
                data={data}
                className="h-[450px] w-full"
              />
            </div>
            <div className="h-[250px]">
              <Doughnut
                options={optionsDoughnut}
                data={dataDoughnut}
                // className="font-complementary"
              />
            </div>
          </div>
        </div>
        <div
          className="flex justify-between py-2 text-primary/60"
          aria-hidden="true"
        >
          <div
            className="text-shadow-primary-md flex select-none flex-col  items-start gap-[2px] text-[8px] leading-none"
            aria-hidden="true"
          >
            <span>
              CUSTOM GLITCHES ON UI MAY APPEAR, BASED ON THIS ANALYSIS.
            </span>
            <span>DOCUMENT/D/1IIJTZLABKET3JDHXCDQDTCIIHWMIZ8ZZVBTDESD900</span>
            <span>TYPE: CYBERSPACE</span>
          </div>
          <ProtocolIcon className="h-6 drop-shadow-primary-md" />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
