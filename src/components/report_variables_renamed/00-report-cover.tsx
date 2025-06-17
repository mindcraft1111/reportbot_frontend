import SpinnerOverlay from "../spinner-overlay";

type Props = {
  report_title: string; // 보고서 제목 (대제목)
  report_objective: string; // 부제목 또는 설명
  brand_logo_url: string; // 로고 이미지 URL
  creation_date: string; // 작성일자 (예: "2025-06-13")
  isCurrentWorkingPage?: boolean; // AI 작업 중 여부
};

function CoverPage_00({
  report_title,
  report_objective,
  brand_logo_url,
  creation_date,
  isCurrentWorkingPage,
}: Props) {
  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90%",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "33pt", color: "#000" }}>{report_title}</h1>
        <h1 style={{ fontSize: "24pt", color: "#000", marginBottom: "20px" }}>
          {report_objective}
        </h1>
        <img
          src={brand_logo_url}
          alt="로고 이미지"
          style={{ maxWidth: "160px", height: "auto", marginTop: "10px" }}
        />
      </div>

      <p
        style={{
          position: "absolute",
          bottom: "20px",
          left: "30px",
          fontSize: "10pt",
          color: "#aaa",
        }}
      >
        작성일자 : {creation_date}
      </p>
    </section>
  );
}

export default CoverPage_00;
