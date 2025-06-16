import { useLocation, useParams } from "react-router";
import PromptSidebar from "@/components/prompt-sidebar";
import StreamingPromptContainer from "@/components/streaming_prompt_container";
import A4Layout from "@/components/layouts/A4-layout";
import PageSeparator from "@/components/page-separator";
import ReportCoverPage from "@/components/report/00-report-cover";
import ContentsPage_01 from "@/components/report/01-contents";
import OverviewPage_02 from "@/components/report/02-overview";
import SwotPage_03 from "@/components/report/03-swot";
import SelfProductPage_04 from "@/components/report/04-my-product";
import CompetitorPage_05 from "@/components/report/05-competitor";
import ComparisonPage_06 from "@/components/report/06-comparison";
import ImprovementPage_07 from "@/components/report/07-improve";
import ExpectationGapPage_08 from "@/components/report/08-expectation";
import SolutionPage_09 from "@/components/report/09-solution";
import ExecutionPlanPage_10 from "@/components/report/10-execution-plan";
import ExecutionKPIPage_11 from "@/components/report/11-execution-kpi";
import ConclusionPage_12 from "@/components/report/12-conclusion";
import ExecutiveSummaryPage_13 from "@/components/report/13-executive-summary";
import { useAIData } from "../contexts/AiResponseContext";
import type { ChunkType } from "@/components/streaming_prompt_container";
import { useRequireLogin } from "@/hooks/useRequireLogin";
import { useEffect, useRef } from "react";
import React from "react";

const chunkPageComponents: [ChunkType, React.ComponentType<any>][] = [
  ["coverPage", ReportCoverPage],
  ["contentsPage", ContentsPage_01],
  ["overviewPage", OverviewPage_02],
  ["swotPage", SwotPage_03],
  ["selfProductPage", SelfProductPage_04],
  ["competitorPage", CompetitorPage_05],
  ["comparisonPage", ComparisonPage_06],
  ["improvementPage", ImprovementPage_07],
  ["expectationGapPage", ExpectationGapPage_08],
  ["solutionPage", SolutionPage_09],
  ["executionPlanPage", ExecutionPlanPage_10],
  ["executionKPIPage", ExecutionKPIPage_11],
  ["conclusionPage", ConclusionPage_12],
  ["executiveSummaryPage", ExecutiveSummaryPage_13],
];

export default function PromptTestPage2() {
  const { category_id } = useParams<{
    category_id: string;
  }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryNameKo = searchParams.get("category_name_ko");
  const { state, chunkConstraints, currentPage } = useAIData();
  const sectionRefs = useRef<Record<ChunkType, HTMLDivElement | null>>({
    coverPage: null,
    contentsPage: null,
    overviewPage: null,
    swotPage: null,
    selfProductPage: null,
    competitorPage: null,
    comparisonPage: null,
    improvementPage: null,
    expectationGapPage: null,
    solutionPage: null,
    executionPlanPage: null,
    executionKPIPage: null,
    conclusionPage: null,
    executiveSummaryPage: null,
  });

  useEffect(() => {
    if (currentPage) {
      const target = sectionRefs.current[currentPage as ChunkType];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentPage]);

  useEffect(() => {
    const pdf = document.getElementById("pdf-content");
    if (pdf) {
      pdf.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  useRequireLogin();

  return (
    <div className="flex h-screen">
      {category_id && <PromptSidebar category_id={category_id} />}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {category_id &&
          categoryNameKo &&
          (Object.entries(chunkConstraints) as [ChunkType, any][]).map(
            ([pageKey, constraint], i) => (
              <StreamingPromptContainer
                key={i}
                category_name_ko={categoryNameKo}
                category_id={category_id}
                chunkType={pageKey}
                chunkConstraint={constraint}
              />
            )
          )}
      </div>

      <div
        id="pdf-content"
        className="space-y-4 p-12 bg-gray-100 h-screen overflow-auto"
      >
        {chunkPageComponents.map(([pageKey, PageComponent], index) => (
          <React.Fragment key={pageKey}>
            <A4Layout
              ref={(el) => {
                sectionRefs.current[pageKey] = el;
              }}
            >
              <PageComponent {...state[pageKey]} />
            </A4Layout>
            {index < chunkPageComponents.length - 1 && <PageSeparator />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
