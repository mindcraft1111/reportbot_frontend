import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Review } from "./retrieved-revies";

export default function ReviewTable({ reviewList }: { reviewList: Review[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* <TableHead className="w-[100px]">날짜</TableHead> */}
          <TableHead>평점</TableHead>
          <TableHead>내용</TableHead>
          {/* <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviewList?.map((review) => (
          <TableRow key={review.id}>
            {/* <TableCell className="font-medium">
              {review.metadata.review_date}
            </TableCell> */}
            <TableCell>{review.metadata.rating}</TableCell>
            <TableCell className="p-2 align-top whitespace-pre-wrap break-words max-w-[600px]">
              {review.page_content}
            </TableCell>
            {/* <TableCell className="text-right">$250.00</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
