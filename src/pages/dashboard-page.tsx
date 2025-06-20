import DashboardSidebar from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="flex">
      <DashboardSidebar />
      <section
        style={{ height: "calc(100vh - 70px)" }}
        className="overflow-scroll w-full"
      >
        <section className="p-8 bg-gray-100 flex-1 flex flex-col items-center">
          <h1 className="text-xl font-extrabold p-10">
            비교할 제품 정보를 알려주세요
          </h1>
          <section className="w-full flex flex-col gap-2">
            <Select>
              <SelectTrigger className="w-[180px] bg-white  ">
                <SelectValue placeholder="자사 제품" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">젠하이저 헤드폰</SelectItem>
              </SelectContent>
            </Select>
            <div className="py-4 px-8 rounded-xl border bg-white flex flex-wrap gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Label>브랜드명</Label>
                <Input />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Label>제품명</Label>
                <Input></Input>
              </div>
              <div className="w-full mt-6 flex flex-col gap-2">
                <Label>제품링크</Label>
                <Input></Input>
              </div>
            </div>

            <Select>
              <SelectTrigger className="w-[180px] bg-white mt-6">
                <SelectValue placeholder="타사 제품" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">소니 헤드폰</SelectItem>
              </SelectContent>
            </Select>
            <div className="py-4 px-8 rounded-xl border bg-white flex flex-wrap gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Label>브랜드명</Label>
                <Input />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Label>제품명</Label>
                <Input></Input>
              </div>
              <div className="w-full mt-6 flex flex-col gap-2">
                <Label>제품링크</Label>
                <Input></Input>
              </div>
            </div>

            <Button className="bg-blue-600 w-fit self-end mt-6 hover:bg-blue-600/90 cursor-pointer">
              <Save />
              리뷰 수집하기
            </Button>
          </section>
        </section>

        <section className="p-8 bg-gray-100 w-full  flex-1 flex flex-col items-center">
          <h1 className="text-xl font-extrabold p-10">프로젝트 생성하기</h1>
          <div className="py-4 px-8 rounded-xl border bg-white flex flex-wrap gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <Label>프로젝트 이름</Label>
              <Input />
            </div>
            <div className="w-full mt-6 flex flex-col gap-2">
              <Label>프로젝트 설명</Label>
              <Input></Input>
            </div>
          </div>
          <Button className="bg-blue-600 w-fit self-end mt-6 hover:bg-blue-600/90 cursor-pointer">
            <Plus />
            프로젝트 생성
          </Button>
        </section>
      </section>
    </main>
  );
}
