import React from "react";

interface A4LayoutProps {
  children: React.ReactNode;
}

export default function A4Layout({ children }: A4LayoutProps) {
  return (
    <div
      className="a4-layout"
      style={{
        width: "210mm", // A4 width
        height: "297mm", // A4 height
        padding: "20mm",
        margin: "auto",
        backgroundColor: "white",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
        overflow: "hidden", // prevent internal scrolling, so content must fit
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}
