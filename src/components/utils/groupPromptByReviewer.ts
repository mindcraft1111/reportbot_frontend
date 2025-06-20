export type TestPrompt = {
  answer: string;
  category_display: string;
  chunk_code: string;
  id: number;
  passed: boolean;
  question: string;
  reviewer_comment: string;
  reviewer_name: string;
  tested_at: string;
};

export type GroupedPrompt = {
  reviewer_name: string;
  prompt_list: TestPrompt[];
};

export default function groupByReviewer(
  prompts: TestPrompt[]
): GroupedPrompt[] {
  const map = new Map<string, TestPrompt[]>();

  for (const prompt of prompts) {
    const name = prompt.reviewer_name;
    if (!map.has(name)) {
      map.set(name, []);
    }
    map.get(name)!.push(prompt);
  }

  const result: GroupedPrompt[] = [];
  for (const [reviewer_name, prompt_list] of map) {
    result.push({ reviewer_name, prompt_list });
  }

  return result;
}
