import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import useAnimatedText from "@/hooks/useTextAnimation";
import { Spinner } from "./spinner";
import MarkdownRenderer from "./MarkdownRenderer";

const formSchema = z.object({
  user_prompt: z.string().min(5, "Prompt must be at least 5 characters."),
  product1: z.string(),
  product2: z.string(),
});

export type Gemini_Prompt = z.infer<typeof formSchema>;

export default function StreamingPrompt({
  category_name_ko,
  category_id,
}: {
  category_name_ko: string;
  category_id: string;
}) {
  const [geminiResponse, setGeminiResponse] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  const animatedText = useAnimatedText(geminiResponse);

  const form = useForm<Gemini_Prompt>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_prompt: "",
      product1: "",
      product2: "",
    },
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Reset form and response
    form.reset({
      user_prompt: "",
      product1: "",
      product2: "",
    });
    setGeminiResponse("");

    // Abort any ongoing fetch
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, [category_id, form]);

  const onSubmit = async (values: Gemini_Prompt) => {
    setGeminiResponse("");
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
        throw new Error("Response error");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("data: ");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          const trimmed = chunk.trim();
          if (!trimmed) continue;

          try {
            const json = JSON.parse(trimmed);
            setGeminiResponse((prev) => prev + json.text);
          } catch {
            // Ignore malformed chunk
          }
        }
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.warn("Fetch aborted due to category_id change.");
      } else {
        console.error(err);
        toast.error("Streaming failed.");
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Prompt for : {category_name_ko}
      </h1>

      <div className="flex flex-col gap-6">
        {/* Gemini Response Section */}
        <div className="w-full">
          <div className="border rounded-lg bg-muted p-4 h-128 overflow-auto whitespace-pre-wrap font-mono text-sm">
            <h2 className="font-semibold mb-2">AI Response:</h2>
            {isStreaming && !animatedText ? (
              "Waiting for AI response..."
            ) : (
              <MarkdownRenderer content={animatedText} />
            )}
          </div>
        </div>

        {/* Prompt Input Form */}
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="user_prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your prompt here..."
                        {...field}
                        disabled={isStreaming}
                        className="min-h-[100px]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isStreaming}>
                {isStreaming ? (
                  <>
                    <Spinner />
                    <span className="ml-2">Streaming...</span>
                  </>
                ) : (
                  "Submit Prompt"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
