import { Sparkles } from "lucide-react"; // Optional: Use any icon library

export default function SpinnerOverlay2() {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm animate-fade-in"
      style={{ pointerEvents: "none" }}
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        {/* Animated gradient spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-l-blue-400 border-r-purple-400 animate-spin" />
          <div className="absolute inset-2 bg-white rounded-full" />
        </div>

        {/* Optional animated icon */}
        <Sparkles className="text-blue-500 animate-pulse" size={24} />

        {/* Animated text */}
        <p className="text-base font-semibold text-gray-800">
          AI가 페이지를 수정하고 있습니다
          <span className="inline-block animate-bounce ml-1">.</span>
          <span className="inline-block animate-bounce ml-1 delay-150">.</span>
          <span className="inline-block animate-bounce ml-1 delay-300">.</span>
        </p>
      </div>
    </div>
  );
}
