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
  evaluation_categories: string[];
  self_scores_by_category: number[];
  competitor_scores_by_category: number[];
  gap_strength_area: string;
  gap_improvement_area: string;
  gap_opportunity_area: string;
  masked_competitor_name: string;
  self_nps: string;
  competitor_nps: string;
  self_repurchase_intent: string;
  competitor_repurchase_intent: string;
  self_brand_loyalty: string;
  competitor_brand_loyalty: string;
  comparison_summary: string;
  isCurrentWorkingPage?: boolean;
};

function ComparisonPage_06({
  evaluation_categories,
  self_scores_by_category,
  competitor_scores_by_category,
  gap_strength_area,
  gap_improvement_area,
  gap_opportunity_area,
  masked_competitor_name,
  self_nps,
  competitor_nps,
  self_repurchase_intent,
  competitor_repurchase_intent,
  self_brand_loyalty,
  competitor_brand_loyalty,
  comparison_summary,
  isCurrentWorkingPage = false,
}: Props) {
  const barData: ChartData<"bar", number[], string> = {
    labels: evaluation_categories,
    datasets: [
      {
        label: "자사",
        data: self_scores_by_category,
        backgroundColor: "#d94e0f",
      },
      {
        label: masked_competitor_name,
        data: competitor_scores_by_category,
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
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

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
          <p>{gap_strength_area}</p>
        </div>
        <div className="gap-box">
          <h3>개선 필요 영역</h3>
          <p>{gap_improvement_area}</p>
        </div>
        <div className="gap-box">
          <h3>기회 영역</h3>
          <p>{gap_opportunity_area}</p>
        </div>
      </div>

      <h2>고객 충성도 및 추천 의향 비교</h2>
      <table className="gap-table">
        <thead>
          <tr>
            <th>지표</th>
            <th>자사</th>
            <th>{masked_competitor_name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NPS(순추천지수)</td>
            <td>{self_nps}</td>
            <td>{competitor_nps}</td>
          </tr>
          <tr>
            <td>재구매 의향(%)</td>
            <td>{self_repurchase_intent}</td>
            <td>{competitor_repurchase_intent}</td>
          </tr>
          <tr>
            <td>브랜드 충성도(5점 만점)</td>
            <td>{self_brand_loyalty}</td>
            <td>{competitor_brand_loyalty}</td>
          </tr>
        </tbody>
      </table>

      <p className="gap-summary">{comparison_summary}</p>

      <div className="page-footer">
        <span className="page-number">6</span>
      </div>
    </section>
  );
}

export default ComparisonPage_06;
