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
import type { ChunkType } from "./streaming_prompt_container";

type Props = {
  selectedPart: any;
  setSelectedPart: any;
  state: any;
  handlePromptFocus: any;
  currentFocusPage: any;
  partsTargets: any;
};

export function DataGoal({
  selectedPart,
  setSelectedPart,
  state,
  handlePromptFocus,
  currentFocusPage,
  partsTargets,
}: Props) {
  const [copied, setCopied] = useState(false);

  const pagesArray = Object.keys(state);
  const partConstraint = partsTargets[currentFocusPage][selectedPart];

  const pageParts = partsTargets[currentFocusPage];
  const partsArray = Object.keys(pageParts);

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
        <div className="flex items-center justify-between pr-4 gap-2 flex-wrap lg:flex-nowrap">
          <AccordionTrigger className="flex-1 ">📈</AccordionTrigger>

          <Select
            value={currentFocusPage}
            onValueChange={(value: ChunkType) => {
              handlePromptFocus(value as ChunkType);
              const pageParts = partsTargets[value];
              const firstKey = Object.keys(pageParts)[0];
              setSelectedPart(firstKey);
            }}
            defaultValue="coverPage"
          >
            <SelectTrigger className="w-[180px] flex-1">
              <SelectValue placeholder="page" />
            </SelectTrigger>
            <SelectContent>
              {pagesArray.map((page, index) => (
                <SelectItem key={page} value={page}>
                  {(index < 10 ? `0${index}` : `${index}`) +
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
            <SelectTrigger className="w-[100px] flex-1">
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
