import { useLocation, useParams } from "react-router";
import PromptSidebar from "@/components/prompt-sidebar";
import StreamingPrompt from "@/components/streaming_prompt";

const TOTAL_PROMPT = 30;

export default function PromptTestPage2() {
  const { category_id } = useParams<{
    category_id: string;
  }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryNameKo = searchParams.get("category_name_ko");

  return (
    <div className="flex h-screen">
      <PromptSidebar />
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {category_id &&
          categoryNameKo &&
          Array.from({ length: TOTAL_PROMPT }).map((_, i) => (
            <StreamingPrompt key={i} category_name_ko={categoryNameKo} />
          ))}
      </div>
    </div>
  );
}
