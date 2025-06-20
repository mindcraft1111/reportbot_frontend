import { useGeneralContext } from "@/contexts/GeneralContext";
import {
  Search,
  ChevronDown,
  LogsIcon,
  InboxIcon,
  MessageSquareTextIcon,
  ChevronRight,
  FolderKanbanIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react"; // for lucide-specific typing

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Link } from "react-router";

type DashboardItem = {
  name: string;
  icon: LucideIcon;
  children?: ChildMenu[];
  isLink?: string | null;
};

type ChildMenu = {
  name: string | null;
};

const dashboardItems = [
  {
    name: "내 프로젝트",
    icon: LogsIcon,
    children: [
      {
        name: "프로젝트 1",
      },
      {
        name: "프로젝트 2",
      },
      {
        name: "프로젝트 3",
      },
    ],
    isLink: null,
  },
  { name: "AI와 분석하기", icon: MessageSquareTextIcon, isLink: null },
  { name: "데이터 관리", icon: InboxIcon, isLink: null },
  {
    name: "프로젝트 생성하기",
    icon: FolderKanbanIcon,
    isLink: null,
  },
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
          return <DashboardItem key={item.name} {...item} />;
        })}
      </ul>
      <p className="mt-auto text-xs text-center">
        2025 ViewBoth | Team MINDCRAFT
      </p>
    </div>
  );
}

function DashboardItem(item: DashboardItem) {
  const parentItem = item.children;

  return parentItem ? (
    <ParentDashboardItem {...item} />
  ) : (
    <ChildDashboardItem {...item} />
  );
}

function ParentDashboardItem(item: DashboardItem) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <li
        key={item.name}
        className={`rounded-md flex items-center hover:bg-gray-200 px-2`}
        onClick={toggleMenu}
      >
        <Icon className="w-4" />
        <button
          className={`block w-full text-left px-3 py-2 rounded-md transition-colors !text-sm cursor-pointer  text-gray-700"
        `}
        >
          {item.name}
        </button>
        <ChevronDown className="w-4" />
      </li>
      <ul className="flex flex-col gap-2 text-sm cursor-pointer">
        {isOpen
          ? item.children?.map((prj) => (
              <li
                key={prj.name}
                onClick={toggleMenu}
                className="flex gap-2 items-center ml-4 hover:bg-gray-200 rounded px-2"
              >
                <ChevronRight className="w-4" />
                {prj.name}
              </li>
            ))
          : null}
      </ul>
    </>
  );
}

function ChildDashboardItem(item: DashboardItem) {
  const Icon = item.icon;
  const itemStyle =
    "block w-full text-left px-3 py-2 rounded-md transition-colors !text-sm cursor-pointer text-gray-700";
  return (
    <li
      key={item.name}
      className={`flex items-center rounded-md hover:bg-gray-200 px-2`}
    >
      <Icon className="w-4" />
      {item.isLink ? (
        <Link className={itemStyle} to={item.isLink}>
          {item.name}
        </Link>
      ) : (
        <button className={itemStyle}>{item.name}</button>
      )}
    </li>
  );
}
