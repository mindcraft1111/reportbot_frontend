import SpinnerOverlay from "../spinner-overlay";

type Props = {
  priority_1_icon: string;
  priority_1_title: string;
  priority_1_description: string;

  priority_2_icon: string;
  priority_2_title: string;
  priority_2_description: string;

  priority_3_icon: string;
  priority_3_title: string;
  priority_3_description: string;

  priority_4_icon: string;
  priority_4_title: string;
  priority_4_description: string;

  priority_5_icon: string;
  priority_5_title: string;
  priority_5_description: string;

  isCurrentWorkingPage?: boolean;
};

function ImprovementPage_07({
  priority_1_icon,
  priority_1_title,
  priority_1_description,
  priority_2_icon,
  priority_2_title,
  priority_2_description,
  priority_3_icon,
  priority_3_title,
  priority_3_description,
  priority_4_icon,
  priority_4_title,
  priority_4_description,
  priority_5_icon,
  priority_5_title,
  priority_5_description,
  isCurrentWorkingPage = false,
}: Props) {
  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h1>주요 개선 영역 도출</h1>
      <p>
        감정 분석 결과와 경쟁사 비교를 통해 자사 제품의 주요 개선 영역을
        도출했습니다. 이는 고객 만족도 향상과 시장 경쟁력 강화를 위해 우선적으로
        해결해야 할 과제들입니다.
      </p>

      <h2>우선 개선 영역 도출 기준</h2>
      <ol>
        <li>부정적 감정 비율 - 해당 요소에 대한 부정적 피드백의 비중</li>
        <li>경쟁사 대비 격차 - 경쟁사와의 감정 점수 차이</li>
        <li>고객 중요도 - 고객이 해당 요소에 부여하는 중요성</li>
      </ol>

      <div className="real-pyramid">
        <div className="pyramid-row row1">
          <div className="pyramid-content">
            <img src={priority_1_icon} alt="" />
            <div>
              <strong>{priority_1_title}</strong>
              <br />
              {priority_1_description}
            </div>
          </div>
        </div>
        <div className="pyramid-row row2">
          <div className="pyramid-content">
            <img src={priority_2_icon} alt="" />
            <div>
              <strong>{priority_2_title}</strong>
              <br />
              {priority_2_description}
            </div>
          </div>
        </div>
        <div className="pyramid-row row3">
          <div className="pyramid-content">
            <img src={priority_3_icon} alt="" />
            <div>
              <strong>{priority_3_title}</strong>
              <br />
              {priority_3_description}
            </div>
          </div>
        </div>
        <div className="pyramid-row row4">
          <div className="pyramid-content">
            <img src={priority_4_icon} alt="" />
            <div>
              <strong>{priority_4_title}</strong>
              <br />
              {priority_4_description}
            </div>
          </div>
        </div>
        <div className="pyramid-row row5">
          <div className="pyramid-content">
            <img src={priority_5_icon} alt="" />
            <div>
              <strong>{priority_5_title}</strong>
              <br />
              {priority_5_description}
            </div>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <span className="page-number">- 7 -</span>
      </div>
    </section>
  );
}

export default ImprovementPage_07;
