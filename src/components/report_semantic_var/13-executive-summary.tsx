import SpinnerOverlay from "../spinner-overlay";

type Props = {
  recommendation_title_1: string;
  recommendation_detail_1: string;
  recommendation_title_2: string;
  recommendation_detail_2: string;
  recommendation_title_3: string;
  recommendation_detail_3: string;
  recommendation_title_4: string;
  recommendation_detail_4: string;
  isCurrentWorkingPage?: boolean; // 추가된 prop
};

function ExecutiveSummaryPage_13({
  recommendation_title_1,
  recommendation_detail_1,
  recommendation_title_2,
  recommendation_detail_2,
  recommendation_title_3,
  recommendation_detail_3,
  recommendation_title_4,
  recommendation_detail_4,
  isCurrentWorkingPage = false,
}: Props) {
  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h2>경영진을 위한 핵심 제언</h2>
      <div className="recommendation-grid">
        <div className="rec-card">
          <div className="rec-number">1</div>
          <h4>{recommendation_title_1}</h4>
          <p>{recommendation_detail_1}</p>
        </div>
        <div className="rec-card">
          <div className="rec-number">2</div>
          <h4>{recommendation_title_2}</h4>
          <p>{recommendation_detail_2}</p>
        </div>
        <div className="rec-card">
          <div className="rec-number">3</div>
          <h4>{recommendation_title_3}</h4>
          <p>{recommendation_detail_3}</p>
        </div>
        <div className="rec-card">
          <div className="rec-number">4</div>
          <h4>{recommendation_title_4}</h4>
          <p>{recommendation_detail_4}</p>
        </div>
      </div>

      <p className="recommendation-summary">
        본 리포트에서 제시된 분석과 제안은 현재 시점의 데이터를 바탕으로 한
        것으로, 시장 환경과 고객 니즈의 변화에 따라 지속적으로 업데이트되어야
        합니다. 고객 중심 비즈니스로의 전환은 단기적인 프로젝트가 아닌 조직
        문화의 근본적 변화를 요구하는 장기적 여정임을 인식하고, 전사적 차원의
        지속적인 노력이 필요합니다.
      </p>

      <div className="page-footer">
        <span className="page-number">- 13 -</span>
      </div>
    </section>
  );
}

export default ExecutiveSummaryPage_13;
