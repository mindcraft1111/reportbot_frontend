import StreamingPrompt from "./streaming_prompt";
import Swot from "./pdf-segments/page_01/swot";

const dummyData = {
  R_3_1: "브랜드 인지도",
  R_3_2:
    "우리 제품은 국내 소비자에게 높은 인지도를 보유하고 있으며, 고객 만족도 또한 매우 높습니다.",
  R_3_3: "기술 인프라 부족",
  R_3_4:
    "내부 시스템이 노후화되어 신기술 도입이 어렵고, 운영 효율성에 영향을 미치고 있습니다.",
  R_3_5: "친환경 시장 확대",
  R_3_6:
    "소비자들의 환경 인식이 높아지면서 친환경 제품에 대한 수요가 급증하고 있습니다.",
  R_3_7: "신규 경쟁사 등장",
  R_3_8: "글로벌 브랜드가 국내 시장에 진입하면서 경쟁이 심화되고 있습니다.",
};

<Swot {...dummyData} />;

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
      <Swot {...dummyData} />
    </article>
  );
}
