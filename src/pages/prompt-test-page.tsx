import { useParams } from "react-router";
import PromptSidebar from "@/components/prompt-sidebar";
import StreamingPrompt from "@/components/streaming_prompt";

const TOTAL_PROMPT = 30;

export default function PromptTestPage2() {
  const { product_id } = useParams<{ product_id: string }>();

  return (
    <div className="flex h-screen">
      <PromptSidebar />
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {product_id &&
          Array.from({ length: TOTAL_PROMPT }).map((_, i) => (
            <StreamingPrompt key={i} product_id={product_id} />
          ))}
      </div>
    </div>
  );
}
