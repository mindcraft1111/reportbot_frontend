import useAnimatedText from "@/hooks/useTextAnimation";
import MarkdownRenderer from "./MarkdownRenderer";

type Props = {
  aiResponse: string;
  isStreaming: boolean;
};

const AIResponsePanel = ({ aiResponse, isStreaming }: Props) => {
  const animatedText = useAnimatedText(aiResponse);

  return (
    <>
      <div className="border rounded-lg p-4 h-64 overflow-auto whitespace-pre-wrap font-mono text-sm">
        <h2 className="font-semibold mb-2">AI Response:</h2>
        {isStreaming && !animatedText ? (
          "Waiting for AI response..."
        ) : (
          <MarkdownRenderer content={animatedText} />
        )}
      </div>
    </>
  );
};

export default AIResponsePanel;
