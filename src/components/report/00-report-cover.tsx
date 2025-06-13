type Props = {
  r_0_1: string; // 보고서 제목 (대제목)
  r_0_2: string; // 부제목 또는 설명
  r_0_3: string; // 로고 이미지 URL
  r_0_4: string; // 작성일자 (예: "2025-06-13")
};

function CoverPage_00({ r_0_1, r_0_2, r_0_3, r_0_4 }: Props) {
  return (
    <section className="page-container">
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
        <h1 style={{ fontSize: "33pt", color: "#000" }}>{r_0_1}</h1>
        <h1 style={{ fontSize: "24pt", color: "#000", marginBottom: "20px" }}>
          {r_0_2}
        </h1>
        <img
          src={r_0_3}
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
        작성일자 : {r_0_4}
      </p>
    </section>
  );
}

export default CoverPage_00;
