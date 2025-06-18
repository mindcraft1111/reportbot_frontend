import SpinnerOverlay from "../spinner-overlay";

type Props = {
  short_term_solutions: { solution: string }[];
  mid_term_solutions: { solution: string }[];
  long_term_solutions: { solution: string }[];

  detail_1_title: string;
  detail_1_subtitle: string;
  detail_1_solutions: { solution: string }[];

  detail_2_title: string;
  detail_2_subtitle: string;
  detail_2_solutions: { solution: string }[];

  detail_3_title: string;
  detail_3_subtitle: string;
  detail_3_solutions: { solution: string }[];

  solution_summary: string;
  isCurrentWorkingPage?: boolean;
};

function SolutionPage_09({
  short_term_solutions,
  mid_term_solutions,
  long_term_solutions,
  detail_1_title,
  detail_1_subtitle,
  detail_1_solutions,
  detail_2_title,
  detail_2_subtitle,
  detail_2_solutions,
  detail_3_title,
  detail_3_subtitle,
  detail_3_solutions,
  solution_summary,
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
            {short_term_solutions.map((item, idx) => (
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
            {mid_term_solutions.map((item, idx) => (
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
            {long_term_solutions.map((item, idx) => (
              <li key={idx}>{item.solution}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2>핵심 솔루션 상세</h2>
      <div className="solution-grid compact">
        <div className="solution-card">
          <h3>{detail_1_title}</h3>
          <p className="subtitle">{detail_1_subtitle}:</p>
          <ul>
            {detail_1_solutions.map((item, idx) => (
              <li key={idx}>{item.solution}</li>
            ))}
          </ul>
        </div>

        <div className="solution-card">
          <h3>{detail_2_title}</h3>
          <p className="subtitle">{detail_2_subtitle}:</p>
          <ul>
            {detail_2_solutions.map((item, idx) => (
              <li key={idx}>{item.solution}</li>
            ))}
          </ul>
        </div>

        <div className="solution-card">
          <h3>{detail_3_title}</h3>
          <p className="subtitle">{detail_3_subtitle}:</p>
          <ul>
            {detail_3_solutions.map((item, idx) => (
              <li key={idx}>{item.solution}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="solution-description">{solution_summary}</p>

      <div className="page-footer">
        <span className="page-number">- 9 -</span>
      </div>
    </section>
  );
}

export default SolutionPage_09;
