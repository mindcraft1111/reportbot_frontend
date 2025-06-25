import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReviewTable from "./review_table";

export type Review = {
  id: string;
  metadata: {
    product_id: number;
    rating: number;
    review_date: string;
    review_id: number;
  };
  page_content: string;
};

export default function RetrievedReviews({
  review01,
  review02,
  product01Name,
  product02Name,
}: {
  review01: Review[];
  review02: Review[];
  product01Name: string | undefined;
  product02Name: string | undefined;
}) {
  // console.log(product01Name);
  // console.log(product02Name);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">리뷰 확인하기</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto min-w-[1000px]">
        <DialogHeader>
          <DialogTitle>리뷰 확인하기</DialogTitle>
          <DialogDescription>
            <span className="font-extrabold italic">{product01Name}</span>과{" "}
            <span className="font-extrabold italic">{product02Name}</span>의
            리뷰를 확인합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 grid-cols-2">
          <ReviewTable reviewList={review01} />
          <ReviewTable reviewList={review02} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
