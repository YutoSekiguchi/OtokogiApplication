import { addCommasToNumber } from "../modules/addCommasToNumber";

export const graphOptions = {
  responsive: true,
  plugins: {
    
    legend: {
      position: 'bottom' as const,
      color: "#fff",
      labels: {
        font: {
          size: 10
        }
      }
    },
  },
  scales: {
  y:
    {
      ticks: {
        beginAtZero: true,
        callback: function (label: number | string) {
          if (typeof label === "number" && Math.floor(label) === label) {
            return addCommasToNumber(label);
          }
        },
      },
    },
  }
};