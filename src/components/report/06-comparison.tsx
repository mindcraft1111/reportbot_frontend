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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

type Props = {
  r_6_1_1: string[]; // Labels for chart categories
  r_6_1_2: number[]; // Data for '자사'
  r_6_1_3: number[]; // Data for competitor
  r_6_2: string; // 강점 영역
  r_6_3: string; // 개선 필요 영역
  r_6_4: string; // 기회 영역
  r_6_5: string; // 경쟁사 명 (A사)
  r_6_6: string; // 자사 NPS
  r_6_7: string; // 경쟁사 NPS
  r_6_8: string; // 자사 재구매 의향
  r_6_9: string; // 경쟁사 재구매 의향
  r_6_10: string; // 자사 브랜드 충성도
  r_6_11: string; // 경쟁사 브랜드 충성도
  r_6_12: string; // 분석 요약 텍스트
};

function ComparisonPage_06({
  r_6_1_1,
  r_6_1_2,
  r_6_1_3,
  r_6_2,
  r_6_3,
  r_6_4,
  r_6_5,
  r_6_6,
  r_6_7,
  r_6_8,
  r_6_9,
  r_6_10,
  r_6_11,
  r_6_12,
}: Props) {
  const barData: ChartData<"bar", number[], string> = {
    labels: r_6_1_1,
    datasets: [
      {
        label: "자사",
        data: r_6_1_2,
        backgroundColor: "#d94e0f",
      },
      {
        label: r_6_5,
        data: r_6_1_3,
        backgroundColor: "#039be5",
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: false,
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1 },
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
        align: "right",
        formatter: (value) => value.toFixed(1),
        font: {
          weight: "bold",
          size: 10,
        },
        color: "#000",
      },
    },
  };

  return (
    <section className="page-container">
      <h1>자사와 경쟁사 비교 분석</h1>
      <p>
        자사와 경쟁사 제품의 감정 분석 결과를 직접 비교하여 시장 내 경쟁력을
        종합적으로 평가했습니다. 이를 통해 자사 제품의 상대적 강점과 약점을
        명확히 파악하고, 경쟁 우위를 확보하기 위한 전략적 방향성을 도출했습니다.
      </p>

      <h2>카테고리별 감정 점수 비교</h2>
      <div style={{ marginBottom: "24px" }}>
        <Bar data={barData} options={barOptions} width={580} height={280} />
      </div>

      <h2>GAP 분석</h2>
      <div className="gap-box-group">
        <div className="gap-box">
          <h3>강점 영역</h3>
          <p>{r_6_2}</p>
        </div>
        <div className="gap-box">
          <h3>개선 필요 영역</h3>
          <p>{r_6_3}</p>
        </div>
        <div className="gap-box">
          <h3>기회 영역</h3>
          <p>{r_6_4}</p>
        </div>
      </div>

      <h2>고객 충성도 및 추천 의향 비교</h2>
      <table className="gap-table">
        <thead>
          <tr>
            <th>지표</th>
            <th>자사</th>
            <th>{r_6_5}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NPS(순추천지수)</td>
            <td>{r_6_6}</td>
            <td>{r_6_7}</td>
          </tr>
          <tr>
            <td>재구매 의향(%)</td>
            <td>{r_6_8}</td>
            <td>{r_6_9}</td>
          </tr>
          <tr>
            <td>브랜드 충성도(5점 만점)</td>
            <td>{r_6_10}</td>
            <td>{r_6_11}</td>
          </tr>
        </tbody>
      </table>

      <p className="gap-summary">{r_6_12}</p>

      <div className="page-footer">
        <span className="page-number">- 6 -</span>
      </div>
    </section>
  );
}

export default ComparisonPage_06;
