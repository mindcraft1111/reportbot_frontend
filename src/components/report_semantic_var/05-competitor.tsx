import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { ChartData, ChartOptions } from "chart.js";
import SpinnerOverlay from "../spinner-overlay";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

type Props = {
  competitor_name: string;
  sentiment_positive_scores: number[];
  sentiment_negative_scores: number[];
  competitor_strength_1: string;
  competitor_strength_2: string;
  competitor_strength_3: string;
  competitor_summary: string;
  isCurrentWorkingPage?: boolean;
};

function CompetitorPage_05({
  competitor_name,
  sentiment_positive_scores,
  sentiment_negative_scores,
  competitor_strength_1,
  competitor_strength_2,
  competitor_strength_3,
  competitor_summary,
  isCurrentWorkingPage = false,
}: Props) {
  const barData: ChartData<"bar", number[], string> = {
    labels: ["자사", competitor_name],
    datasets: [
      {
        label: "긍정적(4~5점)",
        data: sentiment_positive_scores,
        backgroundColor: "#d94e0f",
      },
      {
        label: "부정적(1~2점)",
        data: sentiment_negative_scores,
        backgroundColor: "#039be5",
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 90,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12 },
        },
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value) => value,
        font: {
          weight: "bold",
          size: 11,
        },
      },
    },
  };

  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h1>경쟁사 제품 리뷰 감정 분석 결과</h1>
      <p>
        주요 경쟁사 브랜드({competitor_name})의 제품에 대한 고객 리뷰를 동일한
        방법론으로 분석하여 경쟁 환경을 파악했습니다. 이를 통해 경쟁사 제품의
        강점과 약점을 객관적으로 평가하고, 자사 제품과의 상대적 위치를 확인할 수
        있습니다.
      </p>

      <h2>자사와 경쟁사 감정 점수 분포 비교</h2>
      <div style={{ marginBottom: "24px" }}>
        <Bar data={barData} options={barOptions} width={500} height={300} />
      </div>

      <h2>경쟁사 주요 강점</h2>
      <div className="competitor-box">
        <div className="competitor-name">{competitor_name}</div>
        <ul className="competitor-strengths">
          <li>{competitor_strength_1}</li>
          <li>{competitor_strength_2}</li>
          <li>{competitor_strength_3}</li>
        </ul>
      </div>

      <p className="competitor-commentary">{competitor_summary}</p>

      <div className="page-footer">
        <span className="page-number">5</span>
      </div>
    </section>
  );
}

export default CompetitorPage_05;
