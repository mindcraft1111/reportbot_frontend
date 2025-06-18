import { useGeneralContext } from "@/contexts/GeneralContext";
import { Logs, MessageSquareText, Inbox, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const dashboardItems = [
  { name: "내 프로젝트", icon: <Logs /> },
  { name: "AI와 분석하기", icon: <MessageSquareText /> },
  { name: "데이터 관리", icon: <Inbox /> },
];

export default function DashboardSidebar() {
  const { isSidebarOpen } = useGeneralContext();
  return (
    <div
      className={`w-64 ${
        isSidebarOpen ? "visible fixed" : "hidden"
      } sm:flex flex-col overflow-y-auto bg-gray-100 border-r p-4`}
      style={{ height: "calc(100vh - 70px)" }}
    >
      <div className="py-2">
        <Button className="bg-blue-600 text-white hover:bg-blue-600/90 cursor-pointer w-full py-6">
          ViewBoth 시작하기
        </Button>
      </div>
      <div className="py-2 border-y-2 my-2 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4 pointer-events-none" />
        <Input
          className="pl-10 rounded-none bg-gray-200 text-gray-500"
          placeholder="프로젝트 검색"
        />
      </div>
      <ul className="my-0 ml-0">
        {dashboardItems.map((item) => {
          const isActive = String(item.name) === "";
          return (
            <li
              key={item.name}
              className={`${isActive ? "bg-blue-100 rounded-md" : ""}`}
            >
              <button
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors !text-sm cursor-pointer  ${
                  isActive
                    ? "text-blue-800 font-semibold"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-auto text-xs text-center">2025 ViewBoth | Team MINDCRAFT</p>
    </div>
  );
}
