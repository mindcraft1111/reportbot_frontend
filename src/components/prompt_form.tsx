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
import { Spinner } from "./spinner";
import { type Gemini_Prompt } from "./streaming_prompt_container";
import type { UseFormReturn } from "react-hook-form";

type PromptFormProps = {
  form: UseFormReturn<Gemini_Prompt>;
  onSubmit: (values: Gemini_Prompt) => void | Promise<void>; // ✅ CORRECT type
  isStreaming: boolean;
};

const PromptForm = ({ form, onSubmit, isStreaming }: PromptFormProps) => (
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
);

export default PromptForm;
