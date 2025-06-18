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
import logo2 from "/assets/logo2.png";

// -----------------------------
// Default data for initialization
// -----------------------------

const partsTargets = {
  coverPage: {
    C001: {
      r_0_1: "report_title",
    },
    C002: {
      r_0_2: "report_objective",
    },
  },
  contentsPage: {
    no_part: {},
  },
  overviewPage: {
    C021: {
      r_2_1: "analysis_subject",
    },
    C022: {
      r_2_2: "analysis_methodology",
    },
  },
  swotPage: {
    C031: {
      r_3_1: "strength_title",
      r_3_2: "strength_description",
    },
    C032: {
      r_3_3: "weakness_title",
      r_3_4: "weakness_description",
    },
    C033: {
      r_3_5: "opportunity_title",
      r_3_6: "opportunity_description",
    },
    C034: {
      r_3_7: "threat_title",
      r_3_8: "threat_description",
    },
  },
  selfProductPage: {
    C041: {
      r_4_1_1: "positive_ratio",
      r_4_1_2: "negative_ratio",
    },
    C042: {
      r_4_2: "positive_icon_1",
      r_4_3: "positive_title_1",
      r_4_4: "positive_summary_1",
      r_4_5: "positive_icon_2",
      r_4_6: "positive_title_2",
      r_4_7: "positive_summary_2",
      r_4_8: "positive_icon_3",
      r_4_9: "positive_title_3",
      r_4_10: "positive_summary_3",
    },
    C043: {
      r_4_11: "negative_icon_1",
      r_4_12: "negative_title_1",
      r_4_13: "negative_summary_1",
      r_4_14: "negative_icon_2",
      r_4_15: "negative_title_2",
      r_4_16: "negative_summary_2",
      r_4_17: "negative_icon_3",
      r_4_18: "negative_title_3",
      r_4_19: "negative_summary_3",
    },
    C044: {
      r_4_20: "overall_summary",
    },
  },
  competitorPage: {
    C051: {
      r_5_2_1: "sentiment_positive_scores",
      r_5_2_2: "sentiment_negative_scores",
    },
    C052: {
      r_5_2: "competitor_name",
      r_5_3: "competitor_strength_1",
      r_5_4: "competitor_strength_2",
      r_5_5: "competitor_strength_3",
    },
    C053: {
      r_5_6: "competitor_summary",
    },
  },
  comparisonPage: {
    C061: {
      r_6_1_1: "list_of_evaluation_categories",
      r_6_1_2: "list_of_our_product_scores_by_category",
      r_6_1_3: "list_of_competitor_product_scores_by_category",
    },
    C062: {
      r_6_2: "gap_strength_area",
    },
    C063: {
      r_6_3: "gap_improvement_area",
    },
    C064: {
      r_6_4: "gap_opportunity_area",
    },
    C065: {
      r_6_5: "masked_competitor_name",
    },
    C066: {
      r_6_6: "self_nps",
      r_6_7: "competitor_nps",
    },
    C067: {
      r_6_8: "self_product_repurchase_intent",
      r_6_9: "competitor_product_repurchase_intent",
    },
    C068: {
      r_6_10: "self_brand_loyalty",
      r_6_11: "competitor_brand_loyalty",
    },
    C069: {
      r_6_12: "comparison_summary",
    },
  },
  improvementPage: {
    C071: {
      r_7_5_1: "priority_1_icon",
      r_7_5_2: "priority_1_title",
      r_7_5_3: "priority_1_description",
      r_7_5_4: "priority_2_icon",
      r_7_5_6: "priority_2_title",
      r_7_5_7: "priority_2_description",
      r_7_5_8: "priority_3_icon",
      r_7_5_9: "priority_3_title",
      r_7_5_10: "priority_3_description",
      r_7_5_11: "priority_4_icon",
      r_7_5_12: "priority_4_title",
      r_7_5_13: "priority_4_description",
      r_7_5_14: "priority_5_icon",
      r_7_5_15: "priority_5_title",
      r_7_5_16: "priority_5_description",
    },
  },
  expectationGapPage: {
    C081: {
      r_8_2: [
        {
          label: "title1",
          expected: "expected_value1",
          actual: "actual_value1",
          gap: "gap_value1",
        },
        {
          label: "title2",
          expected: "expected_value2",
          actual: "actual_value2",
          gap: "gap_value2",
        },
        {
          label: "title3",
          expected: "expected_value3",
          actual: "actual_value3",
          gap: "gap_value3",
        },
        {
          label: "title4",
          expected: "expected_value4",
          actual: "actual_value4",
          gap: "gap_value4",
        },
        {
          label: "title5",
          expected: "expected_value5",
          actual: "actual_value5",
          gap: "gap_value5",
        },
      ],
    },
    C082: {
      r_8_3: "expectation_gap_summary",
    },
  },
  solutionPage: {
    C091: {
      r_9_3_1: [
        { solution: "short_term_solution_1" },
        { solution: "short_term_solution_2" },
        { solution: "short_term_solution_3" },
        { solution: "short_term_solution_4" },
      ],
    },
    C092: {
      r_9_3_2: [
        { solution: "mid_term_solution_1" },
        { solution: "mid_term_solution_2" },
        { solution: "mid_term_solution_3" },
      ],
    },
    C093: {
      r_9_3_3: [
        { solution: "long_term_solution_1" },
        { solution: "long_term_solution_2" },
        { solution: "long_term_solution_3" },
      ],
    },
    C094: {
      r_9_5_1: "detail_solution_1_title",
      r_9_5_2: "detail_solution_1_subtitle",
      r_9_5_3: [
        {
          solution: "detail_1_solution_1",
        },
        { solution: "detail_1_solution_2" },
        {
          solution: "detail_1_solution_3",
        },
      ],
    },
    C095: {
      r_9_5_4: "detail_solution_2_title",
      r_9_5_5: "detail_solution_2_subtitle",
      r_9_5_6: [
        { solution: "detail_2_solution_1" },
        { solution: "detail_2_solution_2" },
        { solution: "detail_2_solution_3" },
      ],
    },
    C096: {
      r_9_5_7: "detail_solution_3_title",
      r_9_5_8: "detail_solution_3_subtitle",
      r_9_5_9: [
        { solution: "detail_3_solution_1" },
        { solution: "detail_3_solution_2" },
        { solution: "detail_3_solution_3" },
      ],
    },
    C097: {
      r_9_6: "solution_summary",
    },
  },
  executionPlanPage: {
    C101: {
      r_10_1: [
        {
          solution: "solution",
          ownerDept: "ownerDept",
          coopDept: "coopDept",
          role: "role",
        },
        {
          solution: "solution",
          ownerDept: "ownerDept",
          coopDept: "coopDept",
          role: "role",
        },
        {
          solution: "solution",
          ownerDept: "ownerDept",
          coopDept: "coopDept",
          role: "role",
        },
        {
          solution: "solution",
          ownerDept: "ownerDept",
          coopDept: "coopDept",
          role: "role",
        },
      ],
    },
  },
  executionKPIPage: {
    C111: {
      r_11_1: [
        {
          title: "kpi_metrics_1_title",
          items: [
            "kpi_metrics_item_1",
            "kpi_metrics_item_2",
            "kpi_metrics_item_3",
          ],
        },
        {
          title: "kpi_metrics_2_title",
          items: ["kpi_metrics_item_4", "kpi_metrics_item_5"],
        },
        {
          title: "kpi_metrics_3_title",
          items: ["kpi_metrics_item_6", "kpi_metrics_item_7"],
        },
      ],
    },
    C112: {
      r_11_2: "execution_plan_summary",
    },
    C113: {
      r_11_3: "budget_allocation_summary",
    },
  },
  conclusionPage: {
    C121: {
      r_12_1_1: [
        "self_current_sentiment_score",
        "self_current_NPS_score",
        "self_current_repurchase_score",
      ],
      r_12_1_2: [
        "competitor_current_sentiment_score",
        "competitor_current_NPS_score",
        "competitor_current_repurchase_score",
      ],
      r_12_1_3: [
        "target_sentiment_score",
        "target_NPS_score",
        "target_repurchase_score",
      ],
    },
    C122: {
      r_12_2_1: "current_insight",
      r_12_2_2: "strategic_direction",
      r_12_2_3: "future_outlook",
    },
  },
  executiveSummaryPage: {
    C131: {
      r_13_1_1_1: "recommendation_title_1",
      r_13_1_1_2: "recommendation_detail_1",
      r_13_1_2_1: "recommendation_title_2",
      r_13_1_2_2: "recommendation_detail_2",
      r_13_1_3_1: "recommendation_title_3",
      r_13_1_3_2: "recommendation_detail_3",
      r_13_1_4_1: "recommendation_title_4",
      r_13_1_4_2: "recommendation_detail_4",
    },
  },
};

const chunkConstraints = {
  coverPage: {
    r_0_1: "제품 리뷰 기반 감정 분석 보고서",
    r_0_2: "자사 vs 경쟁사 비교 분석",
    r_0_3: { logo2 },
    r_0_4: "2025-06-13",
  },
  contentsPage: {
    r_1_1: [
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
    r_2_1:
      "본 보고서는 자사와 경쟁사 제품에 대한 고객 리뷰를 감정 분석(Sentiment Analysis)하여 시장 내 위치를 파악하고 제품 개선 방향을 도출하는 것을 목적으로 합니다. 감정 분석은 자연어 처리(NLP) 기술을 활용하여 텍스트에 담긴 감정과 의견을 추출하는 기법으로, 고객의 실제 경험과 감정을 객관적으로 분석할 수 있습니다.",
    r_2_2:
      "본 분석에서는 자사의 주력 제품인 '소니 WH-CH720N'과 주요 경쟁사 1개 브랜드의 유사 제품에 대한 온라인 리뷰 데이터를 수집했습니다. 총 10,000건 이상의 리뷰를 분석 대상으로 삼았으며, 리뷰 데이터는 네이버 쇼핑 공식 웹사이트에서 수집되었습니다.",
    r_2_3:
      "(다른 내용 넣는게 좋을듯!) 본 분석은 SWOT 프레임워크를 활용하여 자사 제품의 강점(Strengths), 약점(Weaknesses), 기회(Opportunities), 위협(Threats)을 체계적으로 파악하고, 이를 바탕으로 실행 가능한 개선 방안을 도출하는 것을 목표로 합니다. 특히 고객 경험 향상과 시장 경쟁력 강화를 위한 실질적인 솔루션 제시에 중점을 두었습니다.",
  },
  swotPage: {
    r_3_1: "고객 중심 인터페이스",
    r_3_2: "직관적인 UI/UX로 인해 사용자 만족도가 높습니다.",
    r_3_3: "배터리 성능",
    r_3_4: "사용자들이 충전 빈도에 대한 불만을 표시하고 있습니다.",
    r_3_5: "시장 확대 기회",
    r_3_6: "신규 사용자층 확보를 위한 글로벌 마케팅 전략이 가능함.",
    r_3_7: "경쟁 심화",
    r_3_8:
      "동일 시장에 유사 제품이 빠르게 출시되고 있어 경쟁이 치열해지고 있습니다.",
  },
  selfProductPage: {
    r_4_1_1: 65,
    r_4_1_2: 15,
    r_4_2: "⭐",
    r_4_3: "사용자 인터페이스",
    r_4_4: "디자인이 이쁘고 사용이 편리해요.",
    r_4_5: "🔗",
    r_4_6: "연결성",
    r_4_7: "호환성이 뛰어나고 안정적이에요.",
    r_4_8: "⚡",
    r_4_9: "반응 속도",
    r_4_10: "즉각적인 반응으로 사용감이 좋음.",
    r_4_11: "🔋",
    r_4_12: "배터리 수명",
    r_4_13: "자주 충전해야 해서 불편해요.",
    r_4_14: "🛠️",
    r_4_15: "설치 복잡성",
    r_4_16: "설치 과정이 어렵고 오래 걸려요.",
    r_4_17: "💰",
    r_4_18: "가격 대비 가치",
    r_4_19: "가격에 비해 기능이 아쉬워요.",
    r_4_20:
      "시간 경과에 따른 감정 변화 추이를 분석한 결과, 최근 6개월간 긍정적 감정 비율이 점진적으로 증가하는 추세를 보이고 있습니다. 이는 지난 분기에 실시한 소프트웨어 업데이트와 사용자 인터페이스 개선의 효과로 해석됩니다. 다만, 배터리 수명과 관련된 부정적 피드백은 지속적으로 발생하고 있어 하드웨어 측면의 개선이 시급한 것으로 판단됩니다.",
  },
  competitorPage: {
    r_5_2: "젠하이저",
    r_5_2_1: [65, 72], // 긍정
    r_5_2_2: [15, 10], // 부정
    r_5_3: "고음질 오디오 성능",
    r_5_4: "프리미엄 브랜드 이미지",
    r_5_5: "소음 차단 기술 우수",
    r_5_6:
      "젠하이저 제품은 음질과 브랜드 이미지에서 강점을 보이며, 특히 프리미엄 시장에서의 경쟁력이 높습니다. 반면 일부 모델에서 사용성에 대한 불만이 제기되고 있어, 개선 여지가 존재합니다.",
  },
  comparisonPage: {
    r_6_1_1: [
      "사용 편의성",
      "기능 다양성",
      "성능/속도",
      "배터리 수명",
      "가격 경쟁력",
      "디자인",
      "고객 지원",
    ],
    r_6_1_2: [4.3, 4.4, 4.3, 3.1, 3.5, 4.2, 3.6],
    r_6_1_3: [4.5, 4.1, 4.0, 4.4, 4.2, 4.0, 4.5],
    r_6_2: "사용 편의성과 디자인 측면에서 경쟁사보다 높은 평가를 받음.",
    r_6_3: "배터리 수명 및 고객 지원 분야에서 개선 필요.",
    r_6_4: "가격 대비 성능과 사용자 경험 향상을 통한 시장 확대 기회 존재.",
    r_6_5: "A사",
    r_6_6: "68",
    r_6_7: "74",
    r_6_8: "82%",
    r_6_9: "89%",
    r_6_10: "4.2",
    r_6_11: "4.4",
    r_6_12:
      "자사 제품은 사용자 경험에서 경쟁사 대비 경쟁력을 확보하고 있으나, 하드웨어 지속성 및 사후 관리 측면에서 보완이 요구됩니다. 이를 통해 충성 고객층을 더욱 강화할 수 있습니다.",
  },
  improvementPage: {
    r_7_5_1: "https://via.placeholder.com/40?text=1",
    r_7_5_2: "고객지원 품질",
    r_7_5_3: "응대 속도 및 전문성 개선 필요",
    r_7_5_4: "https://via.placeholder.com/40?text=2",
    r_7_5_6: "설치 편의성",
    r_7_5_7: "초기 설정 과정 간소화 요청 다수",
    r_7_5_8: "https://via.placeholder.com/40?text=3",
    r_7_5_9: "배터리 수명",
    r_7_5_10: "짧은 사용시간에 대한 반복적 불만",
    r_7_5_11: "https://via.placeholder.com/40?text=4",
    r_7_5_12: "가격 경쟁력",
    r_7_5_13: "기능 대비 높은 가격에 대한 피드백 존재",
    r_7_5_14: "https://via.placeholder.com/40?text=5",
    r_7_5_15: "사용자 인터페이스",
    r_7_5_16: "디자인은 좋으나 일부 기능 진입이 복잡",
  },
  expectationGapPage: {
    r_8_2: [
      { label: "설치 용이성", expected: 4.5, actual: 3.7, gap: -0.8 },
      { label: "배터리 수명", expected: 4.2, actual: 3.2, gap: -1.0 },
      { label: "고객 지원", expected: 4.6, actual: 3.9, gap: -0.7 },
      { label: "가격 대비 가치", expected: 4.3, actual: 3.4, gap: -0.9 },
      { label: "디자인", expected: 4.0, actual: 4.2, gap: +0.2 },
    ],
    r_8_3:
      "고객의 기대치 대비 실제 경험 간의 GAP은 특히 '배터리 수명'과 '설치 용이성' 항목에서 크게 나타났습니다. 이는 제품 개선의 우선순위 결정에 중요한 인사이트로 작용할 수 있습니다.",
  },
  solutionPage: {
    r_9_3_1: [
      { solution: "배터리 최적화 펌웨어 업데이트 배포" },
      { solution: "설치 가이드 개선 및 비디오 튜토리얼 제작" },
      { solution: "고객 지원 인력 교육 및 운영 시간 확대" },
      { solution: "가격 전략 재검토 및 특별 프로모션 기획" },
    ],
    r_9_3_2: [
      { solution: "신형 배터리 셀 도입 및 전략 관리 회로 개선" },
      { solution: "제품 기능 확장에 따른 사용자 교육 프로그램 운영" },
      { solution: "중장기 AS 정책 개선 및 고객센터 확장" },
    ],
    r_9_3_3: [
      { solution: "AI 기반 문제 진단 및 자동 복구 기능 도입" },
      { solution: "구독형 모델로 서비스 접근성 확대" },
      { solution: "초저전력 하드웨어 아키텍처 재설계" },
    ],
    r_9_5_1: "배터리 수명 개선 전략",
    r_9_5_2: "에너지 효율 향상 방안",
    r_9_5_3: [
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
    r_9_5_4: "설치 편의성 제고",
    r_9_5_5: "고객 셀프설치 경험 개선",
    r_9_5_6: [
      { solution: "단기: 단계별 가이드 개선 및 QR코드 기반 빠른 설정 도입" },
      { solution: "중기: AR 기반 설치 가이드 제공" },
      { solution: "장기: AI 기반 자동 설치 시스템 구축" },
    ],
    r_9_5_7: "가격 경쟁력 강화",
    r_9_5_8: "시장 적정가 재설계",
    r_9_5_9: [
      { solution: "단기: 경쟁 가격 조정 및 번들 할인 프로모션" },
      { solution: "중기: 기본/고급형 라인업 전략 분리" },
      { solution: "장기: 제품+서비스 구독형 모델로 전환" },
    ],
    r_9_6:
      "각 솔루션은 실행 우선순위와 시장 반응을 고려하여 전략적으로 운영되어야 하며, 기술 투자와 동시에 고객 중심 접근이 병행되어야 합니다.",
  },
  executionPlanPage: {
    r_10_1: [
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
    r_11_1: [
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
    r_11_2:
      "솔루션은 분기별 단계로 나누어 실행되며, 단기(0~3개월), 중기(3~12개월), 장기(12~24개월) 실행 목표를 기반으로 진척도를 점검합니다.",
    r_11_3:
      "총 예산은 약 5억원으로 책정되며, 항목별로 R&D(40%), 마케팅(30%), 고객 지원 강화(20%), 시스템 개선(10%)에 배분됩니다.",
  },
  conclusionPage: {
    r_12_1_1: [4.1, 68, 82], // 자사 현재
    r_12_1_2: [3.8, 62, 77], // 경쟁사 평균
    r_12_1_3: [4.5, 75, 90], // 목표치
    r_12_2_1:
      "현재 자사는 고객 만족도에서 경쟁사보다 높은 점수를 받고 있으나, 일부 기능에서는 경쟁력이 부족합니다.",
    r_12_2_2:
      "차별화된 UX 개선과 기술 투자 강화를 통해 브랜드 신뢰도를 높이고 재구매율을 높여야 합니다.",
    r_12_2_3:
      "장기적으로는 구독형 모델 도입과 글로벌 진출 전략을 통해 시장 점유율 확대를 꾀할 수 있습니다.",
  },
  executiveSummaryPage: {
    r_13_1_1_1: "고객 중심 전략 전환",
    r_13_1_1_2:
      "모든 제품 및 서비스 개발 프로세스에 고객의 소리를 반영하는 체계를 구축해야 합니다.",
    r_13_1_2_1: "데이터 기반 의사결정 강화",
    r_13_1_2_2:
      "고객 피드백, 시장 동향, 제품 성과 데이터를 실시간으로 분석하고 반영하는 의사결정 구조를 마련하세요.",
    r_13_1_3_1: "부서 간 협업 문화 정착",
    r_13_1_3_2:
      "제품 개발, 마케팅, 고객 지원 부서 간의 원활한 커뮤니케이션과 공동 목표 설정이 필요합니다.",
    r_13_1_4_1: "장기적 혁신 로드맵 수립",
    r_13_1_4_2:
      "단기 개선뿐 아니라, 향후 2~3년을 내다본 혁신 과제를 체계적으로 준비해야 합니다.",
  },
};

const initialState = structuredClone(chunkConstraints);

// -----------------------------
// Define GlobalState type
// -----------------------------
type GlobalState = typeof initialState;
type ChunkConstraints = typeof chunkConstraints;
type PartsTargets = typeof partsTargets;

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
  currentFocusPage: ChunkType;
  handlePromptFocus: (chunkType: ChunkType) => void;
  currentlyWorkingPage: ChunkType | null;
  handleSetCurrentlyWorkingPage: (chunkType: ChunkType | null) => void;
  setCanSetWorkingPage: React.Dispatch<React.SetStateAction<boolean>>;
  canSetWorkingPage: boolean;
  partsTargets: PartsTargets;
} | null>(null);

export const AIDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation(); // ✅ access router location
  const [currentFocusPage, setCurrentFocusPage] =
    useState<ChunkType>("coverPage");
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
        partsTargets,
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
