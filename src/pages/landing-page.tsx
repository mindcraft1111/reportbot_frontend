import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      <HeroSection />
      <LandingSection />
      <FeatureVisualSection />
      <FooterSection />
    </div>
  );
}

function HeroSection() {
  const navigator = useNavigate();
  return (
    <section
      className="text-center py-24 px-6 text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/landing/hero.png')",
      }}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        AI 리뷰 분석으로 찾는 인사이트
      </h1>
      <p className="text-lg md:text-xl mb-8">
        소셜과 상품 리뷰에서 핵심 정보를 빠르게 도출하세요.
      </p>
      <button
        className="bg-white text-blue-600 cursor-pointer font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        onClick={() => navigator("/auth/login")}
      >
        지금 시작하기
      </button>
    </section>
  );
}

function LandingSection() {
  return (
    <section className="py-16 px-4 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">
          이커머스 리뷰, 그냥 넘기지 마세요
        </h2>
        <p className="text-gray-600 text-lg">
          대시보드로 시각화하고, AI로 요약하고, 바로 팀과 공유하세요.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <Feature
          title="대시보드 시각화"
          description="데이터를 한눈에 보고 인사이트를 빠르게 확인하세요."
        />
        <Feature
          title="자동 요약과 질의응답"
          description="리뷰에 대해 자유롭게 질문하고 답변을 받아보세요."
        />
        <Feature
          title="상품 기획 인사이트"
          description="구매 동기, 불편 요소 등을 고객의 언어로 분석합니다."
        />
        <Feature
          title="시장 & 경쟁사 분석"
          description="경쟁사 리뷰를 비교 분석해 성공 요인을 도출하세요."
        />
      </div>
    </section>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
      data-aos="fade-up"
    >
      <h3 className="text-xl font-semibold mb-2 text-blue-500">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function FeatureVisualSection() {
  const src = "/assets/landing/feature";
  const items = [
    {
      title: "이커머스 리뷰의 AI 기반 분석",
      description1: "소셜 및 리뷰 데이터를 통해 인사이트를 얻으세요",
      description2:
        "국내외 이커머스와 주요 SNS에서 데이터를 안정적으로 수집합니다",
      img: `${src}1.png`,
    },
    {
      title: "결과를 시각화하고 공유하세요",
      description1: "시각화된 차트와 도표를 통해",
      description2: "리뷰 분석 결과를 한눈에 확인할 수 있어요",
      img: `${src}2.png`,
    },
    {
      title: "요약과 실행 아이디어까지 한 번에 해결하세요",
      description1: "생성형 AI 연결 없이도 요약과 질의응답이 가능해요",
      description2: "리뷰 내용에 대해 질문하고, 바로 응답을 받아보세요",
      img: `${src}3.png`,
    },
    {
      title: "현업에 바로 활용하세요",
      description1: "자주 언급되는 불편과 구매 패턴을 파악하세요",
      description2: "리뷰 분석 결과를 마케팅 및 제품 전략에 반영해보세요",
      img: `${src}4.png`,
    },
  ];

  return (
    <section className="py-20 px-4 md:px-12 lg:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto grid gap-16">
        <div className="relative flex flex-col items-center gap-5 w-full h-min max-w-[1200px] p-0">
          {items.map((item, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                className={`relative flex flex-col ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-12 py-[30px] w-full`}
                data-aos="fade-up"
                key={item.title}
              >
                <div
                  className="rounded-[15px] flex-none h-[500px] w-full max-w-[500px] relative sm:h-[350px] sm:max-w-[350px]"
                  data-aos={isEven ? "fade-left" : "fade-right"}
                >
                  <img
                    className="block w-full h-full object-contain object-left-center rounded-[inherit]"
                    src={item.img}
                    alt={item.title}
                  />
                </div>
                <div
                  className={`flex flex-col ${
                    isEven
                      ? "items-center md:items-end text-center md:text-right"
                      : "items-center md:items-start text-center md:text-left"
                  } gap-5 w-full flex-[1_0_0px] relative`}
                  data-aos={isEven ? "fade-right" : "fade-left"}
                >
                  <div className="text-2xl font-bold space-y-1">
                    <p>{item.title}</p>
                  </div>
                  <div className="text-gray-700 w-full md:max-w-[396px] space-y-1">
                    <p>{item.description1}</p>
                    <p>{item.description2}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-gray-100 text-center py-10 border-t">
      <p className="text-gray-500">© 2025 viewboth. | Team MINDCRAFT</p>
    </footer>
  );
}
