import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import ReportPage from "./report-page";

const reportCreateSchema = z.object({
  project: z.string(),
  template: z.nullable(z.string()),
  category: z.string(),
  title: z.string(),
  summary: z.nullable(z.string()),
});

export type Report_Create = z.infer<typeof reportCreateSchema>;

export default function DashboardPage() {
  const [reportInfo, setReportInfo] = useState({});
  const [selectedPage, setSelectedPage] = useState("requestPage");

  console.log(selectedPage);

  const handlePageSelect = (page: string) => {
    setSelectedPage(page);
  };

  const form = useForm<Report_Create>({
    resolver: zodResolver(reportCreateSchema),
    defaultValues: {
      project: "",
      template: "1",
      category: "ELECACC",
      title: "",
      summary: "",
    },
  });

  const handleCreateProject = async (values: Report_Create) => {
    setReportInfo({});

    const product1 = "3";
    const product2 = "4";
    const payload = {
      ...values,
      product1,
      product2,
      template: "1",
      catecory: "ELECACC",
    };

    console.log(payload);

    try {
      const response = await fetch(`http://localhost:8000/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorJson = await response.json();

        // If hint & details provided from server
        if (errorJson?.hint || errorJson?.details) {
          if (errorJson.hint) toast.error(errorJson.hint);
          if (errorJson.details)
            console.log("🔍 서버 상세 오류:", errorJson.details);
        } else {
          toast.error(`HTTP 에러 발생 : ${response.status}`);
        }

        return;
      }
      const json = await response.json();

      let parsedData: any = json.data;
      setReportInfo(parsedData);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        toast.warning("요청이 중단되었습니다.");
      } else {
        console.error("error:", err);
        toast.error("오류가 발생했습니다.");
      }
    }
  };

  return (
    <main className="flex">
      <DashboardSidebar onNavItemClick={handlePageSelect} />
      <section
        style={{ height: "calc(100vh - 70px)" }}
        className="overflow-scroll w-full"
      >
        {selectedPage == "requestPage" ? <RequestPage /> : null}
        {selectedPage == "viewReportPage" ? <ReportPage /> : null}
        {selectedPage == "createProject" ? <CreateProjectPage /> : null}
      </section>
    </main>
  );
}

function RequestPage() {
  return (
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

        <Select>
          <SelectTrigger className="w-[180px] bg-white mt-6">
            <SelectValue placeholder="타사 제품" />
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

        <Button className="bg-blue-600 w-fit self-end mt-6 hover:bg-blue-600/90 cursor-pointer">
          <Save />
          리뷰 수집하기
        </Button>
      </section>
    </section>
  );
}

function CreateProjectPage() {
  return (
    <section className="p-8 bg-gray-100 w-full h-full  flex-1 flex flex-col items-center">
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
  );
}
