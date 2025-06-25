import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { ChartOptions } from "chart.js";
import SpinnerOverlay from "../spinner-overlay";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type Props = {
  r_4_1_1: number;
  r_4_1_2: number;
  r_4_2: string;
  r_4_3: string;
  r_4_4: string;
  r_4_5: string;
  r_4_6: string;
  r_4_7: string;
  r_4_8: string;
  r_4_9: string;
  r_4_10: string;
  r_4_11: string;
  r_4_12: string;
  r_4_13: string;
  r_4_14: string;
  r_4_15: string;
  r_4_16: string;
  r_4_17: string;
  r_4_18: string;
  r_4_19: string;
  r_4_20: string;
  isCurrentWorkingPage?: boolean; // 추가된 prop
};

function SelfProductPage_04({
  r_4_1_1,
  r_4_1_2,
  r_4_2,
  r_4_3,
  r_4_4,
  r_4_5,
  r_4_6,
  r_4_7,
  r_4_8,
  r_4_9,
  r_4_10,
  r_4_11,
  r_4_12,
  r_4_13,
  r_4_14,
  r_4_15,
  r_4_16,
  r_4_17,
  r_4_18,
  r_4_19,
  r_4_20,
  isCurrentWorkingPage = false,
}: Props) {
  const chartData = {
    labels: ["긍정적 (4~5점)", "부정적 (1~2점)"],
    datasets: [
      {
        data: [r_4_1_1, r_4_1_2],
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
    <section className="relative page-container ">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h1 className="content-h1">자사 제품 리뷰 감정 분석 결과</h1>
      <p>
        자사 제품에 대한 고객 리뷰를 심층 분석한 결과, 전반적인 감정 지수와 주요
        피드백 패턴을 확인할 수 있었습니다. 본 섹션에서는 분석 방법론과 주요
        발견 사항을 상세히 설명합니다.
      </p>

      <h2><b>분석 방법론</b></h2>
      <p>
        감정 점수는 3점을 제외하고 1-5점 척도로 산출되었으며, 1-2점은 부정적
        감정, 4-5점은 긍정적 감정으로 분류했습니다. 추가적으로 텍스트 마이닝을
        통해 주요 키워드와 토픽을 추출하여 고객 의견의 세부 내용을 파악했습니다.
      </p>

      <div style={{ margin: "24px 0" }}>
        <Pie data={chartData} options={chartOptions} width={500} height={300} />
      </div>

      <h2 style={{ fontSize: "12pt", background: "#fdf3ef" }}>주요 긍정적 피드백</h2>
      <div className="compact-feedback-grid">
        <div className="cf-item">
          <span className="cf-icon">{r_4_2}</span>
          <div>
            <strong>{r_4_3}</strong>
            <br />
            <span className="cf-desc">{r_4_4}</span>
          </div>
        </div>
        <div className="cf-item">
          <span className="cf-icon">{r_4_5}</span>
          <div>
            <strong>{r_4_6}</strong>
            <br />
            <span className="cf-desc">{r_4_7}</span>
          </div>
        </div>
        <div className="cf-item">
          <span className="cf-icon">{r_4_8}</span>
          <div>
            <strong>{r_4_9}</strong>
            <br />
            <span className="cf-desc">{r_4_10}</span>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: "12pt", marginTop: "16pt", background: "#fdf3ef" }}>
        주요 부정적 피드백
      </h2>
      <div className="compact-feedback-grid">
        <div className="cf-item">
          <span className="cf-icon">{r_4_11}</span>
          <div>
            <strong>{r_4_12}</strong>
            <br />
            <span className="cf-desc">{r_4_13}</span>
          </div>
        </div>
        <div className="cf-item">
          <span className="cf-icon">{r_4_14}</span>
          <div>
            <strong>{r_4_15}</strong>
            <br />
            <span className="cf-desc">{r_4_16}</span>
          </div>
        </div>
        <div className="cf-item">
          <span className="cf-icon">{r_4_17}</span>
          <div>
            <strong>{r_4_18}</strong>
            <br />
            <span className="cf-desc">{r_4_19}</span>
          </div>
        </div>
      </div>

      <p>{r_4_20}</p>

      <div className="page-footer">
        <span className="page-number">4</span>
      </div>
    </section>
  );
}

export default SelfProductPage_04;
