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
import type { ChartOptions } from "chart.js";
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
  current_scores: number[]; // 자사 현재 데이터
  competitor_scores: number[]; // 경쟁사 평균 데이터
  target_scores: number[]; // 목표치 데이터
  current_insight: string; // 현재 상황 인식
  strategic_direction: string; // 전략적 방향성
  future_outlook: string; // 미래 전망 및 제언
  isCurrentWorkingPage?: boolean;
};

function ConclusionPage_12({
  current_scores,
  competitor_scores,
  target_scores,
  current_insight,
  strategic_direction,
  future_outlook,
  isCurrentWorkingPage = false,
}: Props) {
  const barData = {
    labels: ["전체 감정 점수", "NPS", "재구매 의향"],
    datasets: [
      {
        label: "자사 현재",
        data: current_scores,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "경쟁사 평균",
        data: competitor_scores,
        backgroundColor: "rgba(255, 159, 64, 0.7)",
      },
      {
        label: "목표치",
        data: target_scores,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 12 } },
      },
      datalabels: {
        anchor: "end",
        align: "top",
        font: {
          weight: "bold",
          size: 10,
        },
        formatter: (value) => value,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h1>결론 및 전략적 제언</h1>
      <p>
        본 리포트에서는 자사와 경쟁사 제품의 고객 리뷰를 감정 분석하여 시장 내
        위치를 파악하고, 제품 개선을 위한 솔루션을 도출했습니다. 종합적인 분석
        결과를 바탕으로 다음과 같은 결론과 제언을 제시합니다.
      </p>

      <h2>감정 분석 결과 종합</h2>
      <div style={{ marginBottom: "24px" }}>
        <Bar data={barData} options={barOptions} width={600} height={300} />
      </div>

      <div className="recommendation-columns">
        <div className="rec-box">
          <h3>현재 상황 인식</h3>
          <p>{current_insight}</p>
        </div>
        <div className="rec-box">
          <h3>전략적 방향성</h3>
          <p>{strategic_direction}</p>
        </div>
        <div className="rec-box">
          <h3>미래 전망 및 제언</h3>
          <p>{future_outlook}</p>
        </div>
      </div>

      <div className="page-footer">
        <span className="page-number">- 12 -</span>
      </div>
    </section>
  );
}

export default ConclusionPage_12;
