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
import * as apiClient from "../api/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters."),
});

export type Gemini_Prompt = z.infer<typeof formSchema>;

export default function NonStreamingPrompt({
  product_id,
}: {
  product_id: string;
}) {
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);

  const form = useForm<Gemini_Prompt>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: Gemini_Prompt) => apiClient.chat_with_gemini(values),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error("에러가 발생하였습니다.");
        return;
      }

      setGeminiResponse(result.data.response);
    },
    onError: () => {
      toast.error("에러가 발생하였습니다.");
    },
  });

  const onSubmit = (values: Gemini_Prompt) => {
    mutation.mutate(values);
  };

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Prompt for Product ID: {product_id}
      </h1>

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
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Fetching..." : "Submit Prompt"}
          </Button>
        </form>
      </Form>

      {mutation.isPending && (
        <p className="mt-4 text-sm text-muted-foreground">
          Waiting for AI response...
        </p>
      )}

      {geminiResponse && (
        <div className="mt-6 p-4 border rounded-lg bg-muted">
          <h2 className="font-semibold mb-2">AI Response:</h2>
          <p>{geminiResponse}</p>
        </div>
      )}
    </main>
  );
}
