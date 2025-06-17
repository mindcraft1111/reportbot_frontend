// context/AIDataContext.tsx
import type { ChunkType } from "@/components/streaming_prompt_container";
import {
  createContext,
  useReducer,
  useContext,
  type ReactNode,
  useEffect,
  useState,
} from "react";

// -----------------------------
// Default data for initialization
// -----------------------------

const chunkConstraints = {
  coverPage: {
    report_title: "제품 리뷰 기반 감정 분석 보고서",
    report_objective: "자사 vs 경쟁사 비교 분석",
    brand_logo_url: "https://via.placeholder.com/160x80.png?text=LOGO",
    creation_date: "2025-06-13",
  },
  contentsPage: {
    table_of_contents: [
      "개요",
      "분석 대상 및 방법론",
      "자사 제품 리뷰 감정 분석 결과",
      "경쟁사 제품 리뷰 감정 분석 결과",
      "자사와 경쟁사 비교 분석",
      "주요 개선 영역 도출",
      "솔루션 제안",
      "실행 계획 및 KPI",
      "결론 및 전략적 제언",
    ],
  },
  overviewPage: {
    analysis_subject:
      "본 보고서는 자사와 경쟁사 제품에 대한 고객 리뷰를 감정 분석(Sentiment Analysis)하여 시장 내 위치를 파악하고 제품 개선 방향을 도출하는 것을 목적으로 합니다. 감정 분석은 자연어 처리(NLP) 기술을 활용하여 텍스트에 담긴 감정과 의견을 추출하는 기법으로, 고객의 실제 경험과 감정을 객관적으로 분석할 수 있습니다.",
    analysis_methodology:
      "본 분석에서는 자사의 주력 제품인 '소니 WH-CH720N'과 주요 경쟁사 1개 브랜드의 유사 제품에 대한 온라인 리뷰 데이터를 수집했습니다. 총 10,000건 이상의 리뷰를 분석 대상으로 삼았으며, 리뷰 데이터는 네이버 쇼핑 공식 웹사이트에서 수집되었습니다.",
  },
  swotPage: {
    strength_title: "고객 중심 인터페이스",
    strength_description: "직관적인 UI/UX로 인해 사용자 만족도가 높습니다.",
    weakness_title: "배터리 성능",
    weakness_description:
      "사용자들이 충전 빈도에 대한 불만을 표시하고 있습니다.",
    opportunity_title: "시장 확대 기회",
    opportunity_description:
      "신규 사용자층 확보를 위한 글로벌 마케팅 전략이 가능함.",
    threat_title: "경쟁 심화",
    threat_description:
      "동일 시장에 유사 제품이 빠르게 출시되고 있어 경쟁이 치열해지고 있습니다.",
  },
  selfProductPage: {
    positive_ratio: 65,
    negative_ratio: 15,
    positive_icon_1: "⭐",
    positive_title_1: "사용자 인터페이스",
    positive_summary_1: "디자인이 이쁘고 사용이 편리해요.",
    positive_icon_2: "🔗",
    positive_title_2: "연결성",
    positive_summary_2: "호환성이 뛰어나고 안정적이에요.",
    positive_icon_3: "⚡",
    positive_title_3: "반응 속도",
    positive_summary_3: "즉각적인 반응으로 사용감이 좋음.",
    negative_icon_1: "🔋",
    negative_title_1: "배터리 수명",
    negative_summary_1: "자주 충전해야 해서 불편해요.",
    negative_icon_2: "🛠️",
    negative_title_2: "설치 복잡성",
    negative_summary_2: "설치 과정이 어렵고 오래 걸려요.",
    negative_icon_3: "💰",
    negative_title_3: "가격 대비 가치",
    negative_summary_3: "가격에 비해 기능이 아쉬워요.",
    overall_summary:
      "시간 경과에 따른 감정 변화 추이를 분석한 결과, 최근 6개월간 긍정적 감정 비율이 점진적으로 증가하는 추세를 보이고 있습니다. 이는 지난 분기에 실시한 소프트웨어 업데이트와 사용자 인터페이스 개선의 효과로 해석됩니다. 다만, 배터리 수명과 관련된 부정적 피드백은 지속적으로 발생하고 있어 하드웨어 측면의 개선이 시급한 것으로 판단됩니다.",
  },
  competitorPage: {
    competitor_name: "젠하이저",
    sentiment_positive_scores: [65, 72],
    sentiment_negative_scores: [15, 10],
    competitor_strength_1: "고음질 오디오 성능",
    competitor_strength_2: "프리미엄 브랜드 이미지",
    competitor_strength_3: "소음 차단 기술 우수",
    competitor_summary:
      "젠하이저 제품은 음질과 브랜드 이미지에서 강점을 보이며, 특히 프리미엄 시장에서의 경쟁력이 높습니다. 반면 일부 모델에서 사용성에 대한 불만이 제기되고 있어, 개선 여지가 존재합니다.",
  },
  comparisonPage: {
    evaluation_categories: [
      "사용 편의성",
      "기능 다양성",
      "성능/속도",
      "배터리 수명",
      "가격 경쟁력",
      "디자인",
      "고객 지원",
    ],
    self_scores_by_category: [4.3, 4.4, 4.3, 3.1, 3.5, 4.2, 3.6],
    competitor_scores_by_category: [4.5, 4.1, 4.0, 4.4, 4.2, 4.0, 4.5],
    gap_strength_area:
      "사용 편의성과 디자인 측면에서 경쟁사보다 높은 평가를 받음.",
    gap_improvement_area: "배터리 수명 및 고객 지원 분야에서 개선 필요.",
    gap_opportunity_area:
      "가격 대비 성능과 사용자 경험 향상을 통한 시장 확대 기회 존재.",
    masked_competitor_name: "A사",
    self_nps: "68",
    competitor_nps: "74",
    self_repurchase_intent: "82%",
    competitor_repurchase_intent: "89%",
    self_brand_loyalty: "4.2",
    competitor_brand_loyalty: "4.4",
    comparison_summary:
      "자사 제품은 사용자 경험에서 경쟁사 대비 경쟁력을 확보하고 있으나, 하드웨어 지속성 및 사후 관리 측면에서 보완이 요구됩니다. 이를 통해 충성 고객층을 더욱 강화할 수 있습니다.",
  },
  improvementPage: {
    priority_1_icon: "https://via.placeholder.com/40?text=1",
    priority_1_title: "고객지원 품질",
    priority_1_description: "응대 속도 및 전문성 개선 필요",

    priority_2_icon: "https://via.placeholder.com/40?text=2",
    priority_2_title: "설치 편의성",
    priority_2_description: "초기 설정 과정 간소화 요청 다수",

    priority_3_icon: "https://via.placeholder.com/40?text=3",
    priority_3_title: "배터리 수명",
    priority_3_description: "짧은 사용시간에 대한 반복적 불만",

    priority_4_icon: "https://via.placeholder.com/40?text=4",
    priority_4_title: "가격 경쟁력",
    priority_4_description: "기능 대비 높은 가격에 대한 피드백 존재",

    priority_5_icon: "https://via.placeholder.com/40?text=5",
    priority_5_title: "사용자 인터페이스",
    priority_5_description: "디자인은 좋으나 일부 기능 진입이 복잡",
  },
  expectationGapPage: {
    expectation_gap_items: [
      { label: "설치 용이성", expected: 4.5, actual: 3.7, gap: -0.8 },
      { label: "배터리 수명", expected: 4.2, actual: 3.2, gap: -1.0 },
      { label: "고객 지원", expected: 4.6, actual: 3.9, gap: -0.7 },
      {
        label: "가격 대비 가치",
        expected: 4.3,
        actual: 3.4,
        gap: -0.9,
      },
      { label: "디자인", expected: 4.0, actual: 4.2, gap: 0.2 },
    ],
    expectation_gap_summary:
      "고객의 기대치 대비 실제 경험 간의 GAP은 특히 '배터리 수명'과 '설치 용이성' 항목에서 크게 나타났습니다. 이는 제품 개선의 우선순위 결정에 중요한 인사이트로 작용할 수 있습니다.",
  },
  solutionPage: {
    short_term_solutions: [
      { solution: "배터리 최적화 펌웨어 업데이트 배포" },
      { solution: "설치 가이드 개선 및 비디오 튜토리얼 제작" },
      { solution: "고객 지원 인력 교육 및 운영 시간 확대" },
      { solution: "가격 전략 재검토 및 특별 프로모션 기획" },
    ],
    mid_term_solutions: [
      { solution: "신형 배터리 셀 도입 및 전략 관리 회로 개선" },
      { solution: "제품 기능 확장에 따른 사용자 교육 프로그램 운영" },
      { solution: "중장기 AS 정책 개선 및 고객센터 확장" },
    ],
    long_term_solutions: [
      { solution: "AI 기반 문제 진단 및 자동 복구 기능 도입" },
      { solution: "구독형 모델로 서비스 접근성 확대" },
      { solution: "초저전력 하드웨어 아키텍처 재설계" },
    ],

    detail_1_title: "배터리 수명 개선 전략",
    detail_1_subtitle: "에너지 효율 향상 방안",
    detail_1_solutions: [
      {
        solution:
          "단기: 배터리 사용량 최적화 알고리즘 적용 (15% 효율 향상 목표)",
      },
      { solution: "중기: 신형 배터리 셀 도입 및 회로 개선 (30% 효율 향상)" },
      {
        solution:
          "장기: 저전력 하드웨어 및 에너지 하베스팅 기술 도입 (50% 이상 향상)",
      },
    ],

    detail_2_title: "설치 편의성 제고",
    detail_2_subtitle: "고객 셀프설치 경험 개선",
    detail_2_solutions: [
      { solution: "단기: 단계별 가이드 개선 및 QR코드 기반 빠른 설정 도입" },
      { solution: "중기: AR 기반 설치 가이드 제공" },
      { solution: "장기: AI 기반 자동 설치 시스템 구축" },
    ],

    detail_3_title: "가격 경쟁력 강화",
    detail_3_subtitle: "시장 적정가 재설계",
    detail_3_solutions: [
      { solution: "단기: 경쟁 가격 조정 및 번들 할인 프로모션" },
      { solution: "중기: 기본/고급형 라인업 전략 분리" },
      { solution: "장기: 제품+서비스 구독형 모델로 전환" },
    ],

    solution_summary:
      "각 솔루션은 실행 우선순위와 시장 반응을 고려하여 전략적으로 운영되어야 하며, 기술 투자와 동시에 고객 중심 접근이 병행되어야 합니다.",
  },
  executionPlanPage: {
    department_execution_roles: [
      {
        solution: "배터리 최적화",
        ownerDept: "제품개발팀",
        coopDept: "QA팀, 고객지원팀",
        role: "기능 개발 및 성능 검증, 고객 대응 데이터 기반 개선",
      },
      {
        solution: "설치 편의성 향상",
        ownerDept: "UX팀",
        coopDept: "기술문서팀",
        role: "UX 설계 및 가이드 콘텐츠 제작",
      },
      {
        solution: "고객 지원 개선",
        ownerDept: "CS팀",
        coopDept: "HR팀",
        role: "고객 대응 품질 향상 및 인력 확보",
      },
      {
        solution: "가격 전략 개선",
        ownerDept: "마케팅팀",
        coopDept: "기획팀",
        role: "시장 조사 및 프로모션 기획",
      },
    ],
  },
  executionKPIPage: {
    kpi_metrics: [
      {
        title: "고객 만족도",
        items: [
          "NPS (Net Promoter Score) 점수 ≥ 70",
          "고객 불만 건수 월별 20% 감소",
          "설치 후 긍정 리뷰 비율 ≥ 85%",
        ],
      },
      {
        title: "제품 성능",
        items: ["배터리 수명 평균 15시간 이상", "설치 소요 시간 5분 이하 달성"],
      },
      {
        title: "운영 효율성",
        items: [
          "지원 인력 평균 응답 시간 2시간 이내",
          "월간 고객 이슈 처리율 ≥ 95%",
        ],
      },
    ],
    execution_plan_summary:
      "솔루션은 분기별 단계로 나누어 실행되며, 단기(0~3개월), 중기(3~12개월), 장기(12~24개월) 실행 목표를 기반으로 진척도를 점검합니다.",
    budget_allocation_summary:
      "총 예산은 약 5억원으로 책정되며, 항목별로 R&D(40%), 마케팅(30%), 고객 지원 강화(20%), 시스템 개선(10%)에 배분됩니다.",
  },
  conclusionPage: {
    current_scores: [4.1, 68, 82],
    competitor_scores: [3.8, 62, 77],
    target_scores: [4.5, 75, 90],
    current_insight:
      "현재 자사는 고객 만족도에서 경쟁사보다 높은 점수를 받고 있으나, 일부 기능에서는 경쟁력이 부족합니다.",
    strategic_direction:
      "차별화된 UX 개선과 기술 투자 강화를 통해 브랜드 신뢰도를 높이고 재구매율을 높여야 합니다.",
    future_outlook:
      "장기적으로는 구독형 모델 도입과 글로벌 진출 전략을 통해 시장 점유율 확대를 꾀할 수 있습니다.",
  },
  executiveSummaryPage: {
    recommendation_title_1: "고객 중심 전략 전환",
    recommendation_detail_1:
      "모든 제품 및 서비스 개발 프로세스에 고객의 소리를 반영하는 체계를 구축해야 합니다.",
    recommendation_title_2: "데이터 기반 의사결정 강화",
    recommendation_detail_2:
      "고객 피드백, 시장 동향, 제품 성과 데이터를 실시간으로 분석하고 반영하는 의사결정 구조를 마련하세요.",
    recommendation_title_3: "부서 간 협업 문화 정착",
    recommendation_detail_3:
      "제품 개발, 마케팅, 고객 지원 부서 간의 원활한 커뮤니케이션과 공동 목표 설정이 필요합니다.",
    recommendation_title_4: "장기적 혁신 로드맵 수립",
    recommendation_detail_4:
      "단기 개선뿐 아니라, 향후 2~3년을 내다본 혁신 과제를 체계적으로 준비해야 합니다.",
  },
};

const initialState = structuredClone(chunkConstraints);

// -----------------------------
// Define GlobalState type
// -----------------------------
type GlobalState = typeof initialState;
type ChunkConstraints = typeof chunkConstraints;

// -----------------------------
// Action type
// -----------------------------
type Action =
  | { type: "SET_CHUNK_DATA"; chunk: keyof GlobalState; payload: any }
  | { type: "RESET_ALL" }
  | { type: "RESET_CHUNK"; chunk: keyof GlobalState };

// -----------------------------
// Reducer
// -----------------------------
const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "SET_CHUNK_DATA":
      return {
        ...state,
        [action.chunk]: action.payload,
      };
    case "RESET_CHUNK": {
      const newState = { ...state };
      delete newState[action.chunk];
      return newState;
    }
    case "RESET_ALL":
      return chunkConstraints;
    default:
      return state;
  }
};

// -----------------------------
// Context setup
// -----------------------------
import { useLocation } from "react-router";
const AIDataContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
  chunkConstraints: ChunkConstraints;
  currentFocusPage: ChunkType | null;
  handlePromptFocus: (chunkType: ChunkType) => void;
  currentlyWorkingPage: ChunkType | null;
  handleSetCurrentlyWorkingPage: (chunkType: ChunkType | null) => void;
  setCanSetWorkingPage: React.Dispatch<React.SetStateAction<boolean>>;
  canSetWorkingPage: boolean;
} | null>(null);

export const AIDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation(); // ✅ access router location
  const [currentFocusPage, setCurrentFocusPage] = useState<ChunkType | null>(
    "coverPage"
  );
  const [currentlyWorkingPage, setCurrentlyWorkingPage] =
    useState<ChunkType | null>(null);
  const [canSetWorkingPage, setCanSetWorkingPage] = useState(true);

  const handleSetCurrentlyWorkingPage = (chunkType: ChunkType | null) => {
    if (!canSetWorkingPage) return;

    setCurrentlyWorkingPage(chunkType);
  };

  useEffect(() => {
    dispatch({ type: "RESET_ALL" }); // ✅ reset all state on path change
    setCurrentFocusPage("coverPage");
  }, [location.pathname]);

  const handlePromptFocus = (chunkType: ChunkType) => {
    setCurrentFocusPage(chunkType);
  };

  return (
    <AIDataContext.Provider
      value={{
        state,
        dispatch,
        chunkConstraints,
        currentFocusPage,
        handlePromptFocus,
        currentlyWorkingPage,
        handleSetCurrentlyWorkingPage,
        setCanSetWorkingPage,
        canSetWorkingPage,
      }}
    >
      {children}
    </AIDataContext.Provider>
  );
};

export const useAIData = () => {
  const context = useContext(AIDataContext);
  if (!context) {
    throw new Error("useAIData must be used within an AIDataProvider");
  }
  return context;
};

export default AIDataProvider;
