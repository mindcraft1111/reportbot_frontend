import React, { forwardRef } from "react";

interface A4LayoutProps {
  children: React.ReactNode;
  chunkType: string
}

// ✅ enable ref forwarding
const A4Layout = forwardRef<HTMLDivElement, A4LayoutProps>(
  ({ children, chunkType }, ref) => {
    const isCover = chunkType === "coverPage";

    return (
      <div
        ref={ref}
        className="a4-layout scale-85"
        style={{
          width: "210mm",
          height: "297mm",
          padding: "20mm",
          margin: "auto",
          //backgroundColor: "white",
          backgroundColor: isCover ? "transparent" : "white",
          backgroundImage: isCover
            ? "url('/assets/cover/cover2.png')" // 실제 경로로 바꿔주세요
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    );
  }
);

export default A4Layout;
