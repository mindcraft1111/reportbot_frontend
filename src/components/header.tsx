import { ChevronDown } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
  return (
    <header
      className={
        "border-b border-b-slate-200 flex items-center sticky top-0 bg-white h-16 p-2"
      }
    >
      <div className="flex container justify-between items-center mx-auto px-2 lg:px-0">
        {/* logo */}
        <div
          className="flex items-center gap-2
        "
        >
          <div>
            <p className="text-amber-600 font-extrabold ">ViewBoth</p>
            <p className="text-xs">생성형 AI 기반 리포트 플랫폼</p>
          </div>
          <SidebarTrigger />
        </div>

        {/* profile */}
        <div className="flex gap-2 items-center">
          <div className="text-xs">1000 credits</div>
          <ChevronDown className="cursor-pointer" width={16} />
        </div>
      </div>
    </header>
  );
}
