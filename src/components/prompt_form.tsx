import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "./spinner";
import { type Gemini_Prompt } from "./streaming_prompt_container";
import type { UseFormReturn } from "react-hook-form";

type PromptFormProps = {
  form: UseFormReturn<Gemini_Prompt>;
  onGeminiRequest: (values: Gemini_Prompt) => void | Promise<void>;
  isStreaming: boolean;
  onPromptSubmit: () => void;
  isPromptSubmitting: boolean;
};

const PromptForm = ({
  form,
  onGeminiRequest,
  isStreaming,
  onPromptSubmit,
  isPromptSubmitting,
}: PromptFormProps) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onGeminiRequest)} className="space-y-6">
      <FormField
        control={form.control}
        name="user_prompt"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Type your prompt here..."
                {...field}
                disabled={isStreaming}
                className="min-h-[100px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    form.handleSubmit(onGeminiRequest)();
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-between">
        <Button
          type="submit"
          disabled={isStreaming}
          className="bg-blue-600 hover:bg-blue-600/90 cursor-pointer"
        >
          {isStreaming ? (
            <>
              <Spinner />
              <span className="ml-2">AI의 응답을 기다리는 중입니다...</span>
            </>
          ) : (
            "프롬프트 테스트"
          )}
        </Button>

        <Button
          type="button"
          disabled={isStreaming}
          className="bg-green-600 hover:bg-green-600/90 cursor-pointer"
          onClick={(e) => {
            console.log("button clicked");
            e.preventDefault();
            e.stopPropagation();
            onPromptSubmit();
            
          }}
        >
          {isPromptSubmitting ? (
            <>
              <Spinner />
            </>
          ) : (
            "프롬프트 저장"
          )}
        </Button>
      </div>
    </form>
  </Form>
);

export default PromptForm;
