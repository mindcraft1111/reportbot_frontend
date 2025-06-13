type Props = {
  r_13_1_1_1: string;
  r_13_1_1_2: string;
  r_13_1_2_1: string;
  r_13_1_2_2: string;
  r_13_1_3_1: string;
  r_13_1_3_2: string;
  r_13_1_4_1: string;
  r_13_1_4_2: string;
};

function ExecutiveSummaryPage_13({
  r_13_1_1_1,
  r_13_1_1_2,
  r_13_1_2_1,
  r_13_1_2_2,
  r_13_1_3_1,
  r_13_1_3_2,
  r_13_1_4_1,
  r_13_1_4_2,
}: Props) {
  return (
    <section className="page-container">
      <h2>경영진을 위한 핵심 제언</h2>
      <div className="recommendation-grid">
        <div className="rec-card">
          <div className="rec-number">1</div>
          <h4>{r_13_1_1_1}</h4>
          <p>{r_13_1_1_2}</p>
        </div>
        <div className="rec-card">
          <div className="rec-number">2</div>
          <h4>{r_13_1_2_1}</h4>
          <p>{r_13_1_2_2}</p>
        </div>
        <div className="rec-card">
          <div className="rec-number">3</div>
          <h4>{r_13_1_3_1}</h4>
          <p>{r_13_1_3_2}</p>
        </div>
        <div className="rec-card">
          <div className="rec-number">4</div>
          <h4>{r_13_1_4_1}</h4>
          <p>{r_13_1_4_2}</p>
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
