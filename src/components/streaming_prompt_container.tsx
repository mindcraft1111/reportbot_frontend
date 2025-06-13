import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AIResponsePanel from "./ai_response_panel";
import PromptForm from "./prompt_form";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema for form validation
const formSchema = z.object({
  user_prompt: z.string().min(5, "Prompt must be at least 5 characters."),
  product1: z.string(),
  product2: z.string(),
});

// Type for form values
export type Gemini_Prompt = z.infer<typeof formSchema>;

// Props type for the component
interface StreamingPromptContainerProps {
  category_id: string;
  category_name_ko: string;
}

const StreamingPromptContainer = ({
  category_id,
  category_name_ko,
}: StreamingPromptContainerProps) => {
  const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

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
    };

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("http://localhost:8000/api/ai/streaming/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let chunkCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        chunkCount++;
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
                setResponse((prev) => prev + parsed.text);
              }
            } catch (parseError) {
              console.warn("Failed to parse JSON:", jsonStr, parseError);
            }
          }
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Something went wrong while streaming response.");
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Prompt for: {category_name_ko}
      </h1>
      <section>
        <AIResponsePanel response={response} isStreaming={isStreaming} />
        <PromptForm
          form={form}
          onSubmit={handleSubmit} // ✅ This is a (values) => Promise<void>
          isStreaming={isStreaming}
        />
      </section>
      <section>{response}</section>
    </main>
  );
};

export default StreamingPromptContainer;
