import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AIResponsePanel from "./ai_response_panel";
import PromptForm from "./prompt_form";
import { toast } from "sonner";
import { z } from "zod";
import { useAIData } from "../contexts/AiResponseContext";
import { DataGoal } from "./data-goal";
import { useAuthContext } from "@/contexts/AuthContext";

const formSchema = z.object({
  user_prompt: z.string().min(5, "프롬프트는 최소한 5글자 이상이어야 합니다."),
  product1: z.string(),
  product2: z.string(),
});

export type Gemini_Prompt = z.infer<typeof formSchema>;

export type ChunkType =
  | "coverPage"
  | "contentsPage"
  | "overviewPage"
  | "swotPage"
  | "selfProductPage"
  | "competitorPage"
  | "comparisonPage"
  | "improvementPage"
  | "expectationGapPage"
  | "solutionPage"
  | "executionPlanPage"
  | "executionKPIPage"
  | "conclusionPage"
  | "executiveSummaryPage";

interface StreamingPromptContainerProps {
  category_id: string;
  category_name_ko: string;
  chunkType: ChunkType;
  chunkConstraint: any;
}

const StreamingPromptContainer = ({
  category_id,
  chunkType,
  chunkConstraint,
}: StreamingPromptContainerProps) => {
  const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const authContext = useAuthContext();

  const {
    dispatch,
    handlePromptFocus,
    handleSetCurrentlyWorkingPage,
    currentFocusPage,
  } = useAIData();

  const form = useForm<Gemini_Prompt>({
    resolver: zodResolver(formSchema),
    defaultValues: { user_prompt: "", product1: "", product2: "" },
  });

  useEffect(() => {
    form.reset();
    setResponse("");
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, [category_id]);

  const handleSubmit = async (values: Gemini_Prompt) => {
    setResponse("");
    setIsStreaming(true);

    const id = parseInt(category_id);
    const product1 = ((id - 1) * 2 + 1).toString();
    const product2 = (parseInt(product1) + 1).toString();

    const payload = {
      ...values,
      product1,
      product2,
      chunk_constraint: chunkConstraint,
      chunk_type: chunkType,
    };

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const userEmail = authContext.user?.user.email;
    const username = userEmail?.split("@")[0];

    try {
      handleSetCurrentlyWorkingPage(chunkType);

      const response = await fetch(
        `http://localhost:8000/promptTest/${username}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        toast.error(`HTTP 에러 발생 : ${response.status}`);
        return;
      }

      const json = await response.json(); // Expecting { text: "..." }
      const rawText = json.text || "";
      setResponse(rawText); // Show raw text in the UI

      // Clean and extract actual JSON
      let cleaned = rawText.trim();

      if (cleaned.startsWith("json")) {
        cleaned = cleaned.replace(/^json/, "").trim();
      }

      if (cleaned.startsWith("```json")) {
        cleaned = cleaned
          .replace(/^```json/, "")
          .replace(/```$/, "")
          .trim();
      } else if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
      }

      cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');

      const parsedData = JSON.parse(cleaned); // now it's a real object

      dispatch({
        type: "SET_CHUNK_DATA",
        chunk: chunkType,
        payload: parsedData,
      });
    } catch (err) {
      console.error("Fetch or parsing error:", err);
      toast.error("응답 파싱 중 문제가 발생했습니다.");
    } finally {
      setIsStreaming(false);
      handleSetCurrentlyWorkingPage(null);
    }
  };

  const handlePromptClick = () => handlePromptFocus(chunkType);

  return (
    <main
      className={`p-6 rounded-md transition-all duration-300 ${
        chunkType === currentFocusPage
          ? "bg-gray-50 ring-1 ring-blue-300 shadow-sm"
          : ""
      }`}
    >
      <h1 className="text-2xl mb-4">chunk_type: {chunkType.toLowerCase()}</h1>
      <section>
        <AIResponsePanel response={response} isStreaming={isStreaming} />
        <DataGoal constraint={chunkConstraint} />
        <PromptForm
          form={form}
          onSubmit={handleSubmit}
          isStreaming={isStreaming}
          onClick={handlePromptClick}
        />
      </section>
    </main>
  );
};

export default StreamingPromptContainer;
