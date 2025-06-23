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
  r_5_2: string;
  r_5_2_1: number[]; // 긍정적 데이터 배열
  r_5_2_2: number[]; // 부정적 데이터 배열
  r_5_3: string;
  r_5_4: string;
  r_5_5: string;
  r_5_6: string;
  isCurrentWorkingPage?: boolean; // 추가된 prop
};

function CompetitorPage_05({
  r_5_2,
  r_5_2_1,
  r_5_2_2,
  r_5_3,
  r_5_4,
  r_5_5,
  r_5_6,
  isCurrentWorkingPage = false,
}: Props) {
  const barData: ChartData<"bar", number[], string> = {
    labels: ["자사", r_5_2],
    datasets: [
      {
        label: "긍정적(4~5점)",
        data: r_5_2_1,
        backgroundColor: "#d94e0f",
      },
      {
        label: "부정적(1~2점)",
        data: r_5_2_2,
        backgroundColor: "#039be5",
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
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

      <h1 className="content-h1">경쟁사 제품 리뷰 감정 분석 결과</h1>
      <p>
        주요 경쟁사 브랜드({r_5_2})의 제품에 대한 고객 리뷰를 동일한 방법론으로
        분석하여 경쟁 환경을 파악했습니다. 이를 통해 경쟁사 제품의 강점과 약점을
        객관적으로 평가하고, 자사 제품과의 상대적 위치를 확인할 수 있습니다.
      </p>

      <h2>자사와 경쟁사 감정 점수 분포 비교</h2>
      <div style={{ margin: "24px 0 24px 0" }}>
        <Bar data={barData} options={barOptions} width={500} height={300} />
      </div>

      <div
        style={{
          backgroundColor: "#fff9f6",
          padding: "20px 20px",
          borderRadius: "10px",
          marginTop: "20px"
        }}
      >
        <h4
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "12px",
            color: "#333",
          }}
        >
          🚩 {r_5_2} 핵심 키워드
        </h4>
        <ul
          className="competitor-ul"
          style={{
            gridTemplateColumns: "1fr 1fr",
            rowGap: "8px",
            columnGap: "20px",
            listStyleType: "none",
            paddingLeft: 0,
            marginBottom: "12px",
          }}
        >
          <li>✔ {r_5_3}</li>
          <li>✔ {r_5_4}</li>
          <li>✔ {r_5_5}</li>
        </ul>
  <p style={{ fontSize: "17px", color: "#555", padding: "10px 0 0 0" }}>
    {r_5_6}
  </p>
</div>
      <div className="page-footer">
        <span className="page-number">- 5 -</span>
      </div>
    </section>
  );
}

export default CompetitorPage_05;
