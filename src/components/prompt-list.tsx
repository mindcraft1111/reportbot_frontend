import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GroupedPrompt } from "./utils/groupPromptByReviewer";
import { Spinner } from "./spinner";

export function PromptList({
  prompts,
  selectedPart,
  onPromptSelect,
  selectedPrompt,
  isPromptsLoading,
}: {
  prompts: GroupedPrompt[] | undefined;
  selectedPart: string;
  onPromptSelect: (selectedPrompt: string) => void;
  selectedPrompt: string | null;
  isPromptsLoading: boolean;
}) {
  if (!prompts) return null;
  const noPrompt = prompts.length === 0;
  console.log("😀 selectedPart", selectedPart);
  console.log("😀 selectedPrompt", selectedPrompt);
  return (
    <Select value={selectedPrompt ?? ""} onValueChange={onPromptSelect}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={
            isPromptsLoading
              ? "로딩 중..."
              : noPrompt
              ? "작성된 프롬프트가 없습니다."
              : selectedPart
          }
        />
      </SelectTrigger>
      <SelectContent className="max-w-[var(--radix-select-trigger-width)]">
        {isPromptsLoading ? (
          <Spinner />
        ) : noPrompt ? (
          <div className="p-4 text-gray-500 text-sm">
            작성된 프롬프트가 없습니다.
          </div>
        ) : (
          prompts.map((user) => (
            <SelectGroup key={user.reviewer_name}>
              <SelectLabel>{user.reviewer_name}</SelectLabel>
              {user.prompt_list.map((prompt) => (
                <SelectItem key={prompt.id} value={prompt.question}>
                  <span>{prompt.id}</span>
                  <span>{prompt.question}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
