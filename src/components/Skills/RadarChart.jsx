import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarChart({ labels, values }) {
  const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink") || "#f2f5f8";
  const data = {
    labels,
    datasets: [
      {
        label: "Proficiency",
        data: values,
        backgroundColor: "rgba(61, 214, 198, 0.22)",
        borderColor: "#3dd6c6",
        pointBackgroundColor: "#e8c27a",
        pointBorderColor: "#070b10",
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    scales: {
      r: {
        suggestedMin: 40,
        suggestedMax: 100,
        ticks: { display: false, backdropColor: "transparent" },
        grid: { color: "rgba(147, 164, 184, 0.18)" },
        angleLines: { color: "rgba(147, 164, 184, 0.18)" },
        pointLabels: { color: ink.trim() || "#f2f5f8", font: { size: 11, family: "Instrument Sans, sans-serif" } },
      },
    },
  };
  return <Radar data={data} options={options} />;
}
