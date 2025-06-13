type Props = {
  r_7_5_1: string; // 이미지 URL (row1)
  r_7_5_2: string; // 제목 (row1)
  r_7_5_3: string; // 설명 (row1)
  r_7_5_4: string; // 이미지 URL (row2)
  r_7_5_6: string; // 제목 (row2)
  r_7_5_7: string; // 설명 (row2)
  r_7_5_8: string; // 이미지 URL (row3)
  r_7_5_9: string; // 제목 (row3)
  r_7_5_10: string; // 설명 (row3)
  r_7_5_11: string; // 이미지 URL (row4)
  r_7_5_12: string; // 제목 (row4)
  r_7_5_13: string; // 설명 (row4)
  r_7_5_14: string; // 이미지 URL (row5)
  r_7_5_15: string; // 제목 (row5)
  r_7_5_16: string; // 설명 (row5)
};

function ImprovementPage_07({
  r_7_5_1,
  r_7_5_2,
  r_7_5_3,
  r_7_5_4,
  r_7_5_6,
  r_7_5_7,
  r_7_5_8,
  r_7_5_9,
  r_7_5_10,
  r_7_5_11,
  r_7_5_12,
  r_7_5_13,
  r_7_5_14,
  r_7_5_15,
  r_7_5_16,
}: Props) {
  return (
    <section className="page-container">
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
            <img src={r_7_5_1} alt="" />
            <div>
              <strong>{r_7_5_2}</strong>
              <br />
              {r_7_5_3}
            </div>
          </div>
        </div>
        <div className="pyramid-row row2">
          <div className="pyramid-content">
            <img src={r_7_5_4} alt="" />
            <div>
              <strong>{r_7_5_6}</strong>
              <br />
              {r_7_5_7}
            </div>
          </div>
        </div>
        <div className="pyramid-row row3">
          <div className="pyramid-content">
            <img src={r_7_5_8} alt="" />
            <div>
              <strong>{r_7_5_9}</strong>
              <br />
              {r_7_5_10}
            </div>
          </div>
        </div>
        <div className="pyramid-row row4">
          <div className="pyramid-content">
            <img src={r_7_5_11} alt="" />
            <div>
              <strong>{r_7_5_12}</strong>
              <br />
              {r_7_5_13}
            </div>
          </div>
        </div>
        <div className="pyramid-row row5">
          <div className="pyramid-content">
            <img src={r_7_5_14} alt="" />
            <div>
              <strong>{r_7_5_15}</strong>
              <br />
              {r_7_5_16}
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
