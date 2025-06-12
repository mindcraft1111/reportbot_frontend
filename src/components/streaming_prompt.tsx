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
import { useState } from "react";
import { toast } from "sonner";
import useAnimatedText from "@/hooks/useTextAnimation";

const formSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters."),
});

export type Gemini_Prompt = z.infer<typeof formSchema>;

export default function StreamingPrompt({
  category_name_ko,
}: {
  category_name_ko: string;
}) {
  const [geminiResponse, setGeminiResponse] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  const animatedText = useAnimatedText(geminiResponse);

  const form = useForm<Gemini_Prompt>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: Gemini_Prompt) => {
    setGeminiResponse("");
    setIsStreaming(true);

    try {
      const response = await fetch("http://localhost:8000/api/ai/streaming/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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

        // Split by "data: " and parse each JSON
        const chunks = buffer.split("data: ");
        buffer = chunks.pop() ?? ""; // keep incomplete chunk

        for (const chunk of chunks) {
          const trimmed = chunk.trim();
          if (!trimmed) continue;

          try {
            const json = JSON.parse(trimmed);
            setGeminiResponse((prev) => prev + json.text);
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Streaming failed.");
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Prompt for : {category_name_ko}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="lg:w-1/2 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your prompt here..."
                        {...field}
                        disabled={isStreaming}
                        className="min-h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isStreaming}>
                {isStreaming ? "Streaming..." : "Submit Prompt"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Gemini Response Section */}
        <div className="lg:w-1/2 w-full">
          <div className="border rounded-lg bg-muted p-4 h-64 overflow-auto whitespace-pre-wrap font-mono text-sm">
            <h2 className="font-semibold mb-2">AI Response:</h2>
            {animatedText || (isStreaming && "Waiting for AI response...")}
          </div>
        </div>
      </div>
    </main>
  );
}
