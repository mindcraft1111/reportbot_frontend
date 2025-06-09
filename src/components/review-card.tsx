import type { Review } from "@/types/type";
import { Card, CardContent } from "./ui/card";
import Rating from "./rating";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Card aria-labelledby={`review-${review.review_id}`}>
      <CardContent className="flex flex-col gap-2">
        <header className="flex flex-wrap gap-4 items-center">
          <p>
            <strong>아이디:</strong> {review.review_id}
          </p>
          <p className="flex gap-2 items-center">
            <strong>별점:</strong> <Rating value={review.rating} />
          </p>
          <time dateTime={review.review_date}>
            <strong>작성일:</strong> {review.review_date}
          </time>
        </header>
        <section aria-labelledby={`review-${review.review_id}`}>
          <p id={`review-${review.review_id}`}>
            <strong>리뷰:</strong> {review.review}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
