import SpinnerOverlay from "../spinner-overlay";

type Props = {
  r_3_1: string; // 강점 제목
  r_3_2: string; // 강점 설명
  r_3_3: string; // 약점 제목
  r_3_4: string; // 약점 설명
  r_3_5: string; // 기회 제목
  r_3_6: string; // 기회 설명
  r_3_7: string; // 위협 제목
  r_3_8: string; // 위협 설명
  isCurrentWorkingPage?: boolean; // AI 작업 중 여부
};

function SwotPage_03({
  r_3_1,
  r_3_2,
  r_3_3,
  r_3_4,
  r_3_5,
  r_3_6,
  r_3_7,
  r_3_8,
  isCurrentWorkingPage = false,
}: Props) {
  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <p>
        본 분석은 SWOT 프레임워크를 활용하여 자사 제품의 강점(Strengths),
        약점(Weaknesses), 기회(Opportunities), 위협(Threats)을 체계적으로
        파악하고, 이를 바탕으로 실행 가능한 개선 방안을 도출하는 것을 목표로
        합니다. 특히 고객 경험 향상과 시장 경쟁력 강화를 위한 실질적인 솔루션
        제시에 중점을 두었습니다.
      </p>

      <div className="swot-grid">
        {/* Strength */}
        <div className="swot-box strength">
          <h2>
            <b>S</b> 강점
          </h2>
          <ul>
            <li>조직이 잘 하는 것은?</li>
            <li>조직의 특별한 점은?</li>
          </ul>
          <div className="swot-example">
            <strong>{r_3_1}:</strong>
            <br />
            {r_3_2}
          </div>
        </div>

        {/* Weakness */}
        <div className="swot-box weakness">
          <h2>
            <b>W</b> 약점
          </h2>
          <ul>
            <li>개선할 점은?</li>
            <li>성과를 개선할 수 있는 리소스는?</li>
          </ul>
          <div className="swot-example">
            <strong>{r_3_3}:</strong>
            <br />
            {r_3_4}
          </div>
        </div>

        {/* Opportunity */}
        <div className="swot-box opportunity">
          <h2>
            <b>O</b> 기회
          </h2>
          <ul>
            <li>우리 서비스에 시장 격차가 있는가?</li>
            <li>올해 우리의 목표는?</li>
          </ul>
          <div className="swot-example">
            <strong>{r_3_5}:</strong>
            <br />
            {r_3_6}
          </div>
        </div>

        {/* Threat */}
        <div className="swot-box threat">
          <h2>
            <b>T</b> 위협
          </h2>
          <ul>
            <li>업계 변화가 있는가?</li>
            <li>떠오르는 새로운 시장 트렌드는?</li>
          </ul>
          <div className="swot-example">
            <strong>{r_3_7}:</strong>
            <br />
            {r_3_8}
          </div>
        </div>
      </div>

      <div className="page-footer">
        <span className="page-number">3</span>
      </div>
    </section>
  );
}

export default SwotPage_03;
