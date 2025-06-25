import SpinnerOverlay from "../spinner-overlay";

type Props = {
  r_2_1: string; // 리포트 개요 설명
  r_2_2: string; // 분석 대상 및 방법론에 대한 설명
  isCurrentWorkingPage?: boolean; // AI 작업 중 여부
};

function OverviewPage_02({
  r_2_1,
  r_2_2,
  isCurrentWorkingPage = false,
}: Props) {
  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h1 className="content-h1">개요</h1>
      <p className="break-all">{r_2_1}</p>

      <h1 className="content-h1">분석 대상 및 방법론</h1>
      <p className="break-all">{r_2_2}</p>

      <div
        className="circle-diagram"
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          margin: "120px auto",
        }}
      >
        <div className="circle-outline">
          <div
            className="circle-number n1"
            style={{ position: "absolute", top: "30px", left: "45px" }}
          >
            1
          </div>
          <div
            className="circle-number n2"
            style={{ position: "absolute", top: "30px", right: "45px" }}
          >
            2
          </div>
          <div
            className="circle-number n3"
            style={{ position: "absolute", bottom: "30px", right: "45px" }}
          >
            3
          </div>
          <div
            className="circle-number n4"
            style={{ position: "absolute", bottom: "30px", left: "45px" }}
          >
            4
          </div>
        </div>

        <div className="circle-item item-1 text-left">
          <h3><b>분석 목적</b></h3>
          <p>고객 만족도 요인 파악 및 제품 개선점 도출</p>
        </div>
        <div className="circle-item item-2 text-right">
          <h3><b>데이터 범위</b></h3>
          <p>10,000+ 고객 리뷰</p>
        </div>
        <div className="circle-item item-3 text-right">
          <h3><b>분석 대상</b></h3>
          <p>
            자사 제품 및
            <br />
            경쟁사 1개 브랜드
          </p>
        </div>
        <div className="circle-item item-4 text-left">
          <h3><b>활용 방안</b></h3>
          <p>
            전략적 제품 개선 및
            <br />
            마케팅 전략 수립
          </p>
        </div>
      </div>

      <div className="page-footer">
        <span className="page-number">2</span>
      </div>
    </section>
  );
}

export default OverviewPage_02;
