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
      <div className="border rounded-lg p-4 h-48 overflow-auto whitespace-pre-wrap font-mono text-sm">
        <h2 className="font-semibold mb-2">AI Response:</h2>
        {isStreaming && !animatedText ? (
          "AI의 응답을 기다리고 있습니다..."
        ) : (
          <MarkdownRenderer content={animatedText} />
        )}
      </div>
    </>
  );
};

export default AIResponsePanel;
