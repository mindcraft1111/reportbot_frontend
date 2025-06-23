import React, { forwardRef } from "react";

interface A4LayoutProps {
  children: React.ReactNode;
}

// ✅ enable ref forwarding
const A4Layout = forwardRef<HTMLDivElement, A4LayoutProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="a4-layout scale-85"
        style={{
          width: "210mm",
          height: "297mm",
          padding: "20mm",
          margin: "auto",
          backgroundColor: "white",
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
