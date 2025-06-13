import useAnimatedText from "@/hooks/useTextAnimation";
import MarkdownRenderer from "./MarkdownRenderer";

type Props = {
  response: string;
  isStreaming: boolean;
};

const AIResponsePanel = ({ response, isStreaming }: Props) => {
  const animatedText = useAnimatedText(response);

  return (
    <div className="border rounded-lg bg-muted p-4 h-128 overflow-auto whitespace-pre-wrap font-mono text-sm">
      <h2 className="font-semibold mb-2">AI Response:</h2>
      {isStreaming && !animatedText ? (
        "Waiting for AI response..."
      ) : (
        <MarkdownRenderer content={animatedText} />
      )}
    </div>
  );
};

export default AIResponsePanel;
