import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js/auto";

Chart.register(ArcElement);

const GraphsPanel = () => {
  const [chartData, setChartData] = useState({
    data: {
      labels: [],
      datasets: [],
    },
    options: {},
  });

  useEffect(() => {
    const data = {
      labels: ["Prepared", "Unprepared"],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ["rgb(34, 197, 94)", "rgb(239, 68, 68)"],
          hoverBackgroundColor: ["rgb(22, 163, 74)", "rgb(220, 38, 38)"],
        },
      ],
    };

    const options = {
      cutout: "60%",
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label;
              const value = context.formattedValue;
              return label === "Prepared"
                ? `Seats with minimum 2 parties and 1 employee: ${value}`
                : `Seats with less than 2 parties and 1 employee: ${value}`;
            },
          },
        },
      },
      doughnutlabel: {
        labels: [
          {
            text: "Total",
            font: {
              size: 18,
              weight: "bold",
            },
          },
          {
            text: (context) => {
              const sum = context.dataset.data.reduce((a, b) => a + b, 0);
              return sum.toString();
            },
            font: {
              size: 18,
              weight: "bold",
            },
          },
        ],
      },
    };

    setChartData({ data, options });
  }, []);

  return (
    <div style={{ flex: 1, width: "250px" }}>
      {chartData.data.labels.length > 0 &&
        chartData.data.datasets.length > 0 && (
          <Doughnut data={chartData.data} options={chartData.options} />
        )}
    </div>
  );
};

export default GraphsPanel;
