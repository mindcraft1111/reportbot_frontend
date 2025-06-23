import SpinnerOverlay from "../spinner-overlay";
import sony from "/assets/brand/sony.png";

type Props = {
  r_0_1: string; // 보고서 제목 (대제목)
  r_0_2: string; // 부제목 또는 설명
  r_0_3: string; // 로고 이미지 URL
  r_0_4: string; // 작성일자 (예: "2025-06-13")
  isCurrentWorkingPage?: boolean; // AI 작업 중 여부
};

function CoverPage_00({
  r_0_1,
  r_0_2,
  r_0_3,
  isCurrentWorkingPage,
}: Props) {

  const today = new Date().toISOString().split('T')[0];
  const displayDate = today;
  
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
        <h1 style={{ fontSize: "35pt", color: "#000", fontFamily: "Freesentation-9Black" }}>{r_0_1}</h1>
        <h1 style={{ fontSize: "24pt", color: "#000", marginBottom: "20px" }}>
          {r_0_2}
        </h1>
        <img
          src={sony}
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
        작성일자 : {displayDate}
      </p>
    </section>
  );
}

export default CoverPage_00;
