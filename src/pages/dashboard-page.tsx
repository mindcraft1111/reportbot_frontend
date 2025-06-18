import DashboardSidebar from "@/components/dashboard-sidebar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardPage() {
  return (
    <main className="flex">
      <DashboardSidebar />
      <section className="p-8 bg-gray-100 flex-1 flex flex-col items-center">
        <h1 className="text-xl font-extrabold p-10">
          비교할 제품 정보를 알려주세요
        </h1>
        <section className="w-full">
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="자사 제품" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">젠하이저 헤드폰</SelectItem>
            </SelectContent>
          </Select>
        </section>
      </section>
    </main>
  );
}
