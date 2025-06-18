import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Check, ClipboardCopy } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAIData } from "@/contexts/AiResponseContext";
import type { ChunkType } from "./streaming_prompt_container";

export function DataGoal() {
  const [copied, setCopied] = useState(false);
  const { state, handlePromptFocus, currentFocusPage, targets } = useAIData();
  const [selectedPart, setSelectedPart] = useState("part1");

  const pagesArray = Object.keys(state);
  const pageParts = targets[currentFocusPage];
  const partsArray = Object.keys(pageParts);
  const partConstraint = targets[currentFocusPage][selectedPart];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = JSON.stringify(partConstraint, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="goal">
        <div className="flex items-center justify-between pr-4">
          <AccordionTrigger className="flex-1 ">
            📈 데이터 목표 보기
          </AccordionTrigger>
          <Select
            onValueChange={(value) => {
              console.log(value);
              handlePromptFocus(value as ChunkType);
              setSelectedPart("part1");
            }}
            defaultValue="coverPage"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="page" />
            </SelectTrigger>
            <SelectContent>
              {pagesArray.map((page, index) => (
                <SelectItem key={page} value={page}>
                  {(index < 9 ? `0${index}` : `${index + 1}`) +
                    " " +
                    page.replace(/Page$/, "")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setSelectedPart(value);
            }}
            defaultValue={selectedPart}
            value={selectedPart}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="part" />
            </SelectTrigger>
            <SelectContent>
              {partsArray.map((part) => (
                <SelectItem key={part} value={part}>
                  {part}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            onMouseDown={(e) => e.stopPropagation()}
            className="gap-1"
            aria-label="복사하기"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <>
                <ClipboardCopy size={16} />
                복사하기
              </>
            )}
          </Button>
        </div>
        <AccordionContent>
          <pre className="whitespace-pre-wrap break-words text-sm bg-muted/40 p-4 rounded">
            <code>{JSON.stringify(partConstraint, null, 2)}</code>
          </pre>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
