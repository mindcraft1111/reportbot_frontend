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
  user_prompt: z.string().min(5, "Prompt must be at least 5 characters."),
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

  const { dispatch, handlePromptFocus, setCurrentlyWorkingPage } = useAIData();

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

    let finalResponse = "";

    const userEmail = authContext.user?.user.email;
    const username = userEmail?.split("@")[0];

    try {
      setCurrentlyWorkingPage(chunkType);

      const response = await fetch(
        `http://localhost:8000/promptTest/${username}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          if (trimmedLine.startsWith("data: ")) {
            const jsonStr = trimmedLine.substring(6);

            try {
              const parsed = JSON.parse(jsonStr);

              if (parsed.done) continue;
              if (parsed.error) {
                console.error("Server error:", parsed.error);
                toast.error(parsed.error);
                continue;
              }

              if (parsed.text) {
                setResponse((prev) => {
                  const next = prev + parsed.text;
                  finalResponse = next;
                  return next;
                });
              }
            } catch (parseError) {
              console.warn("Failed to parse JSON:", jsonStr, parseError);
            }
          }
        }
      }

      setIsStreaming(false);

      let cleaned = finalResponse.trim();
      if (cleaned.startsWith("```json")) {
        cleaned = cleaned
          .replace(/^```json/, "")
          .replace(/```$/, "")
          .trim();
      } else if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
      }

      cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');

      try {
        const parsedData = JSON.parse(cleaned);

        dispatch({
          type: "SET_CHUNK_DATA",
          chunk: chunkType,
          payload: parsedData,
        });
      } catch (jsonError) {
        console.error(
          "Parsing cleaned AI response failed:",
          jsonError,
          cleaned
        );
        toast.warning("응답 파싱에 실패했습니다.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Something went wrong while streaming response.");
      setIsStreaming(false);
    } finally {
      setCurrentlyWorkingPage(null);
    }
  };

  const handlePromptClick = () => handlePromptFocus(chunkType);

  return (
    <main className="p-6">
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
