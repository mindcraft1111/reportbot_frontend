import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AIResponsePanel from "./ai_response_panel";
import PromptForm from "./prompt_form";
import { toast } from "sonner";
import { z } from "zod";
import { useAIData } from "../contexts/AiResponseContext";
import { DataGoal } from "./data-goal";

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

const CATEGORY: Record<string, string> = {
  "1": "ELEC_ACCESSORY",
  "2": "PET",
  "3": "SKIN",
  "4": "LIFESTYLE",
  "5": "CAR_ACCESSORY",
};

const StreamingPromptContainer = ({ category_id }: { category_id: string }) => {
  const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [selectedPart, setSelectedPart] = useState("C001");
  const {
    dispatch,
    handleSetCurrentlyWorkingPage,
    currentFocusPage,
    state,
    handlePromptFocus,
    partsTargets,
  } = useAIData();

  const currentPartTarget = partsTargets[currentFocusPage][selectedPart];
  const currentCategory = CATEGORY[category_id];

  const form = useForm<Gemini_Prompt>({
    resolver: zodResolver(formSchema),
    defaultValues: { user_prompt: "", product1: "", product2: "" },
  });

  useEffect(() => {
    form.reset();
    setResponse("");
    setSelectedPart("C001");
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
      target_output_format: currentPartTarget,
      prompt_code: selectedPart,
      product_category: currentCategory,
    };

    console.log(payload)

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // const userEmail = authContext.user?.user.email;
    // const username = userEmail?.split("@")[0];

    try {
      handleSetCurrentlyWorkingPage(currentFocusPage);

      const response = await fetch(`http://localhost:8000/prompt/test/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        toast.error(`HTTP 에러 발생 : ${response.status}`);
        return;
      }

      const json = await response.json();

      let rawText =
        typeof json.data === "string"
          ? json.data
          : JSON.stringify(json.data, null, 2);

      if (typeof rawText === "string" && rawText.includes("```json")) {
        toast.error("응답에 ```json``` 문법이 포함되어 있습니다");
      }
      setResponse(rawText);

      const updatedPage = {
        ...state[currentFocusPage],
        ...json.data,
      };

      dispatch({
        type: "SET_CHUNK_DATA",
        chunk: currentFocusPage,
        payload: updatedPage,
      });
    } catch (err) {
      console.error("Fetch or parsing error:", err);
      toast.error("응답 파싱 중 문제가 발생했습니다.");
    } finally {
      setIsStreaming(false);
      handleSetCurrentlyWorkingPage(null);
    }
  };

  return (
    <main
      className={`p-12   rounded-md overflow-scroll w-[550px]
       `}
    >
      <section>
        <AIResponsePanel response={response} isStreaming={isStreaming} />
        <DataGoal
          selectedPart={selectedPart}
          setSelectedPart={setSelectedPart}
          handlePromptFocus={handlePromptFocus}
          currentFocusPage={currentFocusPage}
          partsTargets={partsTargets}
          state={state}
        />
        <PromptForm
          form={form}
          onSubmit={handleSubmit}
          isStreaming={isStreaming}
        />
      </section>
    </main>
  );
};

export default StreamingPromptContainer;
