import SpinnerOverlay from "../spinner-overlay";

type Props = {
  r_1_1: string[]; // 목차 항목 리스트
  isCurrentWorkingPage?: boolean; // AI 작업 중 여부
};

function ContentsPage_01({ r_1_1, isCurrentWorkingPage = false }: Props) {
  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ fontSize: "28pt", marginTop: "150px" }}>CONTENTS</h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100% - 300px)",
        }}
      >
        <ol style={{ fontSize: "14pt", lineHeight: 2, textAlign: "left" }}>
          {r_1_1.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>

      <div className="page-footer">
        <span className="page-number">- 1 -</span>
      </div>
    </section>
  );
}

export default ContentsPage_01;
