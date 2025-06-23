import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AIResponsePanel from "./ai_response_panel";
import PromptForm from "./prompt_form";
import { toast } from "sonner";
import { z } from "zod";
import { useAIData } from "../contexts/AiResponseContext";
import { DataGoal } from "./data-goal";
import axiosInstance from "@/axios";
import { useAuthContext } from "@/contexts/AuthContext";
import { PromptList } from "./prompt-list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiClients from "@/api/client";
import type { Project } from "./prompt-sidebar";
import RetrievedReviews, { type Review } from "./retrieved-revies";
import ReportSelect from "./report-select";

const formSchema = z.object({
  user_prompt: z.string().min(5, "프롬프트는 최소한 5글자 이상이어야 합니다."),
  product1: z.string(),
  product2: z.string(),
  retriever_keyword: z.string().optional(),
});

export type AiResponse = {
  [key: string]: string;
};

const getProductsIds = (project_id: number) => {
  switch (project_id) {
    case 9:
      return { product1: 1, product2: 2 };
    case 10:
      return { product1: 3, product2: 4 };
    case 11:
      return { product1: 5, product2: 6 };
    case 12:
      return { product1: 7, product2: 8 };
    case 13:
      return { product1: 9, product2: 10 };
    default:
      return { product1: 0, product2: 0 };
  }
};

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
  "1": "ELECACC",
  "2": "PET",
  "3": "SKIN",
  "4": "LIFE",
  "5": "CAR",
};

const StreamingPromptContainer = ({
  project_id,
  projectList,
}: {
  project_id: string;
  projectList: Project[];
}) => {
  const queryClient = useQueryClient();

  const [aiResponse, setAiResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [selectedPart, setSelectedPart] = useState("C001");
  const [selectedPrompt, setSelectedPrompt] = useState<null | string>(null);
  const {
    dispatch,
    handleSetCurrentlyWorkingPage,
    currentFocusPage,
    state,
    handlePromptFocus,
    partsTargets,
  } = useAIData();
  const auth = useAuthContext();
  const [isPromptSubmitting, setIsPromptSubmitting] = useState(false);
  const currentPartTarget = partsTargets[currentFocusPage][selectedPart];
  const currentCategory = CATEGORY[project_id];
  const [abortKey, setAbortKey] = useState(0);
  const selectedProject = projectList?.find(
    (project) => project.project_id == Number(project_id)
  );
  const [selectedReportId, setSelectedReportId] = useState(
    String(selectedProject?.report_list[0].id)
  );
  const [review01, setReview01] = useState<Review[] | []>([]);
  const [review02, setReview02] = useState<Review[] | []>([]);

  useEffect(() => {
    const defaultId = selectedProject?.report_list?.[0]?.id;
    if (defaultId) setSelectedReportId(String(defaultId));
  }, [selectedProject]);

  const handlePromptTestStop = () => {
    setAbortKey((prev) => prev + 1); // Triggers useEffect
    setSelectedPrompt(null);
  };

  console.log(selectedProject);

  const { data: prompts, isLoading: isPromptsLoading } = useQuery({
    queryKey: ["prompts", selectedPart],
    queryFn: () =>
      apiClients.getPromptsByCode({
        promptCode: selectedPart,
      }),
    enabled: !!selectedPart, // only run when selectedPart is defined
    refetchOnWindowFocus: false, // 👈 turn off tab refetch
  });

  const form = useForm<Gemini_Prompt>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_prompt: "",
      product1: "",
      product2: "",
      retriever_keyword: "",
    },
  });

  useEffect(() => {
    form.reset();
    setAiResponse("");
    setReview01([]);
    setReview02([]);
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, [project_id, selectedPart, abortKey]);

  useEffect(() => {
    setSelectedPart("C001");
  }, [project_id]);

  const handleRequestGemini = async (values: Gemini_Prompt) => {
    setAiResponse("");
    setIsStreaming(true);

    const id = parseInt(project_id);

    const { product1, product2 } = getProductsIds(id);

    console.log("💡 values", values);

    const payload = {
      ...values,
      product1,
      product2,
      target_output_format: currentPartTarget,
      prompt_code: selectedPart,
      product_category: currentCategory,
    };

    // console.log(payload);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      handleSetCurrentlyWorkingPage(currentFocusPage);

      const response = await fetch(`http://localhost:8000/prompt/test/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorJson = await response.json();

        // If hint & details provided from server
        if (errorJson?.hint || errorJson?.details) {
          if (errorJson.hint) toast.error(errorJson.hint);
          if (errorJson.details)
            console.log("🔍 서버 상세 오류:", errorJson.details);
        } else {
          toast.error(`HTTP 에러 발생 : ${response.status}`);
        }

        return;
      }
      const json = await response.json();
      // console.log("😀 AI response:", json);

      console.log(json);

      let parsedData: AiResponse = json.data;
      let rawText: string;

      // Attempt to unwrap if json.data is a stringified object
      if (typeof json.data === "string") {
        try {
          const firstParse = JSON.parse(json.data);
          if (typeof firstParse === "object") {
            parsedData = firstParse;
            rawText = JSON.stringify(parsedData, null, 2);
          } else {
            rawText = json.data;
          }
        } catch (e) {
          console.warn("⚠️ Failed to parse json.data as JSON string:", e);
          rawText = json.data;
        }
      } else {
        rawText = JSON.stringify(parsedData, null, 2);
      }

      if (typeof rawText === "string" && rawText.includes("```json")) {
        toast.error("응답에 ```json``` 문법이 포함되어 있습니다");
      }

      setAiResponse(rawText);
      setReview01(json.review01);
      setReview02(json.review02);

      const updatedPage = {
        ...state[currentFocusPage],
        ...parsedData,
      };

      console.log("✅ updatedPage:", updatedPage);

      dispatch({
        type: "SET_CHUNK_DATA",
        chunk: currentFocusPage,
        payload: updatedPage,
      });
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        toast.warning("요청이 중단되었습니다.");
      } else {
        console.error("Fetch or parsing error:", err);
        toast.error("응답 파싱 중 문제가 발생했습니다.");
      }
    } finally {
      setIsStreaming(false);
      handleSetCurrentlyWorkingPage(null);
    }
  };

  // passed : 나중에 받아서 처리
  // reviewer_comment : 나중에 받아서 처리
  const handleSavePrompt = async () => {
    const payload = {
      reviewer: auth.user?.user.email,
      category: currentCategory,
      question: form.getValues("user_prompt"),
      answer: aiResponse,
      passed: true,
      reviewer_comment: "프롬프트가 잘 작동합니다.",
      tested_at: new Date().toISOString(),
      chunk_code: selectedPart,
    };

    // console.log(`😀 handleSavePrompt_payload: ${payload}`);
    setIsPromptSubmitting(true);
    try {
      await axiosInstance.post("http://localhost:8000/api/prompts-tests/", {
        ...payload,
      });
      toast.success("프롬프트 저장 완료");
      // 🔁 Refetch the prompt list for current selectedPart
      queryClient.invalidateQueries({ queryKey: ["prompts", selectedPart] });

      form.reset();
      setSelectedPrompt(null);
      setAiResponse("");
    } catch (error) {
      toast.error("프롬프트 저장 실패");
      console.log(error);
    } finally {
      setIsPromptSubmitting(false);
    }
  };

  const handlePromptSelect = (selectedPrompt: string) => {
    form.setValue("user_prompt", selectedPrompt);
    setSelectedPrompt(selectedPrompt);
  };

  const { mutate, isPending: isSavingReport } = useMutation({
    mutationFn: (paylaod: apiClients.ReportSectionPayload) =>
      apiClients.saveReport(paylaod),
    onSuccess: () =>
      toast.success(
        `리포트 저장 성공: id_${selectedReportId}, ${currentFocusPage}, ${selectedPart}`
      ),
    onError: () =>
      toast.error(
        `리포트 저장 실패: id_${selectedReportId}, ${currentFocusPage}, ${selectedPart}`
      ),
  });

  const handleSaveReport = () => {
    const payload = {
      report: selectedReportId,
      page_title: currentFocusPage,
      content: {
        [currentFocusPage]: aiResponse,
      },
      c_code: selectedPart,
      constraint_snapshot: currentPartTarget,
    };
    mutate(payload);
  };

  return (
    <main className="p-12 rounded-md overflow-scroll w-[550px]">
      <section className="flex flex-col gap-2">
        <ReportSelect
          key={project_id}
          selectedProject={selectedProject}
          selectedReportId={selectedReportId}
          setSelectedReportId={setSelectedReportId}
        />
        <AIResponsePanel aiResponse={aiResponse} isStreaming={isStreaming} />
        <RetrievedReviews
          review01={review01}
          review02={review02}
          product01Name={selectedProject?.product_1_name}
          product02Name={selectedProject?.product_2_name}
        />
        <DataGoal
          selectedPart={selectedPart}
          setSelectedPart={setSelectedPart}
          handlePromptFocus={handlePromptFocus}
          currentFocusPage={currentFocusPage}
          partsTargets={partsTargets}
          state={state}
          setSelectedPrompt={setSelectedPrompt}
        />
        <div className="flex flex-col gap-4">
          <PromptList
            prompts={prompts}
            isPromptsLoading={isPromptsLoading}
            selectedPart={selectedPart}
            onPromptSelect={handlePromptSelect}
            selectedPrompt={selectedPrompt}
          />
          <PromptForm
            form={form}
            onGeminiRequest={handleRequestGemini}
            isStreaming={isStreaming}
            onPromptSubmit={handleSavePrompt}
            isPromptSubmitting={isPromptSubmitting}
            handlePromptTestStop={handlePromptTestStop}
            handleSaveReport={handleSaveReport}
            isSavingReport={isSavingReport}
          />
        </div>
      </section>
    </main>
  );
};

export default StreamingPromptContainer;
