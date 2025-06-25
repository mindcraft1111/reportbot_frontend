import { useEffect, useState } from "react";
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
import { Spinner } from "@/components/spinner";

type ProductInfo = {
  brandName: string;
  productName: string;
  productLink: string;
};

export default function DashboardPage() {
  const [selectedPage, setSelectedPage] = useState("requestPage");
  const [loading, setLoading] = useState(false);
  const [selectOwnProduct, setSelectOwnProduct] = useState("");
  const [selectCompetitorProduct, setSelectCompetitorProduct] = useState("");
  const [own, setOwn] = useState<ProductInfo>({
    brandName: "",
    productName: "",
    productLink: "",
  });
  const [competitor, setCompetitor] = useState<ProductInfo>({
    brandName: "",
    productName: "",
    productLink: "",
  });

  useEffect(() => {
    if (selectOwnProduct === "젠하이저") {
      setOwn({
        brandName: "젠하이저",
        productName: "젠하이저 ACAEBT(블랙)",
        productLink:
          "https://www.sennheiser-hearing.com/ko-KR/p/momentum-4-wireless/",
      });
    } else {
      setOwn({ brandName: "", productName: "", productLink: "" });
    }
  }, [selectOwnProduct]);

  useEffect(() => {
    if (selectCompetitorProduct === "소니") {
      setCompetitor({
        brandName: "소니",
        productName: "소니 WH-CH720N(블랙)",
        productLink:
          "https://www.sennheiser-hearing.com/ko-KR/p/momentum-4-wireless/",
      });
    } else {
      setCompetitor({ brandName: "", productName: "", productLink: "" });
    }
  }, [selectCompetitorProduct]);

  const handlePageSelect = (page: string) => setSelectedPage(page);

  const handleProductInfo = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("리뷰 수집이 완료되었습니다.");
    }, 5000);
  };

  return (
    <main className="flex">
      <DashboardSidebar onNavItemClick={handlePageSelect} />
      <section
        style={{ height: "calc(100vh - 70px)" }}
        className="overflow-scroll w-full"
      >
        {selectedPage === "requestPage" && (
          <RequestPage
            own={own}
            competitor={competitor}
            setOwn={setOwn}
            setCompetitor={setCompetitor}
            selectOwnProduct={selectOwnProduct}
            setSelectOwnProduct={setSelectOwnProduct}
            selectCompetitorProduct={selectCompetitorProduct}
            setSelectCompetitorProduct={setSelectCompetitorProduct}
            handleProductInfo={handleProductInfo}
            loading={loading}
          />
        )}
        {selectedPage === "viewReportPage" && <ReportPage />}
        {selectedPage === "createProject" && <CreateProjectPage />}
      </section>
    </main>
  );
}

interface RequestPageProps {
  own: ProductInfo;
  competitor: ProductInfo;
  setOwn: React.Dispatch<React.SetStateAction<ProductInfo>>;
  setCompetitor: React.Dispatch<React.SetStateAction<ProductInfo>>;
  selectOwnProduct: string;
  setSelectOwnProduct: (value: string) => void;
  selectCompetitorProduct: string;
  setSelectCompetitorProduct: (value: string) => void;
  handleProductInfo: () => void;
  loading: boolean;
}

function RequestPage({
  own,
  competitor,
  setOwn,
  setCompetitor,
  selectOwnProduct,
  setSelectOwnProduct,
  selectCompetitorProduct,
  setSelectCompetitorProduct,
  handleProductInfo,
  loading,
}: RequestPageProps) {
  return (
    <section className="p-8 bg-gray-100 flex-1 flex flex-col items-center">
      <h1 className="text-xl font-extrabold p-10">
        비교할 제품 정보를 알려주세요
      </h1>
      <section className="w-full flex flex-col gap-2">
        <Select value={selectOwnProduct} onValueChange={setSelectOwnProduct}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="자사 제품" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="젠하이저">젠하이저 헤드폰</SelectItem>
          </SelectContent>
        </Select>

        <div className="py-4 px-8 rounded-xl border bg-white flex flex-wrap gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <Label>브랜드명</Label>
            <Input
              value={own.brandName}
              onChange={(e) =>
                setOwn((prev) => ({ ...prev, brandName: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label>제품명</Label>
            <Input
              value={own.productName}
              onChange={(e) =>
                setOwn((prev) => ({ ...prev, productName: e.target.value }))
              }
            />
          </div>
          <div className="w-full mt-6 flex flex-col gap-2">
            <Label>제품링크</Label>
            <Input
              value={own.productLink}
              onChange={(e) =>
                setOwn((prev) => ({ ...prev, productLink: e.target.value }))
              }
            />
          </div>
        </div>

        <Select
          value={selectCompetitorProduct}
          onValueChange={setSelectCompetitorProduct}
        >
          <SelectTrigger className="w-[180px] bg-white mt-6">
            <SelectValue placeholder="타사 제품" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="소니">소니 헤드폰</SelectItem>
          </SelectContent>
        </Select>

        <div className="py-4 px-8 rounded-xl border bg-white flex flex-wrap gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <Label>브랜드명</Label>
            <Input
              value={competitor.brandName}
              onChange={(e) =>
                setCompetitor((prev) => ({
                  ...prev,
                  brandName: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label>제품명</Label>
            <Input
              value={competitor.productName}
              onChange={(e) =>
                setCompetitor((prev) => ({
                  ...prev,
                  productName: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full mt-6 flex flex-col gap-2">
            <Label>제품링크</Label>
            <Input
              value={competitor.productLink}
              onChange={(e) =>
                setCompetitor((prev) => ({
                  ...prev,
                  productLink: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <Button
          className="bg-blue-600 w-fit self-end mt-6 hover:bg-blue-600/90 cursor-pointer"
          onClick={handleProductInfo}
        >
          <Save />
          {loading ? <Spinner /> : "리뷰 수집하기"}
        </Button>
      </section>
    </section>
  );
}

function CreateProjectPage() {
  return (
    <section className="p-8 bg-gray-100 w-full h-full flex-1 flex flex-col items-center">
      <h1 className="text-xl font-extrabold p-10">프로젝트 생성하기</h1>
      <div className="py-4 px-8 rounded-xl border bg-white flex flex-wrap gap-4 w-full">
        <div className="flex flex-col gap-2 flex-1">
          <Label>프로젝트 이름</Label>
          <Input />
        </div>
        <div className="w-full mt-6 flex flex-col gap-2">
          <Label>프로젝트 설명</Label>
          <Input />
        </div>
      </div>
      <Button className="bg-blue-600 w-fit self-end mt-6 hover:bg-blue-600/90 cursor-pointer">
        <Plus />
        프로젝트 생성
      </Button>
    </section>
  );
}
