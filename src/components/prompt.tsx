import StreamingPrompt from "./streaming_prompt";

export default function Prompt({
  key,
  category_name_ko,
  category_id,
}: {
  key: string;
  category_name_ko: string;
  category_id: string;
}) {
  return (
    <article className="flex">
      <StreamingPrompt
        key={key}
        category_name_ko={category_name_ko}
        category_id={category_id}
      />
    </article>
  );
}
