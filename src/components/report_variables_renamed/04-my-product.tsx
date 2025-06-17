import SpinnerOverlay from "../spinner-overlay";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type Props = {
  positive_ratio: number;
  negative_ratio: number;

  positive_icon_1: string;
  positive_title_1: string;
  positive_summary_1: string;

  positive_icon_2: string;
  positive_title_2: string;
  positive_summary_2: string;

  positive_icon_3: string;
  positive_title_3: string;
  positive_summary_3: string;

  negative_icon_1: string;
  negative_title_1: string;
  negative_summary_1: string;

  negative_icon_2: string;
  negative_title_2: string;
  negative_summary_2: string;

  negative_icon_3: string;
  negative_title_3: string;
  negative_summary_3: string;

  overall_summary: string;
  isCurrentWorkingPage?: boolean;
};

function SelfProductPage_04({
  positive_ratio,
  negative_ratio,
  positive_icon_1,
  positive_title_1,
  positive_summary_1,
  positive_icon_2,
  positive_title_2,
  positive_summary_2,
  positive_icon_3,
  positive_title_3,
  positive_summary_3,
  negative_icon_1,
  negative_title_1,
  negative_summary_1,
  negative_icon_2,
  negative_title_2,
  negative_summary_2,
  negative_icon_3,
  negative_title_3,
  negative_summary_3,
  overall_summary,
  isCurrentWorkingPage = false,
}: Props) {
  const chartData = {
    labels: ["긍정적 (4~5점)", "부정적 (1~2점)"],
    datasets: [
      {
        data: [positive_ratio, negative_ratio],
        backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)"],
      },
    ],
  };

  const chartOptions: ChartOptions<"pie"> = {
    responsive: false,
    plugins: {
      datalabels: {
        color: "#000",
        formatter: (value) => `${value}%`,
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  };

  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h1>자사 제품 리뷰 감정 분석 결과</h1>
      <p>
        자사 제품에 대한 고객 리뷰를 심층 분석한 결과, 전반적인 감정 지수와 주요
        피드백 패턴을 확인할 수 있었습니다. 본 섹션에서는 분석 방법론과 주요
        발견 사항을 상세히 설명합니다.
      </p>

      <h2>분석 방법론</h2>
      <p>
        감정 점수는 3점을 제외하고 1-5점 척도로 산출되었으며, 1-2점은 부정적
        감정, 4-5점은 긍정적 감정으로 분류했습니다. 추가적으로 텍스트 마이닝을
        통해 주요 키워드와 토픽을 추출하여 고객 의견의 세부 내용을 파악했습니다.
      </p>

      <div style={{ margin: "24px 0" }}>
        <Pie data={chartData} options={chartOptions} width={500} height={300} />
      </div>

      <h2 style={{ fontSize: "12pt" }}>주요 긍정적 피드백</h2>
      <div className="compact-feedback-grid">
        <div className="cf-item">
          <span className="cf-icon">{positive_icon_1}</span>
          <div>
            <strong>{positive_title_1}</strong>
            <br />
            <span className="cf-desc">{positive_summary_1}</span>
          </div>
        </div>
        <div className="cf-item">
          <span className="cf-icon">{positive_icon_2}</span>
          <div>
            <strong>{positive_title_2}</strong>
            <br />
            <span className="cf-desc">{positive_summary_2}</span>
          </div>
        </div>
        <div className="cf-item">
          <span className="cf-icon">{positive_icon_3}</span>
          <div>
            <strong>{positive_title_3}</strong>
            <br />
            <span className="cf-desc">{positive_summary_3}</span>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: "12pt", marginTop: "16pt" }}>
        주요 부정적 피드백
      </h2>
      <div className="compact-feedback-grid">
        <div className="cf-item">
          <span className="cf-icon">{negative_icon_1}</span>
          <div>
            <strong>{negative_title_1}</strong>
            <br />
            <span className="cf-desc">{negative_summary_1}</span>
          </div>
        </div>
        <div className="cf-item">
          <span className="cf-icon">{negative_icon_2}</span>
          <div>
            <strong>{negative_title_2}</strong>
            <br />
            <span className="cf-desc">{negative_summary_2}</span>
          </div>
        </div>
        <div className="cf-item">
          <span className="cf-icon">{negative_icon_3}</span>
          <div>
            <strong>{negative_title_3}</strong>
            <br />
            <span className="cf-desc">{negative_summary_3}</span>
          </div>
        </div>
      </div>

      <p>{overall_summary}</p>

      <div className="page-footer">
        <span className="page-number">- 4 -</span>
      </div>
    </section>
  );
}

export default SelfProductPage_04;
