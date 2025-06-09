import * as api_client from "@/api/client";
import type { Review } from "@/types/type";
import { useEffect, useState } from "react";
import ReviewCard from "../review-card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ProductsRadioSelector } from "../products-radio-selector";

export default function GetReviewPage() {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await api_client.get_reviews(2);
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    }
    fetchReviews();
  }, []);

  return (
    <>
      <ProductsRadioSelector />
      <div className="bg-slate-50 p-2 min-h-[calc(100vh-4rem)]">
        <ul className="flex flex-col gap-3">
          {reviews?.map((review) => (
            <li key={review.review_id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
