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
  r_12_1_1: number[]; // 자사 현재 데이터
  r_12_1_2: number[]; // 경쟁사 평균 데이터
  //r_12_1_3: number[]; // 목표치 데이터
  r_12_2_1: string; // 현재 상황 인식
  r_12_2_2: string; // 전략적 방향성
  r_12_2_3: string; // 미래 전망 및 제언
  isCurrentWorkingPage?: boolean; // 추가된 prop
};

function ConclusionPage_12({
  r_12_1_1,
  r_12_1_2,
  //r_12_1_3,
  r_12_2_1,
  r_12_2_2,
  r_12_2_3,
  isCurrentWorkingPage = false,
}: Props) {
  const barData = {
    labels: ["2023년", "2024년", "2025년 예상치"],
    datasets: [
      {
        label: "자사 리뷰",
        data: r_12_1_1,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "경쟁사 리뷰",
        data: r_12_1_2,
        backgroundColor: "rgba(255, 159, 64, 0.7)",
      },
      // {
      //   label: "목표치",
      //   data: r_12_1_3,
      //   backgroundColor: "rgba(75, 192, 192, 0.7)",
      // },
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
        본 리포트에서는 자사와 경쟁사 제품의 고객 리뷰를 분석하여 시장 내
        위치를 파악하고, 제품 개선을 위한 솔루션을 도출했습니다. 종합적인 분석
        결과를 바탕으로 다음과 같은 결론과 제언을 제시합니다.
      </p>

      <h2>리뷰 개수 및 예상치 분석</h2>
      <div style={{ marginBottom: "24px" }}>
        <Bar data={barData} options={barOptions} width={600} height={300} />
      </div>

      <div className="recommendation-columns">
        <div className="rec-box">
          <h3>현재 상황 인식</h3>
          <p>{r_12_2_1}</p>
        </div>
        <div className="rec-box">
          <h3>전략적 방향성</h3>
          <p>{r_12_2_2}</p>
        </div>
        <div className="rec-box">
          <h3>미래 전망 및 <br/>제언</h3>
          <p>{r_12_2_3}</p>
        </div>
      </div>

      <div className="page-footer">
        <span className="page-number">- 12 -</span>
      </div>
    </section>
  );
}

export default ConclusionPage_12;
