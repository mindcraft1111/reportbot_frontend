export default function SpinnerOverlay() {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/60"
      style={{ pointerEvents: "none" }}
    >
      <div style={{ textAlign: "center" }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-800 mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-gray-800">
          AI가 페이지를 수정하고 있습니다
        </p>
      </div>
    </div>
  );
}
