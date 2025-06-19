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

      <h1>자사와 경쟁사 주요 키워드 출현 빈도 비교</h1>
      <p>
        주요 경쟁사 브랜드({r_5_2})와 자사 제품에 대한 고객 리뷰 데이터를 분석하여, 리뷰에서 자주 언급된 핵심 키워드를 기준으로 고객 반응을 비교했습니다. 이를 통해 고객이 인식하는 주요 장점 및 개선 요소를 파악하고, 
        경쟁사 대비 자사 제품의 포지셔닝을 확인할 수 있습니다.


      </p>

      <h2>자사와 경쟁사 감정 점수 분포 비교</h2>
      <div style={{ marginBottom: "24px" }}>
        <Bar data={barData} options={barOptions} width={500} height={300} />
      </div>

      <h2>경쟁사 핵심 키워드</h2>
      <div className="competitor-box">
        <div className="competitor-name">{r_5_2}</div>
        <ul className="competitor-strengths">
          <li>{r_5_3}</li>
          <li>{r_5_4}</li>
          <li>{r_5_5}</li>
        </ul>
      </div>

      <p className="competitor-commentary">{r_5_6}</p>

      <div className="page-footer">
        <span className="page-number">- 5 -</span>
      </div>
    </section>
  );
}

export default CompetitorPage_05;
