import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Check, ClipboardCopy } from "lucide-react";
import { useState } from "react";

export function DataGoal({ constraint }: { constraint: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = JSON.stringify(constraint, null, 2);
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
            <code>{JSON.stringify(constraint, null, 2)}</code>
          </pre>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
