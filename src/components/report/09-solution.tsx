import SpinnerOverlay from "../spinner-overlay";

type Props = {
  r_9_3_1: { solution: string }[];
  r_9_3_2: { solution: string }[];
  r_9_3_3: { solution: string }[];
  r_9_5_1: string;
  r_9_5_2: string;
  r_9_5_3: { solution: string }[];
  r_9_5_4: string;
  r_9_5_5: string;
  r_9_5_6: { solution: string }[];
  r_9_5_7: string;
  r_9_5_8: string;
  r_9_5_9: { solution: string }[];
  r_9_6: string;
  isCurrentWorkingPage?: boolean; // 추가된 prop
};

function SolutionPage_09({
  r_9_3_1,
  r_9_3_2,
  r_9_3_3,
  r_9_5_1,
  r_9_5_2,
  r_9_5_3,
  r_9_5_4,
  r_9_5_5,
  r_9_5_6,
  r_9_5_7,
  r_9_5_8,
  r_9_5_9,
  r_9_6,
  isCurrentWorkingPage = false,
}: Props) {
  return (
    <section className="relative page-container small-layout">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h1>솔루션 제안</h1>
      <p>
        앞서 도출된 개선 영역을 바탕으로, 자사 제품의 경쟁력 강화와 고객 만족도
        향상을 위한 구체적인 솔루션을 제안합니다. 각 솔루션은 실행 가능성과 예상
        효과를 고려하여 단기, 중기, 장기로 구분하였습니다.
      </p>

      <div className="solution-timeline">
        <div className="solution-block">
          <div className="timeline-left">
            <h3>
              단기 솔루션
              <br />
              <span>(3개월 이내)</span>
            </h3>
            <div className="line-number">1</div>
          </div>
          <ul className="solution-content">
            {r_9_3_1.map((item, idx) => (
              <li key={idx}>{item.solution}</li>
            ))}
          </ul>
        </div>

        <div className="solution-block">
          <div className="timeline-left">
            <h3>
              중기 솔루션
              <br />
              <span>(6~12개월)</span>
            </h3>
            <div className="line-number">2</div>
          </div>
          <ul className="solution-content">
            {r_9_3_2.map((item, idx) => (
              <li key={idx}>{item.solution}</li>
            ))}
          </ul>
        </div>

        <div className="solution-block">
          <div className="timeline-left">
            <h3>
              장기 솔루션
              <br />
              <span>(12~24개월)</span>
            </h3>
            <div className="line-number">3</div>
          </div>
          <ul className="solution-content">
            {r_9_3_3.map((item, idx) => (
              <li key={idx}>{item.solution}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2>핵심 솔루션 상세</h2>
      <div className="solution-grid compact">
        <div className="solution-card">
          <h3>{r_9_5_1}</h3>
          <p className="subtitle">{r_9_5_2}:</p>
          <ul>
            {r_9_5_3.map((item, idx) => (
              <li key={idx}>{item.solution}</li>
            ))}
          </ul>
        </div>

        <div className="solution-card">
          <h3>{r_9_5_4}</h3>
          <p className="subtitle">{r_9_5_5}:</p>
          <ul>
            {r_9_5_6.map((item, idx) => (
              <li key={idx}>{item.solution}</li>
            ))}
          </ul>
        </div>

        <div className="solution-card">
          <h3>{r_9_5_7}</h3>
          <p className="subtitle">{r_9_5_8}:</p>
          <ul>
            {r_9_5_9.map((item, idx) => (
              <li key={idx}>{item.solution}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="solution-description">{r_9_6}</p>

      <div className="page-footer">
        <span className="page-number">- 9 -</span>
      </div>
    </section>
  );
}

export default SolutionPage_09;
